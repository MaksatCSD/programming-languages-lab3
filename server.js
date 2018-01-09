const http = require('http');

const route = require('./route');
const home = require('./home');
const search = require('./search');
const evenrbrite = require('./eventbrite')

http.createServer(function (req, res) {
    if(req.url.match(/\.(html|css|js)$/)) {
        route(req, res)
    } else if (req.url === '/'){
        home(req, res);
    } else if (req.url.startsWith('/search')){
        search.search(req,res);
    } else if(req.url ==='/data'){

         evenrbrite.get(search.titles, function (error, ev) {
            if (error) {
                console.log(error.message);
                res.writeHead(500,{'Content-Type': 'text/plain'});
                res.end(error.message);
            };
            console.log(ev);
            res.end(ev);
        });

    } else {
        res.end('not found');
    }

}).listen(3000, function () {
    console.log('Сервер работает')});
