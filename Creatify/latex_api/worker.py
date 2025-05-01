from celery import Celery
from latex.compile import compile_latex
import os
import uuid

CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')
PDF_STORAGE_DIR = "latex/pdf_storage"

celery = Celery('tasks', broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)


@celery.task(name="compile_task")
def compile_latex_task(latex_source):
    process_id = str(uuid.uuid4())
    pdf_data = compile_latex(latex_source)

    if pdf_data:
        file_path = os.path.join(PDF_STORAGE_DIR, f"{process_id}.pdf")
        try:
            with open(file_path, "wb") as f:
                f.write(pdf_data)
            return process_id
        except Exception as e:
            return f"Error saving PDF: {e}"
    else:
        return "LaTeX compilation failed."