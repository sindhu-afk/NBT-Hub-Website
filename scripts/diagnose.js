const fs = require('fs');

async function test() {
  const tabs = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const tab = tabs.find(t => t.url.includes('localhost:49501'));
  if (!tab) {
    console.error('No tab found on localhost:49501');
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

  await send('Page.enable');
  await send('Page.reload', { ignoreCache: true });
  await new Promise(resolve => setTimeout(resolve, 1500));

  for (const width of [375, 768, 1024]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 800,
      deviceScaleFactor: 2,
      mobile: width < 1024
    });
    await new Promise(resolve => setTimeout(resolve, 300));

    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const card = document.querySelector('.card-web-dev');
        const grid = document.querySelector('.services-bento-grid');
        const csCard = window.getComputedStyle(card);
        const csGrid = window.getComputedStyle(grid);
        return {
          viewport: window.innerWidth,
          gridDisplay: csGrid.display,
          gridTemplateColumns: csGrid.gridTemplateColumns,
          cardGridColumn: csCard.gridColumn,
          cardWidth: csCard.width,
          gridBoundingWidth: grid.getBoundingClientRect().width,
          cardBoundingWidth: card.getBoundingClientRect().width
        };
      })()`,
      returnByValue: true
    });
    console.log(`Viewport ${width}px:`, JSON.stringify(evalRes.result.value, null, 2));

    // Scroll to #services and capture screenshot
    await send('Runtime.evaluate', {
      expression: `document.getElementById('services').scrollIntoView({ behavior: 'instant', block: 'start' });`
    });
    await new Promise(resolve => setTimeout(resolve, 300));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`screenshot_${width}_services.png`, Buffer.from(shot.data, 'base64'));

    // Scroll to #portfolio and capture screenshot
    await send('Runtime.evaluate', {
      expression: `document.getElementById('portfolio').scrollIntoView({ behavior: 'instant', block: 'start' });`
    });
    await new Promise(resolve => setTimeout(resolve, 300));

    const shotP = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`screenshot_${width}_portfolio.png`, Buffer.from(shotP.data, 'base64'));
  }

  await send('Emulation.clearDeviceMetricsOverride');
  ws.close();
  console.log('Finished testing.');
}

test().catch(console.error);
