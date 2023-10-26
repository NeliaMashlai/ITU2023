from fastapi import FastAPI, HTTPException
import uvicorn
from src.config import ENDPOINT_HOST, ENDPOINT_PORT
from src.sqlite import Database
from pydantic import BaseModel
from typing import Optional

app = FastAPI()
db = Database()

class Item(BaseModel):
    name: str
    description: str
    price: float
    contact_email: str
    contact_phone: str
    image_path: str

class ItemUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    contact_email: Optional[str]
    contact_phone: Optional[str]
    image_path: Optional[str]

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

