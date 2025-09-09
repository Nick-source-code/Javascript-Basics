const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
let server;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/stop', (req, res) => {
    res.send('Server wird gestoppt...');
    server.close(() => {
        console.log('Server gestoppt.');
        process.exit(0);
    });
});

server = app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
    console.log("Gib 'stop' im Terminal ein, um den Server zu beenden.");
});

// Stoppen über Terminal-Eingabe
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) {
    if (data.trim() === 'stop') {
        console.log('Server wird gestoppt...');
        server.close(() => {
            console.log('Server gestoppt.');
            process.exit(0);
        });
    }
});
