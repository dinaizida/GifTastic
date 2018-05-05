$("document").ready(function() {

    // Initial array of movies
    var topics = ["The Sopranos", "Seinfeld", "Fargo", "Mad Men", "Cheers", "All in the Family",
        "Good Times", "Maude", "The Fire", "The West Wing", "The Simpsons", "I love Lucy"
    ];

    // Function for dumping the JSON content for each button into the #movieDiv
    function displayGifs() {
        var thisMovie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisMovie + "&api_key=m3zSKwwoURQE6Tpi3UGpKTAT7YY3kq28&limit=10&rating=g";
        // hit the queryURL with $ajax, then take the response data
        // and display it in the div 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
			var response = response.data;

			for (var i = 0; i < response.length; i++) {
				var gifDiv = $("<div>");
				gifDiv.addClass("gifDiv");
				var rating = response[i].rating;
				var p = $("<p>").html("Rating: " + rating);
				console.log(rating);
				p.addClass("text-center");
	            gifDiv.append(p);
	
				$("#gifs-view").append(gifDiv);
			}

            renderButtons();
        });

    };

    function renderButtons() {
        $("#movie-view").empty();
        for (i in topics) {
            var btn = $('<button class="btn btn-raised btn-info movie-btn">');
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            $("#movie-view").append(btn);
        }
    };

    // This .on("click") function will trigger the AJAX Call
    $("#add-movie").on("click", function(event) {
        // Preventing the submit button from trying to submit the form
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();
        // Here we grab the text from the input box and assign to to a variable movie
        var movie = $("#movie-input").val().trim();
        topics.push(movie);
        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });
    // Function for displaying the movie GIF info
    // We're adding a click event listener to all elements with the class "movie"

    $(document).on("click", ".movie-btn", displayGifs);

    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();

});