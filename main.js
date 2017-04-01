
//VARIABLES---------------------------------------------------------------------
var tracks = [''];
var currentTrack = 0;
var soundcloud;

// SOUND CLOUD API---------------------------------------------------------------
$(document).ready(function(){
	SC.initialize({
		client_id: 'fd4e76fc67798bfa742089ed619084a6'
	});

	SC.get('/tracks',{
		q:'fake love'
	}).then(function(response){
		console.log(response)
		tracks = response;
		$("h1").html(tracks[currentTrack].title);
	}).then(function(){
		Jukebox();
		$("#play").click(playBtn);
		$("#pause").click(pauseBtn);
		$("#nextButton").click(playNext);
		$("#stopButton").click(stopBtn);
	});
});

//JUKEBOX ----------------------------------------------------------------------
function Jukebox(){
	SC.stream('/tracks/'+ tracks[0].id).then(function(player){	
		soundcloud = player;
		player.play();
		player.on("finish",function(){
			currentTrack = currentTrack+1;
			soundcloud.play();
		});
	});
}
//PLAY BUTTON-------------------------------------------------------------------
function playBtn(){
	soundcloud.play();
}

//PAUSE BUTTON-------------------------------------------------------------------
function pauseBtn(){
	soundcloud.pause();
}

//STOP BUTTON-------------------------------------------------------------------
function stopBtn(){
	soundcloud.pause();
	soundcloud.seek(0);
	soundcloud.pause();	
}

//NEXT BUTTON-------------------------------------------------------------------
function playNext() {
	if(tracks.indexOf(currentTrack) < tracks.length) {
		soundcloud.pause();
		currentTrack = currentTrack+1;
		if ( currentTrack >= tracks.length){
			currentTrack = 0;
		}
		SC.stream('/tracks/'+ tracks[currentTrack].id).then(function(player){
			soundcloud = player;
			$("#h1").html(tracks[currentTrack].title);
			soundcloud.play();
		})
	}
}
//SEARCH BAR-----------------------------------------------------------------------
$("#searchBar_button").click(function(){
	var searchBar_value = $("#searchBar").val();
	console.log(searchBar_value);
	SC.get('/tracks',{
		q:searchBar_value
	}).then(function(response){
		console.log(response);
		tracks = response;
		$("h1").html(tracks[currentTrack].title);
	}).then(function(){
		Jukebox();	
	})
})
//JUNK YARD------------------------------------------------------------------------
// Clean :)