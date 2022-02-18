let player;
const playerContainer = $(".player");

let eventsInit = () => {
    $(".player__start").click(e => {
        e.preventDefault();

        if (playerContainer.hasClass("paused")) {
            //playerContainer.removeClass("paused");
            player.pauseVideo();
        } else {
            //playerContainer.addClass("paused");
            player.playVideo();
        }
    });
};


$(".player__playback").click( e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newCirclePositionPercent = clickedPosition / bar.width() * 100;
    const newPlaybackPositionSecond = 
    (player.getDuration() / 100) * newCirclePositionPercent;

    $(".player__playback-slider .inner-circle").css({
        left: `${newCirclePositionPercent}%`
    });

    player.seekTo(newPlaybackPositionSecond);

});

$(".player__volume-slider").click( e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newCirclePositionPercent = clickedPosition / bar.width() * 100;

    $(".player__volume-slider .inner-circle").css({
        left: `${newCirclePositionPercent}%`
    });

    $(".player__volume-slider .player__playback__progress-line").css({
        width: `${newCirclePositionPercent}%`
    });

    player.setVolume(newCirclePositionPercent);
});

$(".player__splash").click( e => {
    player.playVideo();
});

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);
    
    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
};

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    $(".player__duration__estimate").text(formatTime(durationSec));

    if (typeof interval !== "undefined") {
        clearInterval(interval);
    }

    interval = setInterval(() => {

        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-slider .inner-circle").css({
            left: `${completedPercent}%`
        });

        $(".player__playback-slider .player__playback__progress-line").css({
            width: `${completedPercent}%`
        });

        $(".player__duration__completed").text(formatTime(completedSec));
    } , 1000);

    $(".player__volume-slider .inner-circle").css({
        left: `${50}%`
    });

    $(".player__volume-slider .player__playback__progress-line").css({
        width: `${50}%`
    });

    player.setVolume(50);
};

const onPlayerStateChange = event => {

    switch (event.data) {
        case 1:
            playerContainer.addClass("active");
            playerContainer.addClass("paused");
            break;
        case 2:
            playerContainer.removeClass("active");
            playerContainer.removeClass("paused");
            break;
    }
};

function onYouTubeIframeAPIReady() {
   
    player = new YT.Player("yt-player", {
        height: '392',
        width: '662',
        videoId: '7gphiFVVtUI',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0
        }
    });
  }

  eventsInit();