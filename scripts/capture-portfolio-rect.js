const fs = require('fs');

async function check() {
  try {
    const tabs = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
    const tab = tabs.find(t => t.url.includes('localhost:3000'));
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);
    let id = 1;
    const send = (method, params = {}) => new Promise((res, rej) => {
      const mid = id++;
      const handler = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === mid) {
          ws.removeEventListener('message', handler);
          if (d.error) rej(d.error);
          else res(d.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: mid, method, params }));
    });

    console.log('Reloading page to fetch updated v=9 assets...');
    await send('Page.reload', { ignoreCache: true });
    await new Promise(r => setTimeout(r, 2200));

    await send('Runtime.evaluate', {
      expression: `
        const splash = document.getElementById('intro-splash');
        if (splash) splash.remove();
        document.body.classList.remove('intro-locked');

        // Center portfolio-grid
        const grid = document.getElementById('portfolio-grid');
        grid.scrollIntoView({ behavior: 'instant', block: 'center' });

        // Highlight TokensBoy card (3rd card, index 2) with is-featured-active matching the mockup!
        const tiles = document.querySelectorAll('.portfolio-tile');
        if (tiles[2]) {
          tiles[2].classList.add('is-featured-active');
        }
      `
    });
    await new Promise(r => setTimeout(r, 600));

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const outPath = 'C:/Users/NBT/.gemini/antigravity-ide/brain/361445c9-104e-4227-831d-53e0371ee9b7/portfolio_redesign_verified.png';
    fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
    console.log('Saved redesign screenshot to:', outPath);
    ws.close();
  } catch (err) {
    console.error(err);
  }
}

check();
