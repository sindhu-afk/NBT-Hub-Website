async function clean() {
  const tabs = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const tab = tabs.find(t => t.url.includes('localhost:3000'));
  if (!tab) return;
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  ws.onopen = () => {
    ws.send(JSON.stringify({
      id: 1,
      method: 'Runtime.evaluate',
      params: { expression: "document.querySelectorAll('.portfolio-tile').forEach(e => e.classList.remove('is-featured-active'));" }
    }));
    setTimeout(() => { ws.close(); process.exit(0); }, 300);
  };
}
clean();
