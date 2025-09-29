# Use Python 3.13 slim image as base
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:$PATH"

# Copy dependency files first for better caching
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen

# Copy source code
COPY src/ ./src/

# Copy .env file if it exists (optional)
COPY .env* ./

# Expose port
EXPOSE 8080

# Run the application
CMD ["sh", "-c", "/app/.venv/bin/python -m uvicorn app:app --host 0.0.0.0 --port ${PORT:-8080} --app-dir /app/src"]