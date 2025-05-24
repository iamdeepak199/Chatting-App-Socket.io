const express = require('express');
const http = require('http');
const path = require('path');
const chalk = require('chalk');
const { Server } = require('socket.io');
const db = require('./config/database');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
    const sql = 'INSERT INTO message (sender_name, content) VALUES (?, ?)';
    db.query(sql, [data.name, data.message], (err, result) => {
      if (err) console.error('DB Error:', err);
      else console.log('Message saved:', result.insertId);
    });
  });
});

server.listen(PORT, () => {
  console.log(chalk.bgBlue.white(`Server running at http://localhost:${PORT}`));
});
