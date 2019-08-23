import json
import os
import re

from flask import Flask, render_template
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.static.players import find_players_by_full_name
from nba_api.stats.static.teams import find_teams_by_full_name

from image_search import get_google_image

app = Flask(__name__)

@app.route('/')

def index():
    return render_template("home.html")

@app.route('/nba')

def nba():
    return render_template("nba/index.html")

@app.route('/nba/player/<id>')

def nba_player(id):
    return render_template("nba/player.html")

@app.route('/nba/team/<id>')

def nbaTeam(id):
    return render_template("nba/team.html")

@app.route('/teamSearch', methods=['POST'])
def team_search():
    from flask import request

    search_term = request.form['search_term']

    results = []
    # Returns result from db
    results = find_teams_by_full_name(search_term)

    for result in results:
        image = get_google_image(result['full_name'])
        result['image'] = image

    return json.dumps({'status': 'OK', 'data': results})

@app.route('/playerSearch', methods=['POST'])
def player_search():
    from flask import request

    search_term = request.form['search_term']

    results = []

    # Returns result from db
    results = find_players_by_full_name(search_term)

    for result in results:
        image = get_google_image(result['full_name'])
        result['image'] = image

    return json.dumps({'status': 'OK', 'data': results})

@app.route('/playerDetailsSearch', methods=['POST'])

def player_details_search():
# TODO:
# Work in progess to obtain player details

#   from flask import request
#   player_id = request.form['player_id'] 

#    result = commonplayerinfo(player_id)    
#    puts(result);


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
