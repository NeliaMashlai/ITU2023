import requests

class ImageUploader:
    def __init__(self):
        self.client_id = "f9cb57e996fb4dd"
        self.header = {
            "Authorization" : f"Client-ID {self.client_id}"
        }
        self.url = "https://api.imgur.com/3/image"

    def upload(self, file):
        files = {'image': file}
        res = requests.post(self.url, files=files, headers=self.header).json()
        return res['data']['link']