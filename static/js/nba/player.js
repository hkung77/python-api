$('document').ready(() => {

   const playerId = window.location.href.match(/[0-9]+$/)[0];

   // Get stats from server 
    $.ajax({
        url: '/playerDetailsSearch',
        data: { player_id: playerId },
        type: 'POST',
        success: (response) => {},
        error: (response) => {},
    });
});

