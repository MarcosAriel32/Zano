const canales = [
  {
    nombre: "A24",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/A24_logo.png",
    url: "https://linear-401.frequency.stream/401/hls/master/playlist.m3u8?key=admin"
  },
  {
    nombre: "América",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Am%C3%A9rica_TV_logo.svg",
    url: "https://example.com/tu-canal2.mpd?key=admin"
  }
  // Agregá más canales como este
];

// Inicializa Shaka
function initPlayer(container, url) {
  const video = document.createElement('video');
  video.className = 'video-player';
  video.autoplay = false;
  video.controls = true;

  container.appendChild(video);

  const player = new shaka.Player(video);
  player.configure({
    drm: {
      clearKeys: { }
    }
  });

  player.load(url).catch(e => {
    console.error("Error al cargar canal:", e);
    video.poster = "https://i.imgur.com/1H0UnNc.png";
  });
}

window.onload = () => {
  const contenedor = document.getElementById('canales-container');

  canales.forEach(canal => {
    const card = document.createElement('div');
    card.className = 'card';

    const titulo = document.createElement('h2');
    titulo.textContent = canal.nombre;

    const logo = document.createElement('img');
    logo.src = canal.logo;
    logo.alt = canal.nombre;

    card.appendChild(logo);
    card.appendChild(titulo);

    contenedor.appendChild(card);

    initPlayer(card, canal.url);
  });
};
