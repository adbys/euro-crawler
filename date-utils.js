Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


exports.formatDate = function (date) {
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    
    if(day < 10) {
        day = '0' + day
    } 
    
    if(month < 10) {
        month = '0' + month
    } 
  
    return day + "/" + month + "/" + year
}

getDateFromString = function (date) {
    var dateStringSplitted = date.split("-")
    var date = new Date(dateStringSplitted[2], dateStringSplitted[1] - 1, dateStringSplitted[0])
    return date
}

exports.getDaysBetween = function (iniDate, finDate) {
    var dateArray = new Array()
    begin = getDateFromString(iniDate)
    end = getDateFromString(finDate)
    while (begin <= end) {
        dateArray.push(this.formatDate(new Date(begin)))
        begin = begin.addDays(1)
    }
    return dateArray
}