import requests as re
import json

data = {
    'username': 'tester',
    'password': 'test'
}

print(re.post('http://localhost:8080/api/v1.0/login', data = json.dumps(data)).text)