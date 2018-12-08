const express = require('express')
const app = express()
const port = 8080
const crawler = require('./crawler.js');
const dateUtils = require('./date-utils.js');

var http = require('http');
var url = require('url');


//crawler.getQuotation("08-12-2018", function (err, data) {
//    console.log(data);
//});

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     var q = url.parse(req.url, true).query;
//     var txt = q.year + " " + q.month;
//     res.end(txt);
// }).listen(8080);


// const requestHandler = (request, response) => {
//     console.log(request.url)
//     response.end('Hello Node.js Server!')
//   }
  
//   const server = http.createServer(requestHandler)
  
//   server.listen(port, (err) => {
//     if (err) {
//       return console.log('something bad happened', err)
//     }
  
//     console.log(`server is listening on ${port}`)
//   })

//http://localhost:8080/quontation-day/?day=01&month=10&year=2018
app.get('/quontation-day', (request, response) => {
    console.log('Quotation day')
    var q = url.parse(request.url, true).query;
    var date = q.day + "-" + q.month + "-" + q.year;
    console.log('Check quotation day: ' + date);
    crawler.getQuotation(date, function (err, data) {
            console.log(data);
            response.send(data)
    });
    
})

//localhost:8080/quontation-period/?iniDay=01&iniMonth=10&iniYear=2018&finDay=03&finMonth=10&finYear=2018
app.get('/quontation-period', (request, response) => {
    console.log('Quotation period')
    var quotations = new Array()
    var q = url.parse(request.url, true).query;
    var iniDate = q.iniDay + "-" + q.iniMonth + "-" + q.iniYear;
    var finDate = q.finDay + "-" + q.finMonth + "-" + q.finYear;
    console.log('Check quotation period since: ' + iniDate);
    console.log('Check quotation period until: ' + finDate);
    var dates = dateUtils.getDaysBetween(iniDate, finDate)

    Promise.all([dates.forEach(date => {crawler.getQuotation(date)})]).then((values) => {
        console.log(values)
    })
    
        //[dates.forEach(date => {crawler.getQuotation(date)}])).then(function(values) {
        //    console.log(values);
        //})
        // crawler.getQuotation(date, function (err, data) {
        //         //quotations.append(data);
        //         console.log("data do for")
        //         console.log(data)
        //         console.log("quotations depois do append")
        //         console.log(quotations)
        //     });
        // })
    // );
    
    response.send(quotations)
})
  
app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }  
    console.log(`server is listening on ${port}`)
})