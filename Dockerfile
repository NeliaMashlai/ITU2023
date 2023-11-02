FROM python

RUN pip install fastapi uvicorn

ENV PROJECT_NAME=itu-api

# Change the port to your desired port
EXPOSE 8080

COPY . /app
WORKDIR /app

# mount database volume into
VOLUME [ "/app/database.db" ]

CMD [ "python" , "run.py" ]

