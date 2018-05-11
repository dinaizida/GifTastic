$("document").ready(function() {

// poster app

    var movies = ["The Sopranos", "Seinfeld", "Fargo", "Mad Men", "Cheers", "All in the Family",
    "Good Times", "Maude", "The Fire", "The West Wing", "The Simpsons", "I love Lucy"
];
//**********************local storage to render new buttons */


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
    // displayMovieInfo function to display poster
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
        storageRat = localStorage.setItem("rating", rating); // local storage to save info
        // Creating an element to have the rating displayed
        var getStorageRat = localStorage.getItem("rating");
        var pOne = $("<p>").text("Rating: " + getStorageRat);
        console.log(localStorage.getItem("rating"));
        console.log("rating from storage - " + getStorageRat)
        // Displaying the rating
        movieDiv.append(pOne);
        // Storing the release year
        var released = response.Released;
        localStorage.setItem("released", released);
        // Creating an element to hold the release year
        var getStorageRel = localStorage.getItem("released");
        var pTwo = $("<p>").text("Released: " + getStorageRel);
        console.log(localStorage.getItem("released"));
        console.log("released from storage - " + getStorageRel)
        // Displaying the release year
        movieDiv.append(pTwo);
        // Storing the plot
        var plot = response.Plot;
        localStorage.setItem("plot", plot);
        // Creating an element to hold the plot
        var getStoragePlot = localStorage.getItem("plot");
        var pThree = $("<p>").text("Plot: " + getStoragePlot);
        console.log(localStorage.getItem("plot"));
        console.log("plot from storage - " + getStoragePlot)
        // Appending the plot
        movieDiv.append(pThree);
        // Retrieving the URL for the image
        var imgURL = response.Poster;
        localStorage.setItem("imgURL", imgURL);
        // Creating an element to hold the image
        var getStorageIm = localStorage.getItem("umgURL");
        var image = $("<img>").attr("src", localStorage.getItem("imgURL"));
        // Appending the image
        movieDiv.prepend(image);
        // Putting the poster above the poster info
        $("#movies-view").prepend(movieDiv);
      });
    // displayGifs();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=m3zSKwwoURQE6Tpi3UGpKTAT7YY3kq28&limit=4&rating=g";
    console.log("movie for gifs " +movie);

    //************** local storage to render gifs*/

    var tasksGifs = JSON.parse(localStorage.getItem("tasksGifs")) || [];


    //************** */

    // ajax call from GIF API to upload gifs from the same movie as poster movie

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var tasksGifs = response.data;

        console.log(tasksGifs);
        //render gif image and rating property into the HTML div
        for (var i = 0; i < tasksGifs.length; i++) {
            var gifDiv = $("<div class = 'gifDiv'>"); //create a div to show reating property
            var rating = tasksGifs[i].rating; // render rating property into the page div
            var p = $("<p class = 'text-center'>").html("Rating: " + " " + rating + " " + " ");
            console.log(rating);
            // p.addClass("text-center");

            var gifImDiv = $("<img class = 'imgPosition'>"); // // Creating an image tag
            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            gifImDiv.attr("src", tasksGifs[i].images.fixed_height.url);
            gifImDiv.attr("data-still", tasksGifs[i].images.fixed_height_still.url);
            gifImDiv.attr("data-animate", tasksGifs[i].images.fixed_height.url);
            gifImDiv.attr("data-state", "animate");

            //select images for favorite section
            var checkBoxOutput = "<input type='checkbox' class = 'fav'>&nbsp;<span>Favorite</span>";
            var fav = $(checkBoxOutput);
            fav.addClass("fav");
            fav.attr("data-animateF", tasksGifs[i].images.fixed_height.url);

            // download button for image

            var downloadButton = $("<button class = 'btn btn-raised btn-sm downloadButton' value='download'>Download</button>");
            downloadButton.attr("data-button", tasksGifs[i].images.fixed_height.url)

            // Giving the image tag an src attribute of a proprty pulled off the
            var imageTitle = $("<h4 class = 'text-center'>").html("Title: " + tasksGifs[i].title);
            fav.appendTo(p); // put check box nex to rating info

            gifDiv.append(p);
            gifDiv.append(downloadButton);

            imageTitle.insertAfter(p);
            gifDiv.prepend(gifImDiv);

            $("#gifs-view").prepend(gifDiv);
            localStorage.setItem("tasksGifs", JSON.stringify(tasksGifs));

        };

    });
    };
    // displayGifs();
    // Function for displaying posters data
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

         var href = downloadIm;
        window.location.href = href;
    };
    // Function for dumping the JSON content for each button into the #gifs-view


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

    // We're adding a click event listener to all elements with the class "movie-btn"
    // $(document).on("click", ".movie-btn", displayGifs);
    $(document).on("click", ".imgPosition ", toggleImage);

    // Calling the renderButtons function at least once to display the initial list of movies
    // renderButtons();
    // renderTasksButtons();

    $(document).on("click", ".fav", displayFav);

    // download button

    $(document).on("click", ".downloadButton", downLoad);



});
