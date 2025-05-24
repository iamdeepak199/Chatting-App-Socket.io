const socket = io();
let username = '';

while (!username) {
  username = prompt("Enter your name:");
}

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    const data = { name: username, message: input.value };
    socket.emit('chat message', data);
    input.value = '';
  }
});

socket.on('chat message', (data) => {
  const item = document.createElement('li');
  item.textContent = `${data.name}: ${data.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
