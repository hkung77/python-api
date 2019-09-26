#!/usr/bin/env python3
from nba_api.stats.endpoints import commonplayerinfo, playercareerstats


def get_player_details(player_id):
    result = {}

    # Get background details of player
    player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)

    # Parse data to return to frontend
    raw_data = player_info.common_player_info.data
    headers = raw_data.get('headers')
    data = raw_data.get('data')[0]

    bio = {}
    for index in range(len(headers)):
        bio[headers[index]] = data[index]

    result['bio'] = bio
    
    career_stats = playercareerstats.PlayerCareerStats(player_id=player_id)
    raw_data = career_stats.career_totals_regular_season.data
    headers = raw_data.get('headers')
    data = raw_data.get('data')[0]

    stats = {}
    for index in range(len(headers)):
        stats[headers[index]] = data[index]


    result['stats'] = stats 

    return result