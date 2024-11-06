var _this = this;
// create object with interface
var player = {
    currentSong: "Stay",
    currentSongDuration: 50000, // 50000 means 50 seconds
    play: function () {
        console.log("Playing " + _this.currentSong);
    },
    pause: function () {
        console.log("Paused" + _this.currentSong);
    },
    next: function () {
        console.log("Next song");
    },
    previous: function () {
        console.log("Previous song");
    }
};
// implement interface with class
var AudioPlayer = /** @class */ (function () {
    function AudioPlayer(songInfo) {
        var _this = this;
        this.play = function () {
            console.log("Playing " + _this.currentSong);
        };
        this.pause = function () {
            console.log("Paused" + _this.currentSong);
        };
        this.next = function () {
            console.log("Next song");
        };
        this.previous = function () {
            console.log("Previous song");
        };
        this.currentSong = songInfo.name;
        this.currentSongDuration = songInfo.duration;
    }
    ;
    return AudioPlayer;
}());
// create object with class
var player1 = new AudioPlayer({ name: "Stay", duration: 50000 });
var player2 = new AudioPlayer({ name: "Happier", duration: 30000 });
// print object
console.log(player1.currentSong, player1.currentSongDuration);
console.log(player2.currentSong, player2.currentSongDuration);
