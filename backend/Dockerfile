FROM python

ENV PROJECT_NAME=itu-api

EXPOSE 8080
EXPOSE 3100

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

VOLUME [ "/app/database.db" ]

CMD [ "python" , "run.py" ]

