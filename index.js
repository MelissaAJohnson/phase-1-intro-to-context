function createEmployeeRecord(array) {
    const employee = {};
    employee.firstName = array[0];
    employee.familyName = array[1];
    employee.title = array[2];
    employee.payPerHour = array[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee
}

function createEmployeeRecords(arrayArray) {
    const employees = [];
    for (const element of arrayArray) {
        let record = createEmployeeRecord(element)
        employees.push(record)
    }
    return employees
}

function createTimeInEvent(record, timeInStamp) {
    let timeIn = {
        type: 'TimeIn',
        hour: Number(timeInStamp.substring(11, 15)),
        date: timeInStamp.substring(0, 10)
    };
    record.timeInEvents.push(timeIn);
    return record;
}

function createTimeOutEvent(record, timeOutStamp) {
    let timeOut = {
        type: 'TimeOut',
        hour: Number(timeOutStamp.substring(11, 15)),
        date: timeOutStamp.substring(0, 10)
    };
    record.timeOutEvents.push(timeOut);
    return record;
}

function hoursWorkedOnDate(record, formDate) {
    const timeInArray = record.timeInEvents;
    const timeOutArray = record.timeOutEvents;
    for (let i = 0; i < timeInArray.length; i++) {
        if (timeInArray[i].date === formDate) {
            let timeIn = timeInArray[i].hour
            for (let x = 0; x < timeOutArray.length; x++) {
                if (timeOutArray[x].date === formDate) {
                    return (timeOutArray[x].hour - timeIn)/100
                }
            }
        }
    }
}

function wagesEarnedOnDate(record, formDate) {
    const wages = hoursWorkedOnDate(record, formDate) * record.payPerHour;
    return wages;
}

function allWagesFor(record) {
    let totalWages = 0;
    const timeInArray = record.timeInEvents;
    // iterate through timeInEvents
    for (let i = 0; i < timeInArray.length; i++) {
        // using date in timeInEvents, call wagesEarnedOnDate
        // update total
        totalWages += wagesEarnedOnDate(record, timeInArray[i].date)
    }
    return totalWages;
}

function calculatePayroll(employeeRecords) {
    let payroll = 0;
    for (let i = 0; i < employeeRecords.length; i++) {
        const timeInArray = employeeRecords[i].timeInEvents;
        for (let x = 0; x < timeInArray.length; x++) {
            payroll += wagesEarnedOnDate(employeeRecords[i], timeInArray[x].date)
        }
    }
    return payroll;
}