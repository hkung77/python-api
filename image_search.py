from dotenv import load_dotenv
import requests
import os

load_dotenv()

def get_google_image(name):    

    key = os.getenv('GOOGLE_KEY')
    
    response = requests.get("https://www.googleapis.com/customsearch/v1",
            params={
                'q': name, 
                'num': 1,
                'start': 1,
                'imgSize': "medium",
                'searchType': "image",
                'key': key,
                'cx': "014045533171696612546:exxk4b7fi_w",
                },
            )
    # print(response.json());
    try:
        result = response.json().get('items')[0].get('link')
    except:
        result = 'http://www.suttonsilver.co.uk/wp-content/uploads/blog-harold-02.jpg'

    # print(result)
    return result