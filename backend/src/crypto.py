"""
 * Project: ITU project - Garage sale website
 * @file crypto.py

 * @brief cryptography class for api

 * @author Neonila Mashlai - xmashl00

"""

from cryptography.fernet import Fernet

class Crypto:
    def encrypt(self, data: str) -> dict:
        key = Fernet.generate_key()
        fernet = Fernet(key)
        return {
            'key': key.decode(),
            'encrypted_password': fernet.encrypt(data.encode())
        }

    def decrypt(self, data: str, key: str) -> str:
        fernet = Fernet(key)
        return fernet.decrypt(data).decode()
    
