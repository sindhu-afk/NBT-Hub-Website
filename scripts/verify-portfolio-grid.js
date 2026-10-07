const fs = require('fs');

async function check() {
  try {
    const tabs = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
    const tab = tabs.find(t => t.url.includes('localhost:3000'));
    if (!tab) {
      console.error('No tab on localhost:3000 found');
      return;
    }
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

    console.log('Dismissing intro splash and scrolling to portfolio...');
    await send('Runtime.evaluate', {
      expression: `
        const splash = document.getElementById('intro-splash');
        if (splash) splash.remove();
        document.body.classList.remove('intro-locked');
        document.getElementById('portfolio').scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise(r => setTimeout(r, 600));

    const info = await send('Runtime.evaluate', {
      expression: `(() => {
        const grid = document.getElementById('portfolio-grid');
        const tiles = Array.from(document.querySelectorAll('.portfolio-tile'));
        const cs = window.getComputedStyle(grid);
        return {
          tileCount: tiles.length,
          gridTemplateColumns: cs.gridTemplateColumns,
          gridBounding: grid.getBoundingClientRect(),
          tiles: tiles.map(t => ({
            title: t.querySelector('.portfolio-tile-title')?.innerText,
            rect: t.getBoundingClientRect()
          }))
        };
      })()`,
      returnByValue: true
    });
    console.log('Grid Info:', JSON.stringify(info.result.value, null, 2));

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const outPath = 'C:/Users/NBT/.gemini/antigravity-ide/brain/361445c9-104e-4227-831d-53e0371ee9b7/portfolio_no_space_verified.png';
    fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
    console.log('Screenshot successfully saved to:', outPath);

    ws.close();
  } catch (err) {
    console.error('Error during check:', err);
  }
}

check();
