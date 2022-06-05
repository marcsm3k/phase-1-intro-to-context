
const createEmployeeRecord = (recArray) => {
    return {
        firstName: recArray[0],
        familyName: recArray[1],
        title: recArray[2],
        payPerHour: recArray[3],
        timeInEvents: [],
        timeOutEvents: []

     }
}


const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}


const createTimeInEvent = function (obj, dateStamp) {
    const [date, hour] = dateStamp.split(" ")

    const inEvent = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date 
    }
    obj.timeInEvents.push(inEvent)
    

    return obj
}


const createTimeOutEvent = function(obj, dateStamp) {
    const [date, hour] = dateStamp.split(" ")

    const outEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date 
    }
    obj.timeOutEvents.push(outEvent)
    

    return obj
}


function hoursWorkedOnDate(obj, date){
    let hours;
    
    for (let i=0; i<obj.timeInEvents.length; i++){

        if (obj.timeInEvents[i].date === date){

            if (obj.timeOutEvents[i].date === date){

                hours = obj.timeOutEvents[i].hour - obj.timeInEvents[i].hour
            }
        }
    }

    return hours/100
}

function wagesEarnedOnDate(obj, date){
    return (hoursWorkedOnDate(obj, date)) * obj.payPerHour
}

function allWagesFor(obj){
    let allPay = [];
    let allDates = [];

    for (let i = 0; i < obj.timeInEvents.length; i++){
        allDates.push(obj.timeInEvents[i].date)
    }

    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(obj, date))
    });

    return allPay.reduce(( previousValue, currentValue ) => previousValue + currentValue)
}

function calculatePayroll(arrObj){
    let payroll = [];

    arrObj.forEach(employee => {
        payroll.push(allWagesFor(employee)) 
    });

    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}


