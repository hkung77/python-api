const SEARCH_TYPE_OPTIONS = ["Player", "Team"];
let searchType = SEARCH_TYPE_OPTIONS[0];

function selectSearchOption(option) {
    searchType = option;
    document.getElementById('searchType').innerHTML = searchType;
}

function generateSearchOptions() {
    var len = SEARCH_TYPE_OPTIONS.length;
    for (var i = 0; i < len; i++) {
        let option = "<span class='dropdown-item'>"+ SEARCH_TYPE_OPTIONS[i] + "</span>";

        $("#searchMenu").append(option);
        $('span.dropdown-item').click(function(e) {
            selectSearchOption(e.target.innerText);
        });
    }
}

function handleSearch() {
    const searchTerm = $("#searchTerm")[0].value;

    // Clear results from screen
    $("#searchResult > .card-columns").children().remove()

    $.ajax({
        url: '/nbaSearch',
        data: { search_term: searchTerm, search_type: searchType },
        type: 'POST',
        success: function(response) {
            console.log(response);
            const data = JSON.parse(response).data
            if (data.length === 0) {
                $("#searchResult > .card-columns").append("<h2 class='text-center'>Nothing Found</h2>")
            } else {
                for (var i in data) {
                    let card = "<div class='card' style='width: 18rem;'><img src='http://www.suttonsilver.co.uk/wp-content/uploads/blog-harold-02.jpg' class='card-img-top' alt='Something' /><div class='card-body'><h5 class='card-title'></h5><p class='card-text'></p><a href='#' class='btn btn-primary'>More info</a></div></div>"

                    $("#searchResult > .card-columns").append(card)

                    $(".card-title").last().html(data[i].full_name)
                    $(".card-img-top").last().attr('src', data[i].image)
                    if (data[i].is_active) {
                        $(".card-text").last().html("ACTIVE");
                        $(".card-text").last().addClass("text-success");
                        $(".card-body > a").last().attr("data-player-id", data[i].id);
                    } else {
                        $(".card-text").last().html("RETIRED");
                        $(".card-text").last().addClass("text-danger");
                        $(".card-body > a").last().attr("data-player-id", data[i].id);
                    } 
                }
            }
        },
        error: function(error) {
            console.log(error);
            $("#searchResult > .card-columns").append("<h2 class='text-center'>Nothing Found</h2>")
        }
    });

    $("#searchResult").removeAttr('hidden');
}



$('document').ready(function(){
    document.getElementById('searchType').innerHTML = searchType;

    generateSearchOptions();

    $("#searchButton").click(function() {
        handleSearch();
    });
});
