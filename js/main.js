import ninnPlayer from './ninnPlayer.js';

document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('[role=ninnPlayer]');
    players.forEach(player => {
        player.classList.add('ninnPlayer');
        const playerEl = player.querySelector('audio');
        // if (playerEl.controls) playerEl.controls = false;
        playerEl.volume = 0.5;

        const playlistEl = player.querySelector('[role=playlist');
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