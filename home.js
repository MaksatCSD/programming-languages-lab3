const fs = require('fs');
const path = require('path');

function home(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    const stream = fs.createReadStream(path.resolve('public', 'index.html')); // читаем файл с диска с помощью потока

    stream.pipe(res); //соединяем поток записи с потоком чтения
}

module.exports = home;