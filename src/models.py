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
    description: str
    price: float
    contact_email: str
    contact_phone: str
    image_path: str
    author_id: int


class ItemUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    contact_email: Optional[str]
    contact_phone: Optional[str]
    image_path: Optional[str]


class User(BaseModel):
    username: str
    password: str

    
class UserUpdate(BaseModel):
    username: Optional[str]
    password: Optional[str]

    