const https = require('https');
const OAuthToken = "PMIYFOP2XIKRU4QDXNFA"; //Anonymous access OAuth token
const Category  = '102';

function get(titles,done) {
    const req = https.get(makeUrl(titles), function (res) {
        res.setEncoding('utf-8');
        var body = '';

        if(res.statusCode !== 200){
            res.on('data', function (data) {
                body+=data;
            });
            res.on('end', function () {
                var result = JSON.parse(body);
                done(new Error("Ошибка: " + res.statusMessage + '('+ res.statusCode + '); '+ 'error description: '+result.error_description));
            });
            res.resume();
            return;
        }

        res.on('data', function (data) {
            body+=data;
        });
        res.on('end', function () {
            var result;
            try{
                result = body;
            } catch (error){
                done(error);
            }
            done(null, result)
        })

    });

    req.on('error', function (error) {
        done(error );
    });
}
function makeUrl(titles) {
    return "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&token="+OAuthToken+"&location.address="+titles.city+
        "&location.within="+titles.distance+"km&categories="+Category+"&start_date.range_start="+titles.date1+"&start_date.range_end="+titles.date2
}
module.exports = {
    get
};