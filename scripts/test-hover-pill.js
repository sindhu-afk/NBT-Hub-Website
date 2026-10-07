const fs = require('fs');

async function test() {
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

    const info = await send('Runtime.evaluate', {
      expression: `(() => {
        const tiles = document.querySelectorAll('.portfolio-tile');
        if (!tiles[2]) return 'no tile 2';
        tiles[2].classList.add('is-featured-active');
        return {
          tile2Class: tiles[2].className,
          hasPills: !!tiles[2].querySelector('.portfolio-tile-hover-pills'),
          pillsHTML: tiles[2].querySelector('.portfolio-tile-hover-pills')?.outerHTML
        };
      })()`,
      returnByValue: true
    });
    console.log('Info:', info.result.value);

    await new Promise(r => setTimeout(r, 200));
    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const outPath = 'C:/Users/NBT/.gemini/antigravity-ide/brain/361445c9-104e-4227-831d-53e0371ee9b7/portfolio_hover_pill_test.png';
    fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
    console.log('Saved hover test screenshot to:', outPath);
    ws.close();
  } catch (err) {
    console.error(err);
  }
}

test();
