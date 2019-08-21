import re
import json
import os

from dotenv import load_dotenv
from flask import Flask, render_template 
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.static.players import find_players_by_full_name
from nba_api.stats.static.teams import find_teams_by_full_name

app = Flask(__name__)

load_dotenv()

def getGoogleImage(name):    
    import requests
    import os

    key = os.getenv('GOOGLE_KEY');
    
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
        result = response.json().get('items')[0].get('link');
    except:
        result = 'http://www.suttonsilver.co.uk/wp-content/uploads/blog-harold-02.jpg';

    # print(result)
    return result;


@app.route('/')

def index():
    return render_template("home.html");

@app.route('/nba')

def nba():
    return render_template("nba.html");


@app.route('/nbaSearch', methods=['POST'])
def nbaSearch():
    from flask import request

    search_type = request.form['search_type'];
    search_term = request.form['search_term'];

    result = [];

    if search_type == "Player":
        # Returns result from db
        result = find_players_by_full_name(search_term);

        for player in result:
            image = getGoogleImage(player['full_name']);
            player['image'] = image;
    elif search_type == "Team":
        # Returns result from db
        result = find_teams_by_full_name(search_term);

        for team in result:
            image = getGoogleImage(team['full_name']);
            team['image'] = image;
    else :
        result = [];

    return json.dumps({'status': 'OK', 'data': result});


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')


