function ninnPlayer(container, player, playlistEl, playlist) {
    console.log(playlist);
    if (!player.src) {
        if (playlist.length === 0) {
            console.error('No available sources provided to the player, please either add a src to the <audio> element or to a playlist as described in the documentation');
            throw new Error('No playable sources provided');
        } else {
            player.src = playlist[0].src;
        }
    }

    // Creating controls 
    const timeline = document.createElement('div');
    const controls = document.createElement('div');
    timeline.classList.add('nTimeline');
    controls.classList.add('nControls');

    const playBtn = document.createElement('button');
    const restart = document.createElement('button');
    const fastForward = document.createElement('button');
    const rewind = document.createElement('button');
    const nextTrack = document.createElement('button');
    const prevTrack = document.createElement('button');
    const muteBtn = document.createElement('button');
    const volume = document.createElement('input');
    const progressWrap = document.createElement('div');
    const progress = document.createElement('progress');
    const rateSelect = document.createElement('select');

    // Adding events to controls
    addPlayBtn(playBtn, player);
    addVolumeControl(volume, muteBtn, player);
    addProgressbar(progress, progressWrap, player);
    addSkipBtns(restart, fastForward, rewind, player);
    addTrackChangeBtns(nextTrack, prevTrack, player, playlistEl, playlist);
    addPlaybackRate(rateSelect, player);
    addPlaylistEvent(player, playlistEl, playlist);

    // Adding controls to markup
    progressWrap.appendChild(progress);
    timeline.append(restart, progressWrap, muteBtn, volume);
    controls.append(prevTrack, rewind, playBtn, fastForward, nextTrack);
    container.append(timeline, controls);
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

const addPlayBtn = (btn, player) => {
    const playIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    const pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
    btn.innerHTML = playIcon;
    btn.classList.add('nBtn', 'nPlay');
    btn.setAttribute('id', 'nPlay');
    btn.addEventListener('click', () => {
        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
    });
    
    player.addEventListener('play', () => {
        btn.innerHTML = pauseIcon;
    });

    player.addEventListener('pause', () => {
        btn.innerHTML = playIcon;
    });
}

const addSkipBtns = (restart, skipforward, skipBack, player) => {
    const restartIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-ccw"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>';
    const fwdIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-fast-forward"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>';
    const rwdIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rewind"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>';
    
    restart.innerHTML = restartIcon;
    restart.classList.add('nBtn', 'nRestart');
    restart.addEventListener('click', () => {
        player.currentTime = 0;
    });

    skipforward.innerHTML = fwdIcon;
    skipforward.classList.add('nBtn', 'nSkip', 'nFfwd');
    skipBack.innerHTML = rwdIcon;
    skipBack.classList.add('nBtn', 'nSkip', 'nRwd');
    skipforward.addEventListener('click', () => {
        player.currentTime = player.currentTime + 10;
    });
    skipBack.addEventListener('click', () => {
        player.currentTime = player.currentTime - 10;
    });
}

const addTrackChangeBtns = (nextTrack, prevTrack, player, playlistEl, playlist) => {
    const nxtIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-forward"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>';

    nextTrack.innerHTML = nxtIcon;
    nextTrack.classList.add('nBtn', 'nCngTrack', 'nNext');
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

    const prevIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-back"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>';
    prevTrack.innerHTML = prevIcon;
    prevTrack.classList.add('nBtn', 'nCngTrack', 'nPrev');
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
}

const addVolumeControl = (vol, muteBtn, player) => {
    const muteIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
    const lowIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-1"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
    const highIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';

    let preMuteVolume = player.volume;
    vol.type = 'range';
    vol.classList.add('nVol');
    vol.attributes.min = 0;
    vol.attributes.max = 100;
    vol.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        player.volume = volume;
        preMuteVolume = volume;

        if (volume === 0) {
            muteBtn.innerHTML = muteIcon;
        } else if (volume < 0.5) {
            muteBtn.innerHTML = lowIcon;
        } else {
            muteBtn.innerHTML = highIcon;
        }
    });

    muteBtn.innerHTML = highIcon;
    muteBtn.classList.add('nBtn', 'nMute');
    muteBtn.addEventListener('click', () => {
        if (player.volume === 0) {
            player.volume = preMuteVolume;
            vol.value = preMuteVolume * 100;
            if (preMuteVolume !== 0) {
                muteBtn.innerHTML = preMuteVolume > 50 ? highIcon : lowIcon;
            }
        } else {
            player.volume = 0;
            vol.value = 0;
            muteBtn.innerHTML = muteIcon;

        }
    });
}

const addProgressbar = (progress, progressWrap, player) => {
    progressWrap.classList.add('nProgressWrapper');

    progress.classList.add('nProgress');
    progress.max = 100;
    progress.value = player.currentTime;
    player.addEventListener('timeupdate', () => {
        const percent = player.currentTime / player.duration * 100;
        progress.value = percent;
    });
    progress.addEventListener('click', (e) => {
        const skipToPercent = (e.pageX - progressWrap.offsetLeft) / progressWrap.offsetWidth;
        player.currentTime = skipToPercent * player.duration;
    });

    const formatTime = (time) => (time.toString().padStart(2, '0'));

    progressWrap.addEventListener('mousemove', (e) => {
        progressWrap.style.setProperty('--posLeft', `${e.offsetX}px`);
        const skipToPercent = (e.pageX - progressWrap.offsetLeft) / progressWrap.offsetWidth;
        const time = skipToPercent * player.duration;
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        progressWrap.dataset.time = `${hours >= 1 ? formatTime(hours) + ':' : ''}${formatTime(minutes)}:${formatTime(seconds.toFixed(0))}`;
    });
}

const addPlaybackRate = (rateSelect, player) => {
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
}

export default ninnPlayer;