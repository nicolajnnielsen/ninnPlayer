import ninnPlayer from './ninnPlayer.js';

document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('[role=ninnPlayer]');
    players.forEach(player => {
        player.classList.add('ninnPlayer');
        const playerEl = document.createElement('audio');
        playerEl.volume = 0.5;
        player.prepend(playerEl);
        // if (playerEl.controls) playerEl.controls = false;

        const playlistEl = player.querySelector('[role=playlist');
        playlistEl.classList.add('ninnPlaylist');
        playlistEl.querySelector('li').classList.add('ninnCurrent');
        const playlistAr = (playlistEl ? [...playlistEl.children] : []);
        const playlist = playlistAr.map(audio => (
            {
                title: audio.innerText,
                src: audio.dataset.src,
            }
        ));
        new ninnPlayer(player, playerEl, playlistEl, playlist);
    });
});