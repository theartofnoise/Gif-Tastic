

$(document).ready(function () {
    //topics array
    var topics = ["cars", "cats", "music", "guitars", "piano", "coding", "computers", "food", "cooking" , "running"];
    

    //get gif button
    function makeButtons() {
        //reset area
        $("#btnArea").empty();

        //loop through topics
        for (i=0; i<topics.length;i++) {
            //makes buttons
            var btn = $("<button>");
            btn.addClass("topics");
            btn.addClass("btn btn-secondary");
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
        //clear input
        $("#userQuery").val([])

    });

    //puts Gifs in html
    function showGifs(response, limit) {
        $("#gifArea").empty();
        for (i=0; i<limit;i++) {
            //makes new img with gifs
            var d=$("<img></img>")
            var newDiv = $("<div></div>");            
            d.addClass("gifs");
            d.addClass("text-center");
            d.attr("data-name", response.data[i].images.rating);
            d.attr("data-still", response.data[i].images.original_still.url);
            d.attr("data-animated", response.data[i].images.original.url);
            d.attr("data-state", "still");        
            d.attr("src", response.data[i].images.original_still.url);
            newDiv.append(d);
            newDiv.attr("class", "theGifDivs")
            newDiv.append("rating: "+response.data[i].rating)
            $("#gifArea").append(newDiv);
            
            

        }
    }
    // snaches up that sweet API!
    function runAPI(userQuery) {
        var apiKey = "BY2xlALS7L9BEoajmS1caMfkEuHCr1Pz";
        // var userQuery = $("#userQuery").val();
        var limit = 10;
        var rating = "rating=g";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + userQuery + "&" + "limit=" + limit + "&" + rating;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            showGifs(response, limit)
        });
        
    };
    // buttons that make gifs
    $(document).on("click", ".topics", function (event) {
        event.preventDefault();
        userQuery = $(this).attr("data-name");
        console.log(userQuery)
    runAPI(userQuery);
    
    });
    //gifs pause and start
    $(document).on("click", ".gifs", function (event) {
        event.preventDefault();
        //check if its attr is still and set src accordingly
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        
        
    
    
    });
});