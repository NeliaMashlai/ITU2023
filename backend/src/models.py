"""
 * Project: ITU project - Garage sale website
 * @file models.py

 * @brief models for api

 * @author Maksym Podhornyi - xpodho08

"""


from typing import Optional
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    description: Optional[str]
    price: float
    size: Optional[str]
    conditionId: str
    categoryId: str
    image_path: str
    author_id: int


class ItemUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    size: Optional[str]
    conditionId: Optional[str]
    categoryId: Optional[str]
    image_path: Optional[str]


class User(BaseModel):
    username: str
    password: str
    name : Optional[str] = None
    surname : Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str]  = None
    date_of_birth: Optional[str] = None

    
class UserUpdate(BaseModel):
    name : Optional[str]
    surname : Optional[str]
    email: Optional[str]
    phone: Optional[str]
    address: Optional[str]
    date_of_birth: Optional[str]

class Chat(BaseModel):
    # chat_id: Optional[int]
    user_from: int
    user_to: int
    item_id: int

class ChatMessage(BaseModel):
    chat_id: int
    user_from: int
    message: str
    date: str

class ChatMessageUpdate(BaseModel):
    message: str

    