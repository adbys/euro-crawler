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


requestQuotation = function (options, callback) {
  console.log("requestQuotatio")
  requestPromise(options)
  .then(($) => {
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
            } //else if (divText.includes("EUR")) {
              //var quotationEuro = { "euro": divText }
              //console.log(quotationEuro)
            //}
          }
        })
      })
    })
    
    quotation = { 
      "date": date,
      "real": real    
    }

    
    console.log("crawler request: " + quotation)
    
    callback(null, quotation)
  })
  .catch((err) => {
    callback(err);
  })

}


exports.getQuotation =  function (date, callback) {
  console.log("get quotation")
  console.log(date)
  var options = getOptionsObject(date)
  requestQuotation(options, callback)
}


