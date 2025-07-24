<!DOCTYPE html><html lang="es">
<head>
  <meta charset="UTF-8">
  <title>TV en Vivo Argentina</title>
  <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
  <style>
    body {
      background: #121212;
      color: white;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }
    .card {
      background: #1e1e1e;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .card:hover {
      transform: scale(1.05);
    }
    .card img {
      width: 100%;
      height: 120px;
      object-fit: contain;
      background: #000;
    }
    .card p {
      text-align: center;
      margin: 0;
      padding: 0.5rem;
    }
    #player {
      width: 100%;
      max-width: 800px;
      margin: 1rem auto;
      display: block;
    }
  </style>
</head>
<body>
  <video id="player" controls autoplay></video>
  <div class="grid" id="canales"></div>  <script>
    const canales = [
      {
        nombre: "Telefé",
        url: "https://cdn.sensa.com.ar/live/eds/Telefe/live_dash_cld/Telefe.mpd?|referer=https://player.sensa.com.ar/&webtoken=1.0",
        logo: "https://geo.edge.pontiscloud.com:9002/images/115/CH_LOGO/160/160/0/0/57769025072354.png"
      },
      {
        nombre: "Ciudad Magazine",
        url: "https://cdn.sensa.com.ar/live/eds/CiudadMagazine/live_dash_cld/CiudadMagazine.mpd?|referer=https://player.sensa.com.ar/&webtoken=1.0",
        logo: "https://geo.edge.pontiscloud.com:9002/images/367/CH_LOGO/160/160/0/0/917545880726.png"
      },
      {
        nombre: "El Trece",
        url: "https://cdn.sensa.com.ar/live/eds/Canal13/live_dash_cld/Canal13.mpd?|referer=https://player.sensa.com.ar/&webtoken=1.0",
        logo: "https://geo.edge.pontiscloud.com:9002/images/57/CH_LOGO/160/160/0/0/42552730073067.png"
      },
      {
        nombre: "Canal 26",
        url: "https://cdn.sensa.com.ar/live/eds/Canal26/live_dash_cld/Canal26.mpd?|referer=https://player.sensa.com.ar/&webtoken=1.0",
        logo: "https://geo.edge.pontiscloud.com:9002/images/361/CH_LOGO/160/160/0/0/34056872073.png"
      }
    ];

    const contenedor = document.getElementById('canales');
    const player = document.getElementById('player');
    let dashPlayer;

    canales.forEach((canal, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<img src="${canal.logo}" alt="${canal.nombre}"><p>${canal.nombre}</p>`;
      card.onclick = () => reproducir(canal.url);
      contenedor.appendChild(card);
    });

    function reproducir(url) {
      if (dashPlayer) dashPlayer.reset();
      const cleanUrl = url.split('|')[0];
      const query = url.split('|')[1] || "";
      const fullUrl = query ? cleanUrl + '?' + query : cleanUrl;
      dashPlayer = dashjs.MediaPlayer().create();
      dashPlayer.initialize(player, fullUrl, true);
   
