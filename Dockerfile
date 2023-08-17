FROM python:3.11

WORKDIR /app

# set environment varibles
ENV PYTHONFAULTHANDLER 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONHASHSEED random
ENV PIP_NO_CACHE_DIR off
ENV PIP_DISABLE_PIP_VERSION_CHECK on

# install poetry
RUN pip install --user poetry
ENV PATH="/root/.local/bin:${PATH}"

# install app dependencies
COPY poetry.lock .
COPY pyproject.toml .
COPY poetry.toml .

RUN poetry install --without dev --no-interaction --no-ansi
# add gunicorn
RUN poetry add gunicorn

COPY . .
RUN chmod +x ./start_server.sh
RUN chmod +x ./start_worker.sh

EXPOSE 8000
