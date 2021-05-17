import ninnPlayer from './ninnPlayer.js';

document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('[role=nPlayer]');
    players.forEach(player => {
        const playerEl = player.querySelector('audio');
        // if (playerEl.controls) playerEl.controls = false;
        playerEl.volume = 0.5;
        
        const sourcelist = playerEl.querySelectorAll('source');

        let playlist = [];
        for (let i = 0; i < sourcelist.length; i++) {
            playlist.push(sourcelist[i].attributes.src.value);
        }
        new ninnPlayer(player, playerEl, playlist);
    });
});