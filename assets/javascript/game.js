$("document").ready(function() {

    // Initial array of movies
    var topics = ["The Sopranos", "Seinfeld", "Fargo", "Mad Men", "Cheers", "All in the Family",
        "Good Times", "Maude", "The Fire", "The West Wing", "The Simpsons", "I love Lucy"
    ];
//render all movies names as buttons
    function renderButtons() {
        $("#movie-view").empty();
        for (i in topics) {
            var btn = $('<button class="btn btn-raised btn-info movie-btn">');
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            $("#movie-view").append(btn);
        }
    };

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
            console.log(response);
            var resultsOfResp = response.data; 
            
            console.log(resultsOfResp);
//render gif image and rating property into the HTML div
			for (var i = 0; i < resultsOfResp.length; i++) {
				var gifDiv = $("<div class = 'gifDiv'>");//create a div to show reating property
				var rating = resultsOfResp[i].rating;  // render rating property into the page div
				var p = $("<p>").html("Rating: " + rating);
				console.log(rating);
				p.addClass("text-center");
                
                var gifImDiv = $("<img class = 'imgPosition'>");// // Creating an image tag
                // Giving the image tag an src attribute of a proprty pulled off the
              // result item
                gifImDiv.attr("src", resultsOfResp[i].images.fixed_height.url);
                
                gifDiv.append(p);
                gifDiv.prepend(gifImDiv);
                //add rating and image to the page

                $("#gifs-view").append(gifDiv);
                
			}

            renderButtons();
        });

    };

   

    // This .on("click") function will trigger the AJAX Call
    $("#add-movie").on("click", function(event) {
        // Preventing the submit button from trying to submit the form
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();
      
        // Here we grab the text from the input box and assign to to a variable movie
        var movie = $("#movie-input").val().trim();
        console.log(movie);
        //check if anything typed by user into the add field to prevent adding an empty button
        if (movie == 0) {
            
            var alertMes =$("<p id ='alert' class='alert alert-danger alert-dismissible close' data-dismiss='alert' aria-label='close' role='alert'>" 
            + "Please Enter the Name of the TV Show" 
            + "&nbsp&nbsp&times" + "<p/>");
            $("#movie-form").append(alertMes);
            
            // console.log(alertMes);
        }
        else {
        topics.push(movie);
        }
        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });
    
    // We're adding a click event listener to all elements with the class "movie-btn"

    $(document).on("click", ".movie-btn", displayGifs);

    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();

});