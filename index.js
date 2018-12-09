const express = require('express')
const app = express()
const port = 8080
const crawler = require('./crawler.js');
var cors = require('cors');

app.use(cors());

var url = require('url');

//http://localhost:8080/quontation-day/?day=01&month=10&year=2018
app.get('/quotation-day', (request, response) => {
    console.log('Quotation day')
    var q = url.parse(request.url, true).query;
    var date = q.day + "-" + q.month + "-" + q.year;
    console.log('Check quotation day: ' + date);
    crawler.getQuotation(date, function (err, data) {
            console.log(data);
            response.send(data)
    });
    
})

//localhost:8080/quotation-period/?iniDay=01&iniMonth=10&iniYear=2018&finDay=03&finMonth=10&finYear=2018
app.get('/quotation-period', (request, response) => {
    console.log('Quotation period')
    var q = url.parse(request.url, true).query;
    var iniDate = q.iniDay;
    var finDate = q.finDay;
    console.log('Check quotation period since: ' + iniDate);
    console.log('Check quotation period until: ' + finDate);
    crawler.getPeriodQuotations(iniDate, finDate, function (err, data) {
        response.send(data)
    });
})
  
app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }  
    console.log(`server is listening on ${port}`)
})
