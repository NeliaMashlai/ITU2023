"""
 * Project: ITU project - Garage sale website
 * @file sqlite.py

 * @brief sqlite database class for api

 * @author Neonila Mashlai - xmashl00

"""

from sqlite3 import connect, Error
from src.config import DATABASE_FILE
from src.crypto import Crypto
from src.models import Optional
import os


class Database:

    def __init__(self) -> None:
        """ create a database connection to a SQLite database """
        try:

            self.conn = connect(
                os.path.join(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'src'), DATABASE_FILE))

            self.conn.execute('''CREATE TABLE IF NOT EXISTS items (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT NOT NULL,
                            description TEXT,
                            price REAL NOT NULL,
                            size TEXT,
                            category_id TEXT NOT NULL,
                            condition_id TEXT NOT NULL,
                            image_path TEXT NOT NULL,
                            author_id INTEGER NOT NULL);
            ''')

            self.conn.execute('''CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            username TEXT UNIQUE NOT NULL,
                            encrypted_password TEXT NOT NULL,
                            key TEXT NOT NULL,
                            name TEXT,
                            surname TEXT,
                            email TEXT,
                            phone TEXT,
                            address TEXT,
                            date_of_birth TEXT,
                            FOREIGN KEY (id) REFERENCES items (author_id));
            ''')

            self.conn.execute('''CREATE TABLE IF NOT EXISTS chats (
                            chat_id INTEGER PRIMARY KEY AUTOINCREMENT,
                            user_from INTEGER NOT NULL,
                            user_to INTEGER NOT NULL,
                            item_id INTEGER NOT NULL,
                            FOREIGN KEY (user_from) REFERENCES users (id),
                            FOREIGN KEY (user_to) REFERENCES users (id),
                            FOREIGN KEY (item_id) REFERENCES items (id));
            ''')

            self.conn.execute('''CREATE TABLE IF NOT EXISTS messages (
                            message_id INTEGER PRIMARY KEY AUTOINCREMENT,
                            chat_id INTEGER NOT NULL,
                            message TEXT NOT NULL,
                            date TEXT NOT NULL,
                            FOREIGN KEY (chat_id) REFERENCES chats (chat_id));
            ''')

            self.conn.execute('''CREATE TABLE IF NOT EXISTS unauthorized_users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT
            );''')

            self.conn.commit()

        except Error as e:
            print(e)
            exit(1)

    def insert_item(self, **item) -> bool:
        """ insert a new item into the items table """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            INSERT INTO items (name, description, price, size, category_id, condition_id, image_path, author_id)
            VALUES (:name, :description, :price, :size, :categoryId, :conditionId, :image_path, :author_id)
            ''', item)

            self.conn.commit()

            return True
        
        except Error as e:

            print(e)
            return False

    def get_items(self, category_id: str) -> list:
        """ get all items from the items table """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            SELECT * FROM items WHERE category_id = :category_id
            ''', {'category_id': category_id})

            rows = cursor.fetchall()
            keys = ('id', 'name', 'description', 'price', 'size', 'categoryId', 'conditionId', 'image_path', 'author_id')

            return [{key: value for key, value in zip(keys, row)} for row in rows]
        
        except Error as e:

            print(e)
            return []

    def get_item(self, item_id: int) -> dict:
        """ get a single item from the items table """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            SELECT * FROM items WHERE id = :id
            ''', {'id': item_id})

            row = cursor.fetchone()
            keys = ('id', 'name', 'description', 'price', 'size', 'category_id', 'condition_id', 'image_path', 'author_id')

            return {key: value for key, value in zip(keys, row)} if row else {}
        
        except Error as e:

            print(e)
            return {}

    def delete_item(self, item_id: int) -> bool:
        """ delete a single item from the items table """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            DELETE FROM items WHERE id = :id
            ''', {'id': item_id})

            self.conn.commit()

            return True
        
        except Error as e:

            print(e)
            return False

    def update_item(self, item_id: int, **item) -> bool:
        """ update a single item from the items table """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            UPDATE items SET name = :name, description = :description, price = :price, size = :size, 
            category_id = :categoryId, condition_id = :conditionId, image_path = :image_path WHERE id = :id
            ''', {'id': item_id, **item})

            self.conn.commit()

            return True
        
        except Error as e:

            print(e)
            return False
        
    def register_user(self, **user) -> int:
        """ register a new user if username is not taken """
        try:

            if not user['username'] or not user['password']:
                return -2


            cursor = self.conn.cursor()

            cursor.execute('''
            SELECT * FROM users WHERE username = :username
            ''', {'username': user['username']})

            row = cursor.fetchone()

            if row:
                return -1
            
            crypto = Crypto()
            encrypted = crypto.encrypt(user['password'])

            cursor.execute('''
            INSERT INTO users (username, encrypted_password, key)
            VALUES (:username, :encrypted_password, :key)
            ''', {'username': user['username'], **encrypted})

            self.conn.commit()

            return 0
        
        except Error as e:

            print(e)
            return -3
        
    def login_user(self, **user) -> int:
        """ login a user and return user id if correct username and password are provided, 
        if user does not exist return -1, if password is incorrect return -2, else error return -3 """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            SELECT * FROM users WHERE username = :username
            ''', {'username': user['username']})

            row = cursor.fetchone()

            if not row:
                return -1
            
            crypto = Crypto()
            decrypted = crypto.decrypt(row[2], row[3])

            if decrypted != user['password']:
                return -2
            
            return row[0]
        
        except Error as e:

            print(e)
            return -3
        
    def get_user_items_bd(self, user_id: int) -> list:
        """ get all items from the items table """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            SELECT * FROM items WHERE author_id = :author_id
            ''', {'author_id': user_id})

            rows = cursor.fetchall()

            keys = ('id', 'name', 'description', 'price', 'size', 'categoryId', 'conditionId', 'image_path', 'author_id')

            return [{key: value for key, value in zip(keys, row)} for row in rows]
        
        except Error as e:

            print(e)
            return None
        
    def get_user(self, user_id : int) -> dict:
        """ get a single user from the users table """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            SELECT id, username, name, surname, email, phone, address, date_of_birth FROM users WHERE id = :id
            ''', {'id': user_id})

            row = cursor.fetchone()

            return {
                'id': row[0],
                'username': row[1],
                'name': row[2],
                'surname': row[3],
                'email': row[4],
                'phone': row[5],
                'address': row[6],
                'date_of_birth': row[7]
            } if row else {}
        
        except Error as e:

            print(e)
            return {}
        
    def update_user(self, user_id : int, **user) -> bool:
        """ update a single user from the users table """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            UPDATE users SET name = :name, surname = :surname, email = :email, phone = :phone, address = :address, date_of_birth = :date_of_birth WHERE id = :id
            ''', {'id': user_id, **user})

            self.conn.commit()

            return True
        
        except Error as e:

            print(e)
            return False
        
    def create_chat(self, **chat) -> int:
        """ create a new chat """
        try:

            cursor = self.conn.cursor()

            # check if chat already exists
            cursor.execute('''
            SELECT * FROM chats WHERE user_from = :user_from AND user_to = :user_to AND item_id = :item_id 
            ''', chat)

            row = cursor.fetchone()

            if row:
                return row[0]
            
            cursor.execute('''
            INSERT INTO chats (user_from, user_to, item_id)
            VALUES (:user_from, :user_to, :item_id)
            ''', chat)

            self.conn.commit()

            return cursor.lastrowid
        
        except Error as e:

            print(e)
            return -1
        
    def get_chat(self, chat_id: int) -> dict:
        """ get a single chat """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            SELECT * FROM chats WHERE chat_id = :chat_id
            ''', {'chat_id': chat_id})

            row = cursor.fetchone()

            keys = ('chat_id', 'user_from', 'user_to', 'item_id')

            return {key: value for key, value in zip(keys, row)} if row else {}
        
        except Error as e:

            print(e)
            return {}
        
    def get_chats(self, user_id: int) -> list:
        """ get all chats for a user """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            SELECT * FROM chats WHERE user_from = :user_id OR user_to = :user_id
            ''', {'user_id': user_id})

            rows = cursor.fetchall()

            keys = ('chat_id', 'user_from', 'user_to', 'item_id')

            return [{key: value for key, value in zip(keys, row)} for row in rows]
        
        except Error as e:

            print(e)
            return []
        
    def delete_chat(self, chat_id: int) -> bool:
        """ delete a single chat """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            DELETE FROM chats WHERE chat_id = :chat_id
            ''', {'chat_id': chat_id})

            self.conn.commit()

            return True
        
        except Error as e:

            print(e)
            return False
        
    def create_message(self, **message) -> int:
        """ create a new message """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            INSERT INTO messages (chat_id, message, date)
            VALUES (:chat_id, :message, :date)
            ''', message)

            self.conn.commit()

            return cursor.lastrowid
        
        except Error as e:

            print(e)
            return -1
    
    def get_messages(self, chat_id: int) -> list:
        """ get all messages for a chat """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            SELECT * FROM messages WHERE chat_id = :chat_id
            ''', {'chat_id': chat_id})

            rows = cursor.fetchall()

            keys = ('message_id', 'chat_id', 'message', 'date')

            return [{key: value for key, value in zip(keys, row)} for row in rows]
        
        except Error as e:

            print(e)
            return []
        
    def delete_message(self, message_id: int) -> bool:
        """ delete a single message """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            DELETE FROM messages WHERE message_id = :message_id
            ''', {'message_id': message_id})

            self.conn.commit()

            return True
        
        except Error as e:

            print(e)
            return False
        
    def update_message(self, message_id: int, **message) -> bool:
        """ update a single message """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            UPDATE messages SET message = :message WHERE message_id = :message_id
            ''', {'message_id': message_id, **message})

            self.conn.commit()

            return True
        
        except Error as e:

            print(e)
            return False

    def unauthorized_user(self) -> int:
        """ add a new unauthorized user """
        try:

            cursor = self.conn.cursor()

            cursor.execute('''
            INSERT INTO unauthorized_users DEFAULT VALUES
            ''')

            self.conn.commit()

            return cursor.lastrowid
        
        except Error as e:

            print(e)
            return -1

    def __del__(self) -> None:
        """ close the database connection """
        self.conn.close()
