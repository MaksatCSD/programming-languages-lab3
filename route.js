const fs = require('fs');
const path = require('path');

function route(req, res) {
    const extension = path.extname(req.url); // получить расширение
    const filename = req.url.slice(1);
    var contentType = '';

    switch (extension) {
        case '.html':
            contentType = 'text/html';
            break;
        case  '.css':
            contentType = 'text/css';
            break;
        case  '.js':
            contentType = 'text/javascript';
            break;
        default:
            contentType = 'text/plain';
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);

    const stream = fs.createReadStream(path.resolve('public', filename)); // читаем файл с диска с помощью потока

    stream.pipe(res); //соединяем поток записи с потоком чтения
}
module.exports = route;