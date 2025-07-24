const canales = [
  {
    nombre: "Canal 26",
    logo: "https://geo.edge.pontiscloud.com:9002/images/361/CH_LOGO/160/160/0/0/34056872073.png",
    url: "https://cdn.sensa.com.ar/live/eds/Canal26/live_dash_cld/Canal26.mpd",
    license: {
      type: "org.w3.clearkey",
      key: "b35aecc554b859a97cf11b892731af1f:3a5da1a7c6a5cc6e488bdbbbf09132ff"
    },
    headers: {
      referer: "https://player.sensa.com.ar/",
      webtoken: "1.0"
    }
  }
];

// Código para cargar el reproductor
function cargarCanales() {
  const contenedor = document.getElementById("canales");
  canales.forEach(canal => {
    const card = document.createElement("div");
    card.className = "canal-card";

    const logo = document.createElement("img");
    logo.src = canal.logo;
    logo.alt = canal.nombre;

    const nombre = document.createElement("p");
    nombre.textContent = canal.nombre;

    card.appendChild(logo);
    card.appendChild(nombre);
    card.onclick = () => reproducir(canal);
    contenedor.appendChild(card);
  });
}

function reproducir(canal) {
  const video = document.getElementById("video");
  if (dashjs.MediaPlayer.isSupported()) {
    const player = dashjs.MediaPlayer().create();
    player.updateSettings({
      streaming: {
        headers: {
          Referer: canal.headers.referer,
          webtoken: canal.headers.webtoken
        }
      },
      protection: {
        clearkey: {
          clearkeys: {
            [canal.license.key.split(":")[0]]: canal.license.key.split(":")[1]
          }
        }
      }
    });
    player.initialize(video, canal.url, true);
  } else {
    alert("Tu navegador no soporta reproducción DASH.");
  }
}

window.onload = cargarCanales;
