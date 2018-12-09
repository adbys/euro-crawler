const requestPromise = require('request-promise')
const cheerio = require('cheerio')
const dateUtils = require('./date-utils.js');

const webSiteTitleText = "Valor do Euro em "
const baseUrl = "https://www.neocambio.io/cotacao/euro/"



getOptionsObject = function (date) {
  return options = {
    uri: baseUrl + date,
    transform: function (body) {
      return cheerio.load(body)
    }
  }
}

resolvePromise = function (promise, callback) {
  promise.then(($) => {
    var quotation = {}
    var date = ""
    var real = ""
    $('.card__body').each((i, body) => {
      $(body).find('.card__title').each((i, title) => {
        var titleText = $(title).text()       
        //Not today
        if (titleText.length > 18) {
          date = titleText.substring(webSiteTitleText.length)
        } else {
          date = dateUtils.formatDate(new Date());
        }
      })
      $(body).find('.currency__wrapper').each((i, item) => {
        $(item).find('h2').each((i, div) => {
          var divText = $(div).text()
          if (divText !== "") {
            if (divText.includes("R$")) {
              real = divText
            } 
          }
        })
      })
    })
    
    quotation = { 
      "date": date,
      "real": real    
    }
    
    callback(null, quotation)
  })
  .catch((err) => {
    console.log(err);
  })

}

requestQuotation = function (options, callback) {
  var promise = requestPromise(options)
  resolvePromise(promise, callback)
  
}

exports.getPeriodQuotations = function (iniDate, finDate, callback) {
  var dates = dateUtils.getDaysBetween(iniDate, finDate)
  var quotations = []
  var promises = []
  for (i = 0; i < dates.length; i++) {
    var options = getOptionsObject(dates[i])
    promises.push(requestPromise(options))
  }
  Promise.all(promises).then((promise) => {
    for (i = 0; i < promise.length; i++) {
      resolvePromise(promise[i], (err, data, quotations) => {
        quotations.push(data)
      })
}


exports.getQuotation =  function (date, callback) {
  var options = getOptionsObject(date)
  requestQuotation(options, callback)
}


