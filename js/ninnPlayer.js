function ninnPlayer(container, player, playlistEl, playlist) {
    console.log(playlist);
    const controls = document.createElement('div');
    addPlayBtn(controls, player);
    addVolumeControl(controls, player);
    addProgressbar(controls, player);
    addSkipBtns(container, player);
    addTrackChangeBtns(container, player, playlistEl, playlist);
    addPlaybackRate(controls, player);
    addPlaylistEvent(player, playlistEl, playlist);
    container.append(controls);
}

const addPlaylistEvent = (player, playlistEl, playlist) => {
    const songs = playlistEl.querySelectorAll('li');
    songs.forEach((song, i) => {
        song.addEventListener('click', (e) => {
            songs.forEach(el => el.classList.remove('ninnCurrent'));
            e.target.classList.add('ninnCurrent');
            player.currentTime = 0;
            player.src = playlist[i].src;
            player.play();

        })
    });
}

const addPlayBtn = (controls, player) => {
    const playBtn = document.createElement('button');
    playBtn.innerHTML = 'Play'
    playBtn.classList.add('btnPlay');
    playBtn.setAttribute('id', 'nPlay');
    playBtn.addEventListener('click', () => {
        if (player.paused) {
            player.play();
            playBtn.innerHTML = 'Pause';
        } else {
            player.pause();
            playBtn.innerHTML = 'Play';
        }
    });
    controls.append(playBtn);
}

const addSkipBtns = (controls, player) => {
    const restart = document.createElement('button');
    const skipforward = document.createElement('button');
    const skipBack = document.createElement('button');
    restart.innerHTML = 'Restart';
    restart.addEventListener('click', () => {
        player.currentTime = 0;
    });

    skipforward.innerHTML = 'fwd';
    skipBack.innerHTML = 'rwd';
    skipforward.addEventListener('click', () => {
        player.currentTime = player.currentTime + 10;
    });
    skipBack.addEventListener('click', () => {
        player.currentTime = player.currentTime - 10;
    });

    controls.append(restart, skipforward, skipBack);
}

const addTrackChangeBtns = (controls, player, playlistEl, playlist) => {
    const nextTrack = document.createElement('button');
    nextTrack.innerHTML = 'Next';
    nextTrack.addEventListener('click', () => {
        const currentSrc = playlistEl.querySelector('.ninnCurrent');
        const currentIndex = playlist.findIndex((element) => element.title == currentSrc.innerText);
        if (currentIndex !== playlist.length - 1) {
            player.currentTime = 0;
            player.src = playlist[currentIndex + 1].src;
            player.play();
            currentSrc.classList.remove('ninnCurrent');
            playlistEl.children[currentIndex + 1].classList.add('ninnCurrent');
        } else {
            player.currentTime = 0;
            player.src = playlist[0].src;
            player.play();
            currentSrc.classList.remove('ninnCurrent');
            playlistEl.children[0].classList.add('ninnCurrent');
        }
    });

    const prevTrack = document.createElement('button');
    prevTrack.innerHTML = 'Prev';
    prevTrack.addEventListener('click', () => {
        const currentSrc = playlistEl.querySelector('.ninnCurrent');
        const currentIndex = playlist.findIndex((element) => element.title == currentSrc.innerText);
        const playlistLenght = playlist.length;
        if (currentIndex !== 0) {
            player.currentTime = 0;
            player.src = playlist[currentIndex - 1].src;
            player.play();
            currentSrc.classList.remove('ninnCurrent');
            playlistEl.children[currentIndex - 1].classList.add('ninnCurrent');
        } else {
            player.currentTime = 0;
            player.src = playlist[playlistLenght -1].src;
            player.play();
            currentSrc.classList.remove('ninnCurrent');
            playlistEl.children[playlistLenght - 1].classList.add('ninnCurrent');
        }
    });

    controls.append(prevTrack, nextTrack);
}

const addVolumeControl = (controls, player) => {
    let preMuteVolume = player.volume;
    const vol = document.createElement('input');
    vol.type = 'range';
    vol.attributes.min = 0;
    vol.attributes.max = 100;
    vol.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        player.volume = volume;
        preMuteVolume = volume;
    });

    const mute = document.createElement('button');
    mute.innerHTML = 'Mute';
    mute.addEventListener('click', () => {
        if (player.volume === 0) {
            player.volume = preMuteVolume;
            vol.value = preMuteVolume * 100;
        } else {
            player.volume = 0;
            vol.value = 0;

        }
    });

    controls.append(mute, vol);
}

const addProgressbar = (controls, player) => {
    const progress = document.createElement('progress');
    progress.max = 100;
    progress.value = player.currentTime;
    player.addEventListener('timeupdate', () => {
        const percent = player.currentTime / player.duration * 100;
        progress.value = percent;
    });
    progress.addEventListener('click', (e) => {
        const skipToPercent = (e.pageX - progress.offsetLeft) / progress.offsetWidth;
        player.currentTime = skipToPercent * player.duration;
    });
    // progress.addEventListener('mousemove', () => {
    //     console.log('hovering');
    // });
    controls.append(progress);
}

const addPlaybackRate = (controls, player) => {
    const rateSelect = document.createElement('select');
    const rates = [0.5, 0.6, 0.75, 0.9, 1, 1.1, 1.25, 1.4, 1.5, 1.75, 2];

    for (let i = 0; i < rates.length; i++) {
        const rateOption = document.createElement('option');
        rateOption.text = rates[i] + 'x';
        rateOption.value = rates[i];
        if (rates[i] === 1) {
            rateOption.selected = true;
        }
        rateSelect.appendChild(rateOption);
    }

    rateSelect.addEventListener('change', (e) => {
        player.playbackRate = e.target.value;
    })

    controls.append(rateSelect);
}

export default ninnPlayer;