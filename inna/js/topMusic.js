//Скрыть аудиоплеер
$("#playerContainer").removeAttr("style");
$("#playerContainer").fadeOut(0);

// доступ к кнопке управления звуком видео
var controllerVideo = document.getElementById("controllerVideo");

var video = document.getElementById("mainVideo");

// управление звуком фонового видео
controllerVideo.onclick = function () {
    if (this.classList.contains("mute")) {
        this.classList.remove("mute");
        this.classList.add("unmute");

        //перед включением звука в фоновом видео, надо остановить плеер

        $('#stop').click();

        video.muted = false;
    } else {
        this.classList.remove("unmute");
        this.classList.add("mute");
        video.muted = true;
    }
}

// массви, который хранит названия песен
var songs = ["Держи меня", "Белые кружева", "Когда-нибудь", "Буду с тобой", "Перечитай", "Жемчуга"];

// массви, который хранит ссылки на iTunes
var linksSongs = ["https://itunes.apple.com/us/album/%D0%B4%D0%B5%D1%80%D0%B6%D0%B8-%D0%BC%D0%B5%D0%BD%D1%8F/1163057445?i=1163057584", "https://itunes.apple.com/us/album/%D0%B1%D0%B5%D0%BB%D1%8B%D0%B5-%D0%BA%D1%80%D1%83%D0%B6%D0%B5%D0%B2%D0%B0/1205157542?i=1205157550", "https://itunes.apple.com/us/album/%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0-%D0%BD%D0%B8%D0%B1%D1%83%D0%B4%D1%8C/1159832325?i=1159832390", "https://itunes.apple.com/us/album/%D0%B1%D1%83%D0%B4%D1%83-%D1%81-%D1%82%D0%BE%D0%B1%D0%BE%D0%B9/1159832325?i=1159832387", "https://itunes.apple.com/us/album/%D0%BF%D0%B5%D1%80%D0%B5%D1%87%D0%B8%D1%82%D0%B0%D0%B9/1159832325?i=1159832389", "https://itunes.apple.com/us/album/%D0%B6%D0%B5%D0%BC%D1%87%D1%83%D0%B3%D0%B0/1176939097?i=1176939204"];

// Доступ к кнопка вопроизведения песен
var boxes = document.getElementsByClassName("box");

// Доступ к аудиоплееру
var audioPlayer = document.getElementById("audioPlayer");

// Доступ к кнопке аудиоплеера, которая ставит воспроизведение на паузу и продолжает проигрывание
var playPause = document.getElementById("playPause");

// Доступ к кнопке аудиоплеера, которая закрывает плеер и останавливает песню
var stop = document.getElementById("stop");

// Доступ к блоку аудиоплеера, который будет показывает название песни
var songName = document.getElementById("songName");

// Доступ к кнопке аудиоплеера, которая будет содержать ссылку на iTunes
var iTunesSong = document.getElementById("iTunesSong");

// Переменная для хранения названия песни
var playingSongName = "";

// Когда песня начнет загружаться в блоке названия песни будет отображать "Загрузка..."
audioPlayer.onloadstart = function () {
    songName.innerHTML = "Загрузка...";
}

// Как только трек будет готов к воспроизведению аудиоплеер отобразит его название
audioPlayer.oncanplaythrough = function () {
    songName.innerHTML = playingSongName;
}

// Каждой кнопке вопроизведения назначается обработчик события клика
for (var i = 0; i < boxes.length; i++) {
    boxes[i].onclick = function () {
        
        // Если кнопка содержит класс stopBox воспроизведение следует остановить и назначить класс PlayBox и удалить класс stopBox, а если нет, добавить такой класс и удалить класс PlayBox и начать воспроизведение
        if (this.classList.contains("stopBox")) {
            this.classList.remove("stopBox");
            this.classList.add("playBox");
            // останавливаем воспроизведение
            audioPlayer.pause();
            playPause.classList.remove("pausePlayer");
            playPause.classList.add("playPlayer");
            // скрываем плеер
            $("#playerContainer").fadeOut();

        } else {
            //находим название песни в массиве
            playingSongName = songs[this.dataset.song];
            
            // останавливаем воспроизведение другой песни
            for (i = 0; i < boxes.length; i++) {
                if (boxes[i].classList.contains("stopBox")) {
                    boxes[i].classList.remove("stopBox");
                    boxes[i].classList.add("playBox");
                }
            }
            this.classList.remove("playBox");
            this.classList.add("stopBox");

            audioPlayer.src = "songs/" + this.dataset.song + ".mp3";

            //Перед запуском плеера проверить есть ли звук у фонового видео

            if (controllerVideo.classList.contains("unmute")) {
                controllerVideo.classList.remove("unmute");
                controllerVideo.classList.add("mute");
                video.muted = true;
            };

            audioPlayer.play();
            playPause.classList.remove("playPlayer");
            playPause.classList.add("pausePlayer");

            iTunesSong.href = linksSongs[this.dataset.song];
            $("#playerContainer").fadeIn();
        }
    };
};

// скрыть плеер и остановить воспроизведение по нажатию кноки Stop (крестик)
stop.onclick = function () {
    $("#playerContainer").fadeOut();
    for (i = 0; i < boxes.length; i++) {
        if (boxes[i].classList.contains("stopBox")) {
            boxes[i].classList.remove("stopBox");
            boxes[i].classList.add("playBox");
        }
    }

    audioPlayer.pause();
};

playPause.onclick = function () {
    if (this.classList.contains("playPlayer")) {
        this.classList.remove("playPlayer");
        this.classList.add("pausePlayer");
        audioPlayer.play();
    } else {
        this.classList.remove("pausePlayer");
        this.classList.add("playPlayer");
        audioPlayer.pause();
    }
};

// По окончании воспроизведения трека скрыть плеер
audioPlayer.onended = function () {
    for (i = 0; i < boxes.length; i++) {
        if (boxes[i].classList.contains("stopBox")) {
            boxes[i].classList.remove("stopBox");
            boxes[i].classList.add("playBox");
        }
    }

    $("#playerContainer").fadeOut();

};
