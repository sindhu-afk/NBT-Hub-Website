const fs = require('fs');
async function test() {
  const tabs = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const tab = tabs.find(t => t.url.includes('localhost:49501'));
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 1;
  const send = (method, params = {}) => new Promise(res => {
    const mid = id++;
    const handler = (e) => {
      const d = JSON.parse(e.data);
      if (d.id === mid) { ws.removeEventListener('message', handler); res(d.result); }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

  const widths = [480, 414, 375];
  for (const w of widths) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 750, deviceScaleFactor: 1, mobile: true });
    await send('Runtime.evaluate', {
      expression: `
        document.getElementById('services')?.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise(r => setTimeout(r, 600));
    const res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`services_${w}px.png`, Buffer.from(res.data, 'base64'));

    const evalRes = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        viewportWidth: ${w},
        bodyScrollWidth: document.body.scrollWidth,
        servicesScrollWidth: document.querySelector('.services-bento-grid')?.scrollWidth,
        cardWebDevLeft: document.querySelector('.card-web-dev')?.getBoundingClientRect().left,
        cardWebDevWidth: document.querySelector('.card-web-dev')?.getBoundingClientRect().width,
        iconCircleLeft: document.querySelector('.circle-web')?.getBoundingClientRect().left
      })`,
      returnByValue: true
    });
    console.log(`Result at ${w}px:`, evalRes.result.value);
  }

  await send('Emulation.clearDeviceMetricsOverride');
  ws.close();
}
test().catch(console.error);
