$('document').ready(() => {

   const playerId = window.location.href.match(/[0-9]+$/)[0];

   const insertStats = (prefix, stats) => {
   // Career Stats 
            // Field Goal
            document.getElementById('fga').innerHTML = `${stats.FGA}`;
            document.getElementById('fgm').innerHTML = `${stats.FGM}`;
            document.getElementById('fgp').innerHTML = `${stats.FG_PCT}`;

            // Field Goal Three's
            document.getElementById('fg3a').innerHTML = `${stats.FG3A}`;
            document.getElementById('fg3m').innerHTML = `${stats.FG3M}`;
            document.getElementById('fg3p').innerHTML = `${stats.FG3_PCT}`;

            // Free Throws
            document.getElementById('fta').innerHTML = `${stats.FTA}`;
            document.getElementById('ftm').innerHTML = `${stats.FTM}`;
            document.getElementById('ftp').innerHTML = `${stats.FT_PCT}`;

            // Rebounds
            document.getElementById('reb').innerHTML = `${stats.REB}`;
            document.getElementById('oreb').innerHTML = `${stats.OREB}`;
            document.getElementById('dreb').innerHTML = `${stats.DREB}`;

            // Assist
            document.getElementById('ast').innerHTML = `${stats.AST}`;
            document.getElementById('stl').innerHTML = `${stats.STL}`;
            document.getElementById('blk').innerHTML = `${stats.BLK}`;
            document.getElementById('tov').innerHTML = `${stats.TOV}`;
            document.getElementById('pts').innerHTML = `${stats.PTS}`;

   }

   // Get stats from server 
    $.ajax({
        url: '/playerDetailsSearch',
        data: { player_id: playerId },
        type: 'POST',
        success: (response) => {
            console.log(JSON.parse(response))
            const { bio, stats, yearByYear } = JSON.parse(response).data;
            document.getElementById('player_name').innerHTML = bio.DISPLAY_FIRST_LAST;

            // Biography Information
            document.getElementById('birthday').innerHTML = new Date(bio.BIRTHDATE).toDateString();
            document.getElementById('country').innerHTML = bio.COUNTRY;
            document.getElementById('height').innerHTML = bio.HEIGHT;
            document.getElementById('weight').innerHTML = `${bio.WEIGHT} lb`;
            document.getElementById('school').innerHTML = bio.SCHOOL;
            document.getElementById('position').innerHTML = bio.POSITION;
            document.getElementById('team').innerHTML = `${bio.TEAM_CITY} ${bio.TEAM_NAME} ${bio.TO_YEAR}`;

            insertStats(career, stats);

        },
        error: (response) => {},
    });
});

