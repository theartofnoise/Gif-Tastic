

$(document).ready(function () {
    //topics array
    var topics = ["cars", "cats", "music"];

    //get gif button
    function makeButtons() {
        //reset area
        $("#btnArea").empty();

        //loop through topics
        for (i=0; i<topics.length;i++) {
            //makes buttons
            var btn = $("<button>");
            btn.addClass("topics");
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            $("#btnArea").append(btn);

        }

    }
    makeButtons();
    //adds buttons from user input
    $("#submitBtn").on("click", function(event) {
        event.preventDefault();

        //get input
        var newGif = $("#userQuery").val().trim();
        topics.push(newGif);

        makeButtons();

    });

    function runAPI() {
        var apiKey = "BY2xlALS7L9BEoajmS1caMfkEuHCr1Pz";
        var userQuery = $("#userQuery").val();
        // var query = "q="+userQuery;
        var limit = "limit=10";
        var rating = "rating=g";
        var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=" + apiKey + "&q=" + userQuery + "&" + limit + "&" + rating;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });
    }

    $(".topics").on("click", function (event) {
        event.preventDefault();
        userQuery = $(this).val();
        console.log(userQuery)
        runAPI();
    });
});