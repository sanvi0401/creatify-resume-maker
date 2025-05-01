import subprocess
import os
import tempfile
import shutil


def compile_latex(latex_source: str) -> bytes | None:
    """Compiles LaTeX source and returns the PDF as bytes."""
    temp_dir = tempfile.mkdtemp(dir='latex/temp/')
    try:
        latex_file_path = os.path.join(temp_dir, "temp.tex")
        pdf_file_path = os.path.join(temp_dir, "temp.pdf")

        with open(latex_file_path, "w", encoding="utf-8") as f:
            f.write(latex_source)

        result = subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", f"-output-directory={temp_dir}", latex_file_path],
            capture_output=True,
            text=True,
            check=True
        )

        if os.path.exists(pdf_file_path):
             with open(pdf_file_path, "rb") as f:
                  pdf_data = f.read()
             return pdf_data
        else:
             print(f"PDF file was not created: {result.stderr}")
             return None
    except subprocess.CalledProcessError as e:
        print(f"Error during LaTeX compilation: {e.stderr}")
        return None
    finally:
         shutil.rmtree(temp_dir)