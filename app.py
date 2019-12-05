import json
import os
import re

from flask import Flask, render_template
from flask_cors import CORS 

from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.static.players import find_players_by_full_name
from nba_api.stats.static.teams import find_teams_by_full_name
from image_search import get_google_image
from nba_search import get_player_details

app = Flask(__name__)
CORS(app, resources={r"/nba/*": {"origins": ["https://nba.hkung.me", "http://nba.hkung.me"]}})

@app.route('/')
def index():
    return render_template("home.html")

# @app.route('/nba')

# def nba():
#     return render_template("nba/index.html")

# @app.route('/nba/player/<id>')

# def nba_player(id):
#     return render_template("nba/player.html")

# @app.route('/nba/team/<id>')

# def nbaTeam(id):
#     return render_template("nba/team.html")

@app.route('/nba/teamSearch', methods=['GET'])
def team_search():
    from flask import request, jsonify

    search_term = request.args.get('search_term')

    results = []
    # Returns result from db
    results = find_teams_by_full_name(search_term)

    for result in results:
        image = get_google_image(result['full_name'])
        result['image'] = image

    return jsonify({'status': 'OK', 'data': results})

@app.route('/nba/playerSearch/', methods=['GET'])
def player_search():
    from flask import request, jsonify

    search_term = request.args.get('search_term')

    results = []

    # Returns result from db
    results = find_players_by_full_name(search_term)

    for result in results:
        image = get_google_image(result['full_name'])
        result['image'] = image

    return jsonify({'status': 'OK', 'data': results})

@app.route('/nba/playerDetailsSearch', methods=['POST'])
def player_details_search():
  from flask import request, jsonify

  player_id = request.form['player_id'] 
  result = get_player_details(player_id)

  return jsonify({'status': 'OK', 'data': result})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
