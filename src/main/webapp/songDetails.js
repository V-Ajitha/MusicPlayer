// var clickedCategory = "";

// $(document).ready(function(){
//     var queryParams = new URLSearchParams(window.location.search);
//     clickedCategory = queryParams.get("category");
//     console.log(clickedCategory);
    
// });




// function sendNameToJava(clickedName) {
//     console.log("Name:"+clickedName);
//     $.ajax({
//         type: "POST",
//         url: "/MusicPlayer/getsongdetails",
//         data: { category: clickedName },
//         success: function(response) {
//         console.log("Name:"+clickedName);
//             console.log(response);
//             showSongDetails(response,clickedName);
//         },
//         error: function(error){
//             console.log(error);
//         }
//     });
// }

// function showSongDetails(data,artistName){
//     console.log("Data:"+data);
//     console.log(artistName);
//     if (data != null && data != undefined) {
//         var songDetailsContainer = $("#songDetails");
//         songDetailsContainer.empty();

//         for (var i = 0; i < data.length; i++) {
//             var songDetails = data[i];
            
//             var sImage = songDetails.song_image;
//             var sName  = songDetails.song_name;
//             var sAudio = songDetails.audio;
            
//             var sondDetailsDiv = $("<div>").addClass("sondDetails").css({
//                 width: "300px",
//                 height: "300px",
//                 border: "3px solid black",
//                 margin: "20px",
//                 textAlign: "center",
//                 /* boxShadow:"0px 0px 40px rgba(0,0,0,0.9)", */
//             });
            
//             var songImage = $("<img>").attr("src",sImage).appendTo(sondDetailsDiv).css({
//                 width: "50%",
//                 height: "50%",
//                 margin:"20px",
//                 borderRadius: "50%",
//                 boxShadow:"0px 0px 40px rgba(0,0,0,0.6)",
//             });

//             var songName = $("<h4>").text(sName).appendTo(sondDetailsDiv).css({
//                 color:"gray",
//             });

//             var audio = $("<audio>").attr("src",sAudio).appendTo(sondDetailsDiv);
            
//             var song = $("<p>").text("Song").appendTo(sondDetailsDiv);

//             sondDetailsDiv.appendTo(songDetailsContainer);
            
//             sondDetailsDiv.on("click", function() {
//                 var audioElement = $(this).find("audio")[0];
//                 audioElement.play();
//             });
//         }
//     } else {
//         console.log("No song details found.");
//     } 
// } 