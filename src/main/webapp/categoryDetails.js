// global variables
var clickedName;
var songDetailsContainer = $("#songDetailsContainer");
var songContainer = $("#songContainer");
var home = document.getElementById("home");
var search = document.getElementById("search");
var categoriesContainer = document.getElementById("categoriesContainer");
var searchContainer = document.getElementById("searchContainer");
var searchSongs = document.getElementById("searchSongs");

home.addEventListener("click",function(){
	categoriesContainer.style.display = "flex";
	songDetailsContainer.show();
	songContainer.show();
	searchContainer.style.display = "none";
});

search.addEventListener("click",function(){
	categoriesContainer.style.display = "none";
	songDetailsContainer.hide();
	songContainer.hide();
	searchContainer.style.display = "flex";
	/* searchContainer.style.flexDirection = "column";*/
});


// onload function
window.onload = () => {
	categoriesContainer.style.display = "flex";
	categoriesContainer.style.flexDirection = "column";
	// songDetailsContainer.css("display","none");
	
    let myCollection = ["artists","albums"];
    for(let key of myCollection){
		getCatagoryDetails(key);
	} 
    
  };

// sending details to java page
  function getCatagoryDetails(selectedCategory){
	$.ajax({
		type: "POST",
		url: "/MusicPlayer/searchCategory",
		data: { categories: selectedCategory },
		success: function(res){
			updateCatagory(res, selectedCategory);
		},
		error: function(error){
			console.log(error);
		}
	});
}

// here updating the all category details from database to html page
function updateCatagory(data, selectedCategory) {
	console.log(selectedCategory);
	// songDetailsContainer.style.display = "flex";

	if (data != null && data != undefined) {
		var artistsDiv = $("#artistsDiv");
		var albumsDiv = $("#albumsDiv");

		for (var i = 0; i < data.length; i++) {
			var category = data[i];

			var imageSource = category[selectedCategory + "_image"];
			var name = category[selectedCategory + "_name"];
			
			var categoryDiv = $("<div>").addClass("category");

			var categoryImage = $("<img>").attr("src", imageSource).appendTo(categoryDiv);

			var categoryName = $("<h4>").text(name).appendTo(categoryDiv);

			if(selectedCategory == "artists"){
				var options = $("<p>").text("Artist").appendTo(categoryDiv);
				categoryDiv.appendTo(artistsDiv);

			}
			else if(selectedCategory == "albums"){
				var options = $("<p>").text("Album").appendTo(categoryDiv);
				categoryDiv.appendTo(albumsDiv);
			}

			categoryDiv.on("click", function() {
			clickedName = $(this).find("h4").text();
			sendNameToJava(clickedName);
			});
		}
	} else {
		console.log("No category details found.");
	} 
}

// sending artists name or albums name
function sendNameToJava(clickedName) {
	$.ajax({
		type: "POST",
		url: "/MusicPlayer/getsongdetails",
		data: { category: clickedName },
		success: function(response) {
			showSongDetails(response,clickedName);
		},
		error: function(error){
			console.log(error);
		}
	});
}

// fetching song details from java 
function showSongDetails(data){

	if (data != null && data != undefined) {
		// songDetailsContainer = $("#songDetailsContainer");
		songDetailsContainer.empty();   ///// empty()
		// playSong.empty();            ///// empty()
		
		for (var i = 0; i < data.length; i++) {
			var songDetails = data[i];
			
			var sImage = songDetails.song_image;
			var sName  = songDetails.song_name;
			var sAudio = songDetails.audio;
			var id = songDetails.newSongID;
			
			var songDetailsDiv = $("<div onclick='eachDiv(this)'>").addClass("songDetailsDiv");
			
			var songImage = $("<img>").attr("src",sImage).appendTo(songDetailsDiv);
			var audio = $("<audio>").attr("src",sAudio).appendTo(songDetailsDiv);

			var songDivsFlex = $("<div>").addClass("songDivsFlex");

			var songName = $("<h3>").text(sName).appendTo(songDivsFlex)
			var songId = $("<h4>").text(id).addClass("sondId").appendTo(songDivsFlex);
			// songId.style.display = "none";           // working on id.....
			var song = $("<p>").text(clickedName).appendTo(songDivsFlex);

			songDivsFlex.appendTo(songDetailsDiv);
			songDetailsDiv.appendTo(songDetailsContainer);	
		}
		
	} else {
		console.log("No song details found.");
	} 
}

// getting details after onclicking the div 

function eachDiv(event) {
    var Image = event.querySelector("img").src;
    var Song = event.querySelector("audio").src;
    var Name = event.querySelector("h3").innerHTML;
    var Id = event.querySelector("h4").innerHTML;

	var Para = clickedName;

	songContainer.show();
    updateDisplay(Name, Image, Song,Para,Id);
}

// global variables
var displayAudio = dynamicDiv.querySelector("audio");
var music = document.getElementById("audioPlayer");
var progress_bar = document.getElementById("progress_bar");
var progressed = document.getElementById("progressed");
var currentTime = document.querySelector(".current_time");
var totalDuration = document.querySelector(".total_duration");
var pause = document.getElementById("pause");


// sending music details for play or pause the song
function updateDisplay(name, imageSrc, songSrc,para) {
	var dynamicDiv = document.getElementById("dynamicDiv")
    var displayImage = dynamicDiv.querySelector("img");
    var displayName = dynamicDiv.querySelector("h2");
	var pTag = dynamicDiv.querySelector("p");


	dynamicDiv.style.display = "flex";   // flex
    displayImage.src = imageSrc;
	displayName.innerHTML = name;
    displayAudio.src = songSrc;
	pTag.innerHTML = para;

	displayAudio.play();
	pause.innerHTML = "pause";
}

// play , pause button accessing
pause.addEventListener("click", function() {
	if (pause.innerHTML == "pause") {
	  displayAudio.pause();
	  pause.innerHTML = "play_arrow";
	} else if (pause.innerHTML == "play_arrow") {
	  displayAudio.play();
	  pause.innerHTML = "pause";
	}
});

// inserting the correct time to timingDiv
music.ontimeupdate = function(){
	progressed.style.width = Math.floor(music.currentTime*100/music.duration)+"%"; // setting the correct time's width.
	currentTime.innerHTML = formatTime(music.currentTime);
	totalDuration.innerHTML = formatTime(music.duration);
}

// accessing the progress bar 
progress_bar.addEventListener("click",function(e){
	music.currentTime = (e.offsetX/progress_bar.offsetWidth)* music.duration;
	displayAudio.play();
	if (pause.innerHTML == "play_arrow") {
	  displayAudio.play();
	  pause.innerHTML = "pause";
	}
});

// calculating the correct time
const formatTime = (time) =>{
	let min = Math.floor(time/60);
	if(min < 10){
		min = `0${min}`;
	}
	let sec = Math.floor(time%60);
	if(sec < 10){
		sec = `0${sec}`;
	}
	return `${min} : ${sec}`;
}
