const urlLista = "https://pastebin.com/raw/Dxiva5RP";

async function cargarLista() {
  const res = await fetch(urlLista);
  const texto = await res.text();
  const lineas = texto.split("\n");

  const canales = [];
  for (let i = 0; i < lineas.length; i++) {
    if (lineas[i].startsWith("#EXTINF")) {
      const titulo = lineas[i].split(",")[1];
      const logoMatch = lineas[i].match(/tvg-logo="([^"]+)"/);
      const logo = logoMatch ? logoMatch[1] : "https://via.placeholder.com/150";
      const url = lineas[i + 1];
      canales.push({ titulo, logo, url });
    }
  }

  mostrarCanales(canales);
}

function mostrarCanales(canales) {
  const contenedor = document.getElementById("canales");
  const player = dashjs.MediaPlayer().create();
  const video = document.getElementById("videoPlayer");

  canales.forEach((canal, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<img src="${canal.logo}"/><p>${canal.titulo}</p>`;
    div.onclick = () => {
      player.initialize(video, canal.url, true);
    };
    contenedor.appendChild(div);

    if (i === 0) {
      player.initialize(video, canal.url, true);
    }
  });
}

cargarLista();
