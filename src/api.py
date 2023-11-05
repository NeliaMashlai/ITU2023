"""
 * Project: ITU project - Garage sale website
 * @file api.py

 * @brief main file for api

 * @author Maksym Podhornyi - xpodho08

"""

from fastapi import FastAPI, HTTPException
import uvicorn
from src.config import ENDPOINT_HOST, ENDPOINT_PORT
from src.sqlite import Database
from fastapi.middleware.cors import CORSMiddleware
from src.models import Item, ItemUpdate, User, UserUpdate

app = FastAPI()
db = Database()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)


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
async def user_update():
    pass


@app.get('/api/v1.0/user/{user_id}')
async def get_user(user_id : int) -> dict:
    user = db.get_user(user_id)
    if user:
        return user
    raise HTTPException(status_code = 500, detail='Server error')
    


@app.get('/api/v1.0/user/{user_id}/items')
async def get_user_items(user_id: int) -> list[Item]:
    items = get_user_items(user_id)
    if items:
        return items
    raise HTTPException(status_code = 500, detail='Server error')
        

@app.delete('/api/v1.0/user/{user_id}/delete')
async def delete_user():
    pass


@app.get('/api/v1.0/items')
async def get_items() -> list:
    return db.get_items()


@app.get('/api/v1.0/items/{item_id}')
async def get_item(item_id: int) -> dict:
    item = db.get_item(item_id)
    if item:
        return item
    raise HTTPException(status_code=404, detail='Item not found')


@app.post('/api/v1.0/items')
async def create_item(item: Item) -> Item:
    if db.insert_item(**item.dict()):
        return item
    raise HTTPException(status_code=500, detail='Server error')


@app.delete('/api/v1.0/items/{item_id}')
async def delete_item(item_id: int) -> dict:
    if db.delete_item(item_id):
        return {'message': 'Item deleted'}
    raise HTTPException(status_code=500, detail='Server error')


@app.put('/api/v1.0/items/{item_id}')
async def update_item(item_id: int, item: ItemUpdate) -> dict:
    updated_item = db.update_item(item_id, **item.dict(exclude_unset=True))
    if updated_item:
        return updated_item
    else:
        raise HTTPException(status_code=500, detail='Server error')


def run():
    uvicorn.run(app, host=ENDPOINT_HOST, port=ENDPOINT_PORT)
