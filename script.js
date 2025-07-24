fetch('Lista.m3u')
  .then(res => res.text())
  .then(text => {
    const lines = text.split('\n');
    const container = document.getElementById('channels');

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF')) {
        const name = lines[i].split(',')[1] || 'Canal';
        const url = lines[i + 1].trim();

        const playerId = `video${i}`;
        const div = document.createElement('div');
        div.className = 'channel';
        div.innerHTML = `
          <h2>${name}</h2>
          <video id="${playerId}" controls autoplay muted></video>
        `;
        container.appendChild(div);

        const video = document.getElementById(playerId);
        const player = dashjs.MediaPlayer().create();
        player.initialize(video, url, false);
      }
    }
  });
