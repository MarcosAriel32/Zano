const listUrl = "Lism3"; // Tu lista IPTV remota

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "admin" && pass === "admin") {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
    loadChannels();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

async function loadChannels() {
  try {
    const res = await fetch(listUrl);
    const text = await res.text();
    const lines = text.split("\n");
    const container = document.getElementById("channelList");

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("#EXTINF")) {
        const name = lines[i].split(",").pop().trim();
        const logoMatch = lines[i].match(/tvg-logo="([^"]+)"/);
        const logo = logoMatch ? logoMatch[1] : "https://via.placeholder.com/100x100?text=Logo";
        const url = lines[i + 1]?.trim();

        const card = document.createElement("div");
        card.className = "bg-gray-800 rounded-lg shadow p-2 flex flex-col items-center hover:shadow-lg";
        card.innerHTML = `
          <img src="${logo}" alt="${name}" class="w-24 h-24 object-contain mb-2 rounded" />
          <p class="mb-2 font-semibold text-center">${name}</p>
          <button class="bg-green-600 px-3 py-1 rounded" onclick="playChannel('${url}')">Ver</button>
        `;
        container.appendChild(card);
      }
    }
  } catch (error) {
    console.error("Error al cargar canales:", error);
    alert("No se pudo cargar la lista.");
  }
}

function playChannel(url) {
  const video = document.getElementById("video");

  if (shaka.Player.isBrowserSupported()) {
    const player = new shaka.Player(video);
    player.load(url).then(() => {
      console.log("Canal cargado:", url);
    }).catch(e => {
      console.error("Error al cargar canal:", e);
      alert("Error al reproducir canal");
    });
  } else {
    alert("Tu navegador no soporta Shaka Player.");
  }
}
