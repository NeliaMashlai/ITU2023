FROM python

RUN pip install fastapi uvicorn

ENV PROJECT_NAME=itu-api

# Change the port to your desired port
EXPOSE 8080

COPY . /app
WORKDIR /app

# TODO - fix database connection
# VOLUME [ "/app/src" ]

CMD [ "python" , "run.py" ]

