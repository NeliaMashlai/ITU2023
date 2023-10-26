import requests as re
import json

data = {
    'name': 'pidor',
    'description': 'test',
    'price': 1.0,
    'contact_email': 'test',
    'contact_phone': 'test',
    'image_path': 'test'
}

print(re.post('http://localhost:8080/api/v1.0/items', data = json.dumps(data)))