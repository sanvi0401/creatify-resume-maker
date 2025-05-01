FROM texlive/texlive:latest

# Install Python 3, pip, and other necessary tools
RUN tlmgr update --self && \
    tlmgr install python3 python3-pip && \
    tlmgr install \
        collection-latexrecommended \
        collection-fontsrecommended \
        collection-fontutils \
        collection-latex \
        collection-basic \
        collection-bibtexextra \
        collection-pictures \
        moderncv \
        fontawesome5 && \
        apt-get update && \
        apt-get install -y --no-install-recommends \
        bind9-dnsutils \
        curl \
        wget

WORKDIR /app

# Create a logs directory and change its ownership
RUN mkdir -p /app/logs && \
    chown -R appuser:appuser /app/logs


# Copy application files
COPY requirements.txt .
COPY app ./app
COPY latex ./latex
COPY static ./static
COPY worker.py ./

# Create a Python virtual environment
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Create a non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Change ownership of the application directory
RUN chown -R appuser:appuser /app


# Switch to the non-root user
USER appuser

# Expose the application port
EXPOSE 80

# Health check (adjust the endpoint if necessary)
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost/docs || exit 1

# Run the application using uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]