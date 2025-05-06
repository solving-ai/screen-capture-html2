(function () {
  function loadHtml2Canvas(callback) {
    if (window.html2canvas) {
      callback();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
      script.onload = callback;
      document.head.appendChild(script);
    }
  }

  function startPlugin() {
    const style = document.createElement("style");
    style.innerHTML = `
      #capture-html2-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 100px;
        cursor: pointer;
        z-index: 9999;
        transition: background 0.3s ease;
      }
      #capture-html2-btn:hover {
        background: #218838;
      }
      #html2-modal {
        display: none;
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, 0.6);
      }
      #html2-modal-content {
        background: white;
        margin: 5% auto;
        padding: 20px;
        width: 90%;
        max-width: 600px;
        border-radius: 8px;
        text-align: center;
      }
      .html2-thumb img {
        max-width: 100%;
        border: 1px solid #ccc;
        margin: 10px 0;
      }
    `;
    document.head.appendChild(style);

    const html = `
      <button id="capture-html2-btn">Capturar HTML2</button>
      <div id="html2-modal">
        <div id="html2-modal-content">
          <h3>Capturas</h3>
          <div id="html2-results"></div>
          <br />
          <button onclick="document.getElementById('html2-modal').style.display='none'">Cerrar</button>
        </div>
      </div>
    `;
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    async function startCapturing() {
      const btn = document.getElementById("capture-html2-btn");
      btn.disabled = true;
      btn.textContent = "Tomando fotos... espera 5 segundos";

      const resultBox = document.getElementById("html2-results");
      resultBox.innerHTML = "";
      document.getElementById("html2-modal").style.display = "block";

      for (let i = 0; i < 5; i++) {
        const canvas = await html2canvas(document.body);
        const src = canvas.toDataURL("image/png");
        const div = document.createElement("div");
        div.className = "html2-thumb";
        div.innerHTML = `
          <img src="${src}" />
          <br/>
          <a href="${src}" download="captura-${i + 1}.png">Descargar captura ${
          i + 1
        }</a>
          <hr/>
        `;
        resultBox.appendChild(div);
        await sleep(1000);
      }

      btn.disabled = false;
      btn.textContent = "Capturar HTML2";
    }

    document.getElementById("capture-html2-btn").onclick = startCapturing;
  }

  loadHtml2Canvas(startPlugin);
})();

