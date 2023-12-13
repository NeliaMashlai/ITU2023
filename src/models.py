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
    conditionId: str
    categoryId: str
    contact_email: Optional[str]
    contact_phone: Optional[str]
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
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str]  = None
    date_of_birth: Optional[str] = None

    
class UserUpdate(BaseModel):
    username: Optional[str]
    password: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    address: Optional[str]
    date_of_birth: Optional[str]

    