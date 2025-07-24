fetch('Lista.m3u')
  .then(res => res.text())
  .then(data => {
    const lines = data.split('\n');
    const container = document.getElementById('channels');

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF')) {
        const name = lines[i].split(',')[1] || 'Canal';
        const url = lines[i + 1];

        const card = document.createElement('div');
        card.className = 'channel-card';
        const videoId = `player${i}`;
        card.innerHTML = `
          <h3>${name}</h3>
          <video id="${videoId}" controls></video>
        `;
        container.appendChild(card);

        const player = dashjs.MediaPlayer().create();
        player.initialize(document.getElementById(videoId), url, false);
      }
    }
  });
