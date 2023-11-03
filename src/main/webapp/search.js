		const data = ['Vaa Vaathi', 'Vaa Vaathi(Dhanush Reprise version)', 'Kalangudhe', 'Naadodi-Mannan',
			'One Life', 'Sooriya Paravaigaley', 'Alappara Theme(Instrumental)', 'Hukum Thalaivar Alappara',
			'Jailer Drill Theme', 'Jailer Theme', 'Jujubee', 'Kaavaalaa', 'Muthuvel Pandian Theme', 'Rathamaarey',
			'Bloody Sweet','Glimpse of Antony Das','Glimpse of Harold Das','Naa Ready','A Life Full Of Love',
			'Kannazhaga','Come on Girls','Poo nee Poo','The Rhythem of love','Theme of 3','Why this kolaveri di','Idhazhin Oram',
			'Nee Partha','Life of Pazham','Kanneer Sindha','Life of Pazham','Mayakkama Kalakkama','Megham Karukatha','Thaai Kelavi',
			'Thenmozhi','Anbirkum','Arukaani Angamma','Chill Makkaa','Naan Gaali','Naan Gaali(Reprise)','Palapattra','Po','Ennai Vittu',
			'Saachitale','Mama Kutty','Pacha Elai','Ennai Vittu(U1 version)','Ennai Vittu','Aradhya','En Rojaa Neeye','Kushi(Title Song)',
			'Azhagin Azhagu','Hey Sita Hey Rama','Kaalangal Thaandi','Kannukkulle','Kurumugil','Kurunchiragu','Piriyadhey','Sita Ramam(Theme)',
			'Thoodha','Uraiyum Theeyil','Chillendra Chillendra','Enthara Enthara','Kannukkul Pothivaippen','Khwaja Ji','Rayile Raa','Yaaro Ival'];
		
		const searchInput = document.getElementById('searchInput');
		const resultsList = document.getElementById('results');
		const snContainer = document.getElementById('snContainer');
		
		/*const smallEachDiv = document.querySelector('.smallEachDiv');*/
		
		window.addEventListener('load', () => { // Use window.addEventListener for the 'load' event
		    const displayData = data; // Initially, display all data
		    displayResults(displayData);
		});
		
		function displayResults(results) {
		    results.forEach(result => {
		        const div = document.createElement('div');
		        div.textContent = result;
		        div.classList.add("smallEachDiv");
		        resultsList.appendChild(div);
		        
		        // Add a click event listener to each div
		        div.addEventListener('click', () => {
		            sendDataToJava(result); // Send the clicked item to Java
		            snContainer.style.display = "flex";
		        });
		    });
		}
		
		searchInput.addEventListener('input', () => {
		    const searchTerm = searchInput.value.toLowerCase();
		    const filteredData = data.filter(item => item.toLowerCase().includes(searchTerm));
		    filteredResults(filteredData);
		});
		
		function filteredResults(results) {
		    resultsList.innerHTML = '';
		    results.forEach(result => {
		        const div = document.createElement('div');
		        div.textContent = result;
		        div.classList.add("smallEachDiv");
		        resultsList.appendChild(div);
		        
		        // Add a click event listener to each div
		        div.addEventListener('click', () => {
		            sendDataToJava(result); // Send the clicked item to Java
		            snContainer.style.display = "flex";
		        });
		    });
		}
		
		  // sending details to java page
		  function sendDataToJava(name){
			$.ajax({
				type: "POST",
				url: "/MusicPlayer/songName",
				data: { songName: name },
				success: function(res){
					getSongsFromSongName(res, name);
				},
				error: function(error){
					console.log(error);
				}
			});
		}
		
		var snmusic = document.getElementById("snAudioPlayer");
		var snProgress_bar = document.getElementById("snProgress_bar");
		var snProgressed = document.getElementById("snProgressed");
		var snCurrent_time = document.querySelector(".snCurrent_time");
		var snTotal_duration = document.querySelector(".snTotal_duration");
		var snPause = document.getElementById("snPause");
		var backward = document.getElementById("snBackward");
		var forward = document.getElementById("snForward");
		
		var sndynamicDiv = document.getElementById("sndynamicDiv");
		var sndisplayAudio = sndynamicDiv.querySelector("audio");
	    var sndisplayImage = sndynamicDiv.querySelector("img");
	    var sndisplayName = sndynamicDiv.querySelector("h2");
		/*var snpTag = sndynamicDiv.querySelector("p");*/
		var sfId;
		
		
		function getSongsFromSongName(data,songName){
			if (data != null && data != undefined) {
				console.log(songName);
				
				for (var i = 0; i < data.length; i++) {
					var songsFromName = data[i];
					
					var sfImage = songsFromName.song_image;
					var sfName  = songsFromName.song_name;
					var sfAudio = songsFromName.audio;
							sfId = songsFromName.newSongID;
					
					update(sfImage,sfName,sfAudio,sfId);
			  }
				
			} else {
				console.log("No song details found.");
			} 
		}
		
		function update(sfImage,sfName,sfAudio,sfId){
			sndynamicDiv.style.display = "flex";   // flex
		    sndisplayImage.src = sfImage;
			sndisplayName.innerHTML = sfName;
		    sndisplayAudio.src = sfAudio;
			/*pTag.innerHTML = para;*/
		
			sndisplayAudio.play();
			snPause.innerHTML = "pause";
			
			if(sfId == 1){
			backward.style.display = "none";
			forward.addEventListener("click", function() {
				sfId++;
				sendSongIDToJava(sfId);
		
			});
			}else if(sfId == 64){
				forward.style.display = "none";
				backward.addEventListener("click", function() {
					sfId--;
					sendSongIDToJava(sfId);
			
				});
			}
			else if(sfId >=2 && sfId <= 63){
				backward.style.display = "block";
				backward.addEventListener("click", function() {
					sfId--;
					sendSongIDToJava(sfId);
			
				});
				forward.addEventListener("click", function() {
					sfId++;
					sendSongIDToJava(sfId);
			
				});
			}
		}
				
		function sendSongIDToJava(clickedID) {
			$.ajax({
				type: "POST",
				url: "/MusicPlayer/getSongsUsingSongId",
				data: { songID: clickedID },
				success: function(res) {
					showSongsUsingId(res);
				},
				error: function(error){
					console.log(error);
				}
			});
		}
		function showSongsUsingId(response){
			
			if (response != null && response != undefined) {		
				for (var i = 0; i < response.length; i++) {
					var songIdDetails = response[i];
					
					var idName  = songIdDetails.song_name;
					var idImage = songIdDetails.song_image;
					var idAudio = songIdDetails.audio;
					var id = songIdDetails.newSongID;
					/*var idPara = clickedName;*/
		
					update(idImage,idName,idAudio,id);
				}
			} else {
				console.log("Song Id NOT found.");
			}
		
		}		
		
		// accessing the progress bar 
		snProgress_bar.addEventListener("click",function(e){
			snmusic.currentTime = (e.offsetX/snProgress_bar.offsetWidth)* snmusic.duration;
			sndisplayAudio.play();
			if (snPause.innerHTML == "play_arrow") {
			  sndisplayAudio.play();
			  snPause.innerHTML = "pause";
			}
		});
		
		// play , pause button accessing
		snPause.addEventListener("click", function() {
			if (snPause.innerHTML == "pause") {
			  sndisplayAudio.pause();
			  snPause.innerHTML = "play_arrow";
			} else if (snPause.innerHTML == "play_arrow") {
			  sndisplayAudio.play();
			  snPause.innerHTML = "pause";
			}
		});
		
		// inserting the correct time to timingDiv
		snmusic.ontimeupdate = function(){
			snProgressed.style.width = Math.floor(snmusic.currentTime*100/snmusic.duration)+"%"; // setting the correct time's width.
			snCurrent_time.innerHTML = setTime(snmusic.currentTime);
			snTotal_duration.innerHTML = setTime(snmusic.duration);
			
			if(sfId == 64){
				console.log("Stoped");
			}else if(sfId >=1 && sfId <= 63){
				if(snCurrent_time.innerText == snTotal_duration.innerText){
					sfId++;
					sendSongIDToJava(sfId);
				}
			}
		}
		
		// calculating the correct time
		const setTime = (time) =>{
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
		
		
		
		
		/*,'','','','','','','',''
			,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',
			'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',*/
		
		
		
		
		
