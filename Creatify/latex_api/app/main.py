from fastapi import FastAPI, HTTPException, UploadFile, Response, status, File
from fastapi.responses import FileResponse,JSONResponse
from latex.compile import compile_latex
from fastapi.staticfiles import StaticFiles
import uuid
import os
import shutil
from typing import Dict
import asyncio
from datetime import datetime, timedelta
import logging
from concurrent.futures import ProcessPoolExecutor
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from celery import Celery
from celery.result import AsyncResult


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

PDF_STORAGE_DIR = "latex/pdf_storage"
os.makedirs(PDF_STORAGE_DIR, exist_ok=True)

MAX_WORKERS = os.cpu_count() if os.cpu_count() else 4
executor = ProcessPoolExecutor(max_workers=MAX_WORKERS)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


REQUEST_BODY_LIMIT = 5 * 1024 * 1024


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler = logging.FileHandler('latex_api.log')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')

celery = Celery('tasks', broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)
async def cleanup_stale_pdfs():
        while True:
            now = datetime.now()
            for filename in os.listdir(PDF_STORAGE_DIR):
                file_path = os.path.join(PDF_STORAGE_DIR, filename)
                if filename.endswith(".pdf") and os.path.isfile(file_path):
                    creation_time = datetime.fromtimestamp(os.path.getctime(file_path))
                    if now - creation_time > timedelta(hours=1):
                        try:
                            os.remove(file_path)
                            logger.info(f"Deleted stale pdf: {filename}")
                        except Exception as e:
                            logger.error(f"Error deleting file {filename}: {e}")
            await asyncio.sleep(3600)


async def start_cleanup_process():
   asyncio.create_task(cleanup_stale_pdfs())

@app.on_event("startup")
async def startup_event():
    await start_cleanup_process()

@app.post("/compile-latex", response_class=JSONResponse)
async def compile_latex_endpoint(request: Request, latex_file: UploadFile = File(...)):
    if request.headers.get("Content-Length") and int(request.headers.get("Content-Length")) > REQUEST_BODY_LIMIT:
      raise HTTPException(status_code=413, detail="Request body too large")
    try:
        if latex_file.filename.endswith(".tex") is False:
             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid File Type.")
        latex_source = (await latex_file.read()).decode('utf-8')
        task = celery.send_task("compile_task", args=[latex_source])
        return {"process_id": task.id}
    except Exception as e:
        logger.error(f"Error while processing request: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An unexpected error occurred.")

@app.get("/result/{process_id}", response_class=Response)
async def get_result(process_id: str):
    task = AsyncResult(process_id, app=celery)
    while task.state != "SUCCESS":
       if task.state == "FAILURE":
           logger.error(f"Error while reading task for process id: {process_id}, {task.info}")
           raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error while processing the task {task.info}")
       await asyncio.sleep(0.1)
       task = AsyncResult(process_id, app=celery)
    file_path = os.path.join(PDF_STORAGE_DIR, f"{task.result}.pdf")
    if os.path.exists(file_path):
        try:
            with open(file_path, "rb") as f:
                pdf_data = f.read()
            return Response(content=pdf_data, media_type="application/pdf",
                         headers={"Content-Disposition": f"attachment; filename=result.pdf"})
        except Exception as e:
           logger.error(f"Error reading pdf: {e}")
           raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="PDF could not be read")
    else:
         logger.warning(f"Pdf not found {process_id}")
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="PDF not found")


@app.get("/latex/example", response_class=FileResponse)
async def show_example_latex():
    file_path = "static/example.tex"
    return FileResponse(file_path)

@app.get("/preview")
async def show_example_latex():
    file_path = "static/example.tex"
    with open(file_path, "r") as f:
        latex_source = f.read()
        pdf_data = compile_latex(latex_source)
        if pdf_data:
            return Response(content=pdf_data, media_type="application/pdf",
            headers = {"Content-Disposition":"inline;filename=example.pdf"})
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="LaTeX compilation failed.")