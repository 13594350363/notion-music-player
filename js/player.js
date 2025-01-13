let playlistItems = [];

window.addEventListener('message', function(event) {
    // 接收来自Notion的消息
    if (event.data.type === 'ADD_AUDIO') {
        addToPlaylist(event.data.url, event.data.title);
    }
});

function addToPlaylist(url, title) {
    const player = document.getElementById('audio-player');
    const playlist = document.getElementById('playlist');
    
    if (!playlistItems.includes(url)) {
        playlistItems.push(url);
        
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.textContent = title || url.split('/').pop();
        item.onclick = () => {
            document.querySelectorAll('.playlist-item').forEach(i => {
                i.classList.remove('now-playing');
            });
            item.classList.add('now-playing');
            player.src = url;
            player.play();
        };
        
        playlist.appendChild(item);
        
        if (playlistItems.length === 1) {
            player.src = url;
            item.classList.add('now-playing');
        }
    }
} 