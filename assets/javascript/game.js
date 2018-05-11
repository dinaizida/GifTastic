$("document").ready(function() {

// poster app 

    var movies = ["The Sopranos", "Seinfeld", "Fargo", "Mad Men", "Cheers", "All in the Family",
    "Good Times", "Maude", "The Fire", "The West Wing", "The Simpsons", "I love Lucy"
];
//**********************local storage */
 

var tasksButtons = JSON.parse(localStorage.getItem("tasksButtons")) || [];


renderButtonsP();
function renderTasksButtons(){
   
    $("#movie-view-add").empty();
    

    for (var i = 0; i < tasksButtons.length; i++) {

        var toDoTask = tasksButtons[i];

        var btn = $('<button class="btn btn-raised btn-info movie-btn">');
        btn.attr("data-name", tasksButtons[i]);
        // btn.append(" "+ toDoTask);
        btn.text(tasksButtons[i]);
        $("#movie-view-add").append(btn);
        
    }
    
}

//*********************** */
    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayMovieInfo() {
      var movie = $(this).attr("data-name");
      var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=2deee733";
      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        // Creating a div to hold the movie
        var movieDiv = $("<div class='movie'>");
        // Storing the rating data
        var rating = response.Rated;
        localStorage.setItem("rating", rating);
        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + localStorage.getItem("rating"));
        console.log(localStorage.getItem("rating"));
        // Displaying the rating
        movieDiv.append(pOne);
        // Storing the release year
        var released = response.Released;
        localStorage.setItem("released", released);
        // Creating an element to hold the release year
        var pTwo = $("<p>").text("Released: " + localStorage.getItem("released"));
        // Displaying the release year
        movieDiv.append(pTwo);
        // Storing the plot
        var plot = response.Plot;
        localStorage.setItem("plot", plot);
        // Creating an element to hold the plot
        var pThree = $("<p>").text("Plot: " + localStorage.getItem("plot"));
        // Appending the plot
        movieDiv.append(pThree);
        // Retrieving the URL for the image
        var imgURL = response.Poster;
        localStorage.setItem("imgURL", imgURL);
        // Creating an element to hold the image
        var image = $("<img>").attr("src", localStorage.getItem("imgURL"));
        // Appending the image
        movieDiv.prepend(image);
        // Putting the entire movie above the previous movies
        $("#movies-view").prepend(movieDiv);
      });
      displayGifs();
    };
    // Function for displaying movie data
    function renderButtonsP() {
      // Deleting the movies prior to adding new movies
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();
      // Looping through the array of movies
      for (var i = 0; i < movies.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button class='btn btn-raised btn-info movie-btn'>");
        // Adding a class of movie-btn to our button
        a.addClass("movie-btn");
        // Adding a data-attribute
        a.attr("data-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
      }
    };
    // This function handles events where a movie button is clicked
    $("#add-movie").on("click", function(event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      var movie = $("#movie-input").val().trim();
      //check if anything typed by user into the add field to prevent adding an empty button
      if (movie == 0) {
        var alertMes = $("<p id ='alert' class='alert alert-danger alert-dismissible close' data-dismiss='alert' aria-label='close' role='alert'>" + "Please Enter the Name of the TV Show" + "&nbsp&nbsp&times" + "<p/>");
        $("#movie-form").prepend(alertMes) // console.log(alertMes);
    } else {
      // Adding movie from the textbox to our array
      movies.push(movie);
      tasksButtons.push(movie);
      localStorage.setItem("tasksButtons", JSON.stringify(tasksButtons));

      console.log(tasksButtons);
      console.log(movies);
      }
      //empty input field
      $("#movie-input").val("");
      // Calling renderButtons which handles the processing of our movie array
      renderTasksButtons();
    });
    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".movie-btn", displayMovieInfo );
    // Calling the renderButtons function to display the intial buttons
    renderTasksButtons();


    //localStorage.clear();
//GIFI app
    // Initial array of movies
    // var topics = ["The Sopranos", "Seinfeld", "Fargo", "Mad Men", "Cheers", "All in the Family",
    //     "Good Times", "Maude", "The Fire", "The West Wing", "The Simpsons", "I love Lucy"
    // ];

//****************** local storage*/


// var tasksButtons = JSON.parse(localStorage.getItem("tasksButtons")) || [];


// renderButtons();
// function renderTasksButtons(){
   
//     $("#movie-view-add").empty();
    

//     for (var i = 0; i < tasksButtons.length; i++) {

//         var toDoTask = tasksButtons[i];

//         var btn = $('<button class="btn btn-raised btn-info movie-btn">');
//         btn.attr("data-name", tasksButtons[i]);
//         // btn.append(" "+ toDoTask);
//         btn.text(tasksButtons[i]);
//         $("#movie-view-add").append(btn);
        
//     }
    
// }


 //****************** */   
    // // // //render all movies names as buttons
    // function renderButtons() {
    //     $("#movie-view").empty();
    //     for (i in topics) {
    //         var btn = $('<button class="btn btn-raised btn-info movie-btn">');
    //         btn.attr("data-name", topics[i]);
    //         btn.text(topics[i]);
    //         $("#movie-view").append(btn);
    //     }
    // };
    //render favorite shows into fav div
    function displayFav() {
        var thisFav = $(this);
        console.log(this);

        var favGifi = thisFav.attr("data-animateF");
        var gifi = $("<img class = 'myFav'>")
        gifi.attr('src', favGifi);
        $(".favItem").css("background-color", "#009bdd1d");
        var t = $("<h3>");
        $("#favItemTitle").html("<h3> My Favorite GIPHY </h3>");

        $(".favItem").append(gifi);

    };
    // onclick to download images
    function downLoad() {
        var thisA = $(this);
        
        var downloadIm = thisA.attr("data-button");
        

        window.location.href = href;
    };
    // Function for dumping the JSON content for each button into the #gifs-view
    function displayGifs() {
        // var thisMovie = $(this).attr("data-name");
        var movie = $(this).attr("data-name");
         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=m3zSKwwoURQE6Tpi3UGpKTAT7YY3kq28&limit=4&rating=g";
        
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
                var gifDiv = $("<div class = 'gifDiv'>"); //create a div to show reating property
                var rating = resultsOfResp[i].rating; // render rating property into the page div
                var p = $("<p class = 'text-center'>").html("Rating: " + " " + rating + " " + " ");
                console.log(rating);
                // p.addClass("text-center");

                var gifImDiv = $("<img class = 'imgPosition'>"); // // Creating an image tag
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                gifImDiv.attr("src", resultsOfResp[i].images.fixed_height.url);
                gifImDiv.attr("data-still", resultsOfResp[i].images.fixed_height_still.url);
                gifImDiv.attr("data-animate", resultsOfResp[i].images.fixed_height.url);
                gifImDiv.attr("data-state", "animate");

                //select images for favorite section
                var checkBoxOutput = "<input type='checkbox' class = 'fav'>&nbsp;<span>Favorite</span>";
                var fav = $(checkBoxOutput);
                fav.addClass("fav");
                fav.attr("data-animateF", resultsOfResp[i].images.fixed_height.url);

                // download button for image

                var downloadButton = $("<button class = 'btn btn-raised btn-sm downloadButton' value='download'>Download</button>");
                downloadButton.attr("data-button", resultsOfResp[i].images.fixed_height.url)

                // Giving the image tag an src attribute of a proprty pulled off the
                var imageTitle = $("<h4 class = 'text-center'>").html("Title: " + resultsOfResp[i].title);
                fav.appendTo(p); // put check box nex to rating info

                gifDiv.append(p);
                gifDiv.append(downloadButton);

                imageTitle.insertAfter(p);
                gifDiv.prepend(gifImDiv);

                $("#gifs-view").prepend(gifDiv);

            };

        });

    };

    function toggleImage() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };

    // This .on("click") function will trigger the AJAX Call
    // $("#add-movie").on("click", function(event) {
    //     // Preventing the submit button from trying to submit the form
    //     // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    //     event.preventDefault();
    //     // Here we grab the text from the input box and assign to to a variable movie
    //     var movie = $("#movie-input").val().trim();
    //     console.log(movie);
    //     //check if anything typed by user into the add field to prevent adding an empty button
    //     if (movie == 0) {
    //         var alertMes = $("<p id ='alert' class='alert alert-danger alert-dismissible close' data-dismiss='alert' aria-label='close' role='alert'>" + "Please Enter the Name of the TV Show" + "&nbsp&nbsp&times" + "<p/>");
    //         $("#movie-form").prepend(alertMes) // console.log(alertMes);
    //     } else {
    //         topics.push(movie);
    //         tasksButtons.push(movie);
    //         localStorage.setItem("tasksButtons", JSON.stringify(tasksButtons));

    //         console.log(tasksButtons);
    //         console.log(topics);
    //     }
    //     // calling renderButtons which handles the processing of our movie array
    //     $("#movie-input").val("");
    //     // renderTasksButtons();
    // });
    // We're adding a click event listener to all elements with the class "movie-btn"
    $(document).on("click", ".movie-btn", displayGifs);
    $(document).on("click", ".imgPosition ", toggleImage);

    // Calling the renderButtons function at least once to display the initial list of movies
    // renderButtons();
    // renderTasksButtons();

    $(document).on("click", ".fav", displayFav);

    // download button

    $(document).on("click", ".downloadButton", downLoad);



});
