import requests

def get_player_details(player_id):
    result = {}
    # Get background details of player
    URL = 'https://stats.nba.com/stats/commonplayerinfo?LeagueID=&PlayerID=' + player_id
    backgroundResult = requests.get(URL).json()
    print('nope')
    print(backgroundResult)
    print(backgroundResult['resultSets'])

    
    # Get Career stats
    url = 'https://stats.nba.com/stats/playercareerstats?LeagueID=&PerMode=Totals&PlayerID=' + player_id
    # statsResult = requests.get(url)
    return result