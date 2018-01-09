const fs = require('fs');
const path = require('path');
const url = require('url');

var titles = {};
function search(req, res) {
    const parsedUrl = url.parse(req.url, true);
    titles.t = parsedUrl.query.title;
    titles.city = titles.t[0];
    titles.date1 = titles.t[1];
    titles.date2 = titles.t[2]
    titles.distance = titles.t[3];

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    const stream = fs.createReadStream(path.resolve('public', 'events.html')); // читаем файл с диска с помощью потока

    stream.pipe(res);    //соединяем поток записи с потоком чтения
}

exports.search = search;
exports.titles = titles;