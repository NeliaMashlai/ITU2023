from sqlite3 import connect, Error
from src.config import DATABASE_FILE
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
            contact_email TEXT,
            contact_phone TEXT,
            image_path TEXT );
            ''')
            self.conn.commit()

        except Error as e:
            print(e)
            exit(1)

    def insert_item(self, **item) -> bool:
        """ insert a new item into the items table """
        try:
            cursor = self.conn.cursor()
            cursor.execute('''
            INSERT INTO items (name, description, price, contact_email, contact_phone, image_path)
            VALUES (:name, :description, :price, :contact_email, :contact_phone, :image_path)
            ''', item)
            self.conn.commit()
            return True
        except Error as e:
            print(e)
            return False

    def get_items(self) -> list:
        """ get all items from the items table """
        try:
            cursor = self.conn.cursor()
            cursor.execute('''
            SELECT * FROM items
            ''')
            rows = cursor.fetchall()
            keys = ('id', 'name', 'description', 'price', 'contact_email', 'contact_phone', 'image_path')
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
            keys = ('id', 'name', 'description', 'price', 'contact_email', 'contact_phone', 'image_path')
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
            UPDATE items SET name = :name, description = :description, price = :price, contact_email = :contact_email,
            contact_phone = :contact_phone, image_path = :image_path WHERE id = :id
            ''', {'id': item_id, **item})
            self.conn.commit()
            return True
        except Error as e:
            print(e)
            return False

    def __del__(self) -> None:
        """ close the database connection """
        self.conn.close()
