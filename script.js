fetch('Lista.m3u')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n');
    const container = document.getElementById('channels');

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF')) {
        const nameMatch = lines[i].match(/,(.+)/);
        const name = nameMatch ? nameMatch[1] : 'Canal';

        const url = lines[i + 1];
        const card = document.createElement('div');
        card.className = 'channel-card';

        card.innerHTML = `
          <h3>${name}</h3>
          <video src="${url}" controls width="100%" height="auto"></video>
        `;
        container.appendChild(card);
      }
    }
  });
