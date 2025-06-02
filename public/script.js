// public/script.js
document.getElementById('botForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const type = document.getElementById('type').value;

  const res = await fetch('/api/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, type })
  });

  const data = await res.json();
  alert(data.message);
  loadBots();
});

async function loadBots() {
  const res = await fetch('/api/bots');
  const bots = await res.json();
  const list = document.getElementById('botList');
  list.innerHTML = '';
  bots.forEach(bot => {
    const li = document.createElement('li');
    li.textContent = `🤖 ${bot.name} (${bot.type}) - ${bot.createdAt}`;
    list.appendChild(li);
  });
}

loadBots();
