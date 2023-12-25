"""
 * Project: ITU project - Garage sale website
 * @file api.py

 * @brief main file for api

 * @author Maksym Podhornyi - xpodho08

"""

from fastapi import FastAPI, HTTPException, UploadFile
import uvicorn
from src.config import ENDPOINT_HOST, ENDPOINT_PORT
from src.sqlite import Database
from fastapi.middleware.cors import CORSMiddleware
from src.models import Item, ItemUpdate, User, UserUpdate, Chat, ChatMessage, ChatMessageUpdate
from src.imgur import ImageUploader
from prometheus_fastapi_instrumentator import Instrumentator
import logging
from os import getenv
from multiprocessing import Queue
from logging_loki import LokiQueueHandler


app = FastAPI()
Instrumentator().instrument(app).expose(app)

loki_logs_handler = LokiQueueHandler(
    Queue(-1),
    url=getenv("http://localhost:3100/loki/api/v1/push"),
    tags={"application": "fastapi"},
    version="1",
)

uvicorn_access_logger = logging.getLogger("uvicorn.access")
uvicorn_access_logger.addHandler(loki_logs_handler)

db = Database()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)


@app.get('/api/v1.0')
async def root() -> dict:
    return {"message": "Oops, you are not supposed to be here"}

@app.post('/api/v1.0/chat/create')
async def create_chat(chat: Chat) -> int:
    res = db.create_chat(**chat.dict())
    if res:
        return res
    raise HTTPException(status_code=500, detail='Server error')

@app.delete('/api/v1.0/chat/{chat_id}/delete')
async def delete_chat(chat_id: int) -> bool:
    if db.delete_chat(chat_id):
        return True
    raise HTTPException(status_code=500, detail='Server error')

@app.get('/api/v1.0/chats/{chat_id}')
async def get_chat(chat_id: int) -> dict:
    chat = db.get_chat(chat_id)
    if chat:
        return chat
    raise HTTPException(status_code=500, detail='Server error')

@app.get('/api/v1.0/user/{user_id}/chats')
async def get_chats(user_id: int) -> list[dict]:
    chats = db.get_chats(user_id)
    if chats is not None:
        return chats
    raise HTTPException(status_code=500, detail='Server error')

@app.get('/api/v1.0/chat/{chat_id}/messages')
async def get_messages(chat_id: int) -> list[dict]:
    messages = db.get_messages(chat_id)
    if messages is not None:
        return messages
    raise HTTPException(status_code=500, detail='Server error')

@app.post('/api/v1.0/message/create')
async def create_message(message: ChatMessage) -> bool:
    if db.create_message(**message.dict()):
        return True
    raise HTTPException(status_code=500, detail='Server error')

@app.delete('/api/v1.0/message/{message_id}/delete')
async def delete_message(message_id: int) -> bool:
    if db.delete_message(message_id):
        return True
    raise HTTPException(status_code=500, detail='Server error')

@app.put('/api/v1.0/message/{message_id}/update')
async def update_message(message_id: int, message: ChatMessageUpdate) -> bool:
    if db.update_message(message_id, **message.dict(exclude_unset=True)):
        return True
    raise HTTPException(status_code=500, detail='Server error')

@app.post('/api/v1.0/image/upload')
async def upload_image(image: UploadFile = None) -> dict:
    if image:
        uploader = ImageUploader()
        return {"url" : uploader.upload(image.file.read())}
    raise HTTPException(status_code=400, detail='No image provided')


@app.post('/api/v1.0/user/unauthorized')
async def unauthorized_user() -> bool:
    if db.unauthorized_user() >= 0:
        return True
    raise HTTPException(status_code=500, detail='Server error')


@app.post('/api/v1.0/register')
async def user_registration(user : User) -> bool:
    """ register a new user """
    status = db.register_user(**user.dict())
    if status == 0:
        return True
    elif status == -1:
        raise HTTPException(status_code=409, detail='Username already taken')
    elif status == -2:
        raise HTTPException(status_code=400, detail='Username or password is empty')
    else:
        raise HTTPException(status_code=500, detail='Server error')


@app.post('/api/v1.0/login')
async def user_login(user : User) -> int:
    """ login a user and return user id """
    user_id = db.login_user(**user.dict())
    if user_id >= 0:
        return user_id
    elif user_id == -1:
        raise HTTPException(status_code=404, detail='User not found')
    elif user_id == -2:
        raise HTTPException(status_code=401, detail='Incorrect username or password')
    else:
        raise HTTPException(status_code=500, detail='Server error')
    


@app.put('/api/v1.0/user/{user_id}/update')
async def user_update(user_id : int, user : UserUpdate) -> bool:
    """ update user data """
    if db.update_user(user_id, **user.dict(exclude_unset=True)):
        return True
    else:
        raise HTTPException(status_code=500, detail='Server error')


@app.get('/api/v1.0/user/{user_id}')
async def get_user(user_id : int) -> dict:
    user = db.get_user(user_id)
    if user:
        return user
    raise HTTPException(status_code = 500, detail='Server error')
    


@app.get('/api/v1.0/user/{user_id}/items')
async def get_user_items(user_id: int) -> list[dict]:
    items = db.get_user_items_bd(user_id)
    if items:
        return items
    elif items == []:
        return []
    raise HTTPException(status_code = 500, detail='Server error')
        

@app.delete('/api/v1.0/user/{user_id}/delete')
async def delete_user():
    pass


@app.get('/api/v1.0/items/{category_id}/category')
async def get_items(category_id: str) -> list[dict]:
    return db.get_items(category_id)


@app.get('/api/v1.0/items/{item_id}')
async def get_item(item_id: int) -> dict:
    item = db.get_item(item_id)
    if item:
        return item
    raise HTTPException(status_code=404, detail='Item not found')


@app.post('/api/v1.0/item/create')
async def create_item(item: Item) -> Item:
    if db.insert_item(**item.dict()):
        return item
    raise HTTPException(status_code=500, detail='Server error')


@app.delete('/api/v1.0/items/{item_id}/delete')
async def delete_item(item_id: int) -> dict:
    if db.delete_item(item_id):
        return {'message': 'Item deleted'}
    raise HTTPException(status_code=500, detail='Server error')


@app.put('/api/v1.0/items/{item_id}/update')
async def update_item(item_id: int, item: ItemUpdate) -> bool:
    sucess = db.update_item(item_id, **item.dict(exclude_unset=True))
    if sucess:
        return True
    else:
        raise HTTPException(status_code=500, detail='Server error')


def run():
    uvicorn.run(app, host=ENDPOINT_HOST, port=ENDPOINT_PORT)
