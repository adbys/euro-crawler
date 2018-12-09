# Cotação EURO

This backend service is available on: http://142.93.249.9:8081/

## Endpoints

There are two API endpoints available:

* http://142.93.249.9:8081/quotation-day
* http://142.93.249.9:8081/quotation-period

Both endpoints receive only GET Requests.

### Quotation Day

This end point will return the euro quotation for a specific day.

*Usage:* Make a get request passing a query string _day_

Example: http://142.93.249.9:8081/quotation-day/?day=03-12-2018
         This request will return the Euro quotation for December, 03th 2018

### Quotation Period

This end point will return the euro quotation for a specific period.

*Usage:* Make a get request passing a query string _iniDay_ and _finDay_

Example: http://142.93.249.9:8081/quotation-period/?iniDay=01-11-2018&finDay=08-12-2018
         This request will return the Euro quotation from November, 01st 2018 until December, 08th 2018
