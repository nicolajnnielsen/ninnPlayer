function ninnPlayer(container, player, playlist) {
    // console.log(playlist);
    const controls = document.createElement('div');
    addPlayBtn(controls, player);
    addVolumeControl(controls, player);
    addProgressbar(controls, player);
    addSkipBtns(container, player);
    // addTrackChangeBtns(container, player, playlist);
    container.append(controls);
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

const addTrackChangeBtns = (controls, player, playlist) => {
    const nextTrack = document.createElement('button');
    nextTrack.innerHTML = 'Next';
    nextTrack.addEventListener('click', () => {

        // player.src = playlist[1];
        // player.play();
    });
    controls.append(nextTrack);
}

const addVolumeControl = (controls, player) => {
    const vol = document.createElement('input');
    vol.type = 'range';
    vol.attributes.min = 0;
    vol.attributes.max = 100;
    vol.addEventListener('input', (e) => {
        player.volume = e.target.value / 100;
    });

    const mute = document.createElement('button');
    mute.innerHTML = 'Mute';
    mute.addEventListener('click', () => {
        player.volume = 0;
        vol.value = 0;

    });

    controls.append(mute, vol);
}

const addProgressbar = (controls, player) => {
    // const progress = document.createElement('progress');
    // progress.max = 100;
    // progress.value = player.currentTime;
    // player.addEventListener('timeupdate', () => {
    //     const percent = player.currentTime / player.duration * 100;
    //     progress.value = percent;
    // });
    // progress.addEventListener('click', (e) => {
    //     const skipToPercent = (e.pageX - progress.offsetLeft) / progress.offsetWidth;
    //     player.currentTime = skipToPercent * player.duration;
    // });
    // // progress.addEventListener('mousemove', () => {
    // //     console.log('hovering');
    // // });
    // controls.append(progress);
}

export default ninnPlayer;