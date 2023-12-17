FROM python

ENV PROJECT_NAME=itu-api

EXPOSE 8080

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

VOLUME [ "/app/database.db" ]

CMD [ "python" , "run.py" ]

