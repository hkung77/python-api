const SEARCH_TYPE_OPTIONS = ["Player", "Team"];

let searchType = SEARCH_TYPE_OPTIONS[0];

selectSearchOption = (option) => {
    searchType = option;
    document.getElementById('searchType').innerHTML = searchType;
}

const generateSearchOptions = () => {
    var len = SEARCH_TYPE_OPTIONS.length;
    for (var i = 0; i < len; i++) {
        let option = "<span class='dropdown-item'>"+ SEARCH_TYPE_OPTIONS[i] + "</span>";

        $("#searchMenu").append(option);
        $('span.dropdown-item').click(function(e) {
            selectSearchOption(e.target.innerText);
        });
    }
}

const onMorePlayerClick = () => {
    const searchId = event.srcElement.getAttribute('data-player-id');
    window.open(`/nba/player/${searchId}`);
}

const onMoreTeamClick = () => {
    const searchId = event.srcElement.getAttribute('data-team-id');
    window.open(`/nba/team/${searchId}`);
}

const setEmptyResult = () => {
    $("#searchResult > .card-columns").append("<h2 class='text-center'>Nothing Found</h2>")
}

const playerSearch = (searchTerm) => {
    $.ajax({
        url: '/playerSearch',
        data: { search_term: searchTerm },
        type: 'POST',
        success: (response) => {
            // console.log(response);
            const data = JSON.parse(response).data
             if (data.length === 0) {
                 setEmptyResult();
             } else {
                for (var i in data) {
                    const card = "<div class='card' style='width: 18rem;'><img src='http://www.suttonsilver.co.uk/wp-content/uploads/blog-harold-02.jpg' class='card-img-top' alt='Something' /><div class='card-body'><h5 class='card-title'></h5><p class='card-text'></p><button onclick='onMorePlayerClick()' class='btn btn-primary'>More info</button></div></div>"

                    $("#searchResult > .card-columns").append(card)

                    $(".card-title").last().html(data[i].full_name)
                    $(".card-img-top").last().attr('src', data[i].image)
                    if (data[i].is_active) {
                        $(".card-text").last().html("ACTIVE");
                        $(".card-text").last().addClass("text-success");
                    } else {
                        $(".card-text").last().html("RETIRED");
                        $(".card-text").last().addClass("text-danger");
                    } 
                    $(".card-body > button").last().attr("data-player-id", data[i].id);
                }
             }
        },
        error: (error) => {
            console.log(error);
            setEmptyResult();
        }
    });
}

const teamSearch = (searchTerm) => {
    $.ajax({
        url: '/teamSearch',
        data: { search_term: searchTerm },
        type: 'POST',
        success: (response) => {
            // console.log(response);
            const data = JSON.parse(response).data
            if (data.length === 0) {
                 setEmptyResult();
            } else {
                for (var i in data) {
                    const card = "<div class='card' style='width: 18rem;'><img src='http://www.suttonsilver.co.uk/wp-content/uploads/blog-harold-02.jpg' class='card-img-top' alt='Something' /><div class='card-body'><h5 class='card-title'></h5><p class='card-text'></p><button onclick='onMoreTeamClick()' class='btn btn-primary'>More info</button></div></div>"

                    $("#searchResult > .card-columns").append(card)

                    $(".card-title").last().html(data[i].full_name)
                    $(".card-img-top").last().attr('src', data[i].image)
                    $(".card-body > button").last().attr("data-team-id", data[i].id);
                }
            }
        },
        error: (error) => {
            // console.log(error);
            setEmptyResult();
        }
    });
}

const handleSearch = () => {
    const searchTerm = $("#searchTerm")[0].value;

    // Clear results from screen
    $("#searchResult > .card-columns").children().remove()

    if (searchType === 'Player') {
        playerSearch(searchTerm);
    } else {
        teamSearch(searchTerm);
    }
        
    $("#searchResult").removeAttr('hidden');
}



$('document').ready(() => {
    document.getElementById('searchType').innerHTML = searchType;

    generateSearchOptions();

    $("#searchButton").click(function() {
        handleSearch();
    });

    // listener for when enter is pressed
    $("#searchTerm").on('keyup', function (e) {
        if (e.keyCode === 13) {
            handleSearch();
        }
    });
});
