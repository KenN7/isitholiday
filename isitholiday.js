// holiday calculator

const holidays = [
    ["2021-01-01", "the New Year!! BTW Happy New Year ;)"],
    ["2021-04-05", "Easter."],
    ["2021-05-13", "the feast of the Ascension."],
    ["2021-05-24", "the Pentecost."],
    ["2021-07-21", "the Belgian national day."],
    ["2021-09-27", "the feast of Wallonie-Bruxelles federation."],
    ["2021-11-01", "the All Saints' Day."],
    ["2021-11-02", "a random holiday."],
    ["2021-11-11", "the Armistice of 1918."],
    ["2021-11-19", "the Saint-Verhaegen (celebration of founding of ULB)."],
    ["2021-12-24", "a fixed holiday."],
    ["2021-12-27", "a backup day for another missed holiday."],
    ["2021-12-28", "a backup day for another missed holiday."],
    ["2021-12-29", "a backup day for another missed holiday."],
    ["2021-12-30", "the day ULB thinks you should take a break."],
    ["2021-12-31", "the day ULB thinks you should get drunk."],
    
    ["2022-01-03", "the backup day for the New Year!! BTW Happy New Year ;)"],
    ["2021-04-18", "Easter."],
    ["2021-05-26", "the feast of the Ascension."],
    ["2021-06-06", "the Pentecost."],
    ["2021-07-21", "the Belgian national day."],
    ["2021-08-15", "the feast of the Assumption of Mary."],
    ["2021-09-27", "the feast of Wallonie-Bruxelles federation."],
    ["2021-11-01", "the All Saints' Day."],
    ["2021-11-02", "a random holiday."],
    ["2021-11-11", "the Armistice of 1918."],
    ["2021-11-18", "the Saint-Verhaegen (celebration of founding of ULB)."],
    ["2021-12-26", "a backup day for another missed holiday."],
    ["2021-12-27", "a backup day for another missed holiday."],
    ["2021-12-28", "a backup day for another missed holiday."],
    ["2021-12-29", "the day ULB thinks you should take a break."],
    ["2021-12-30", "the day ULB thinks you should take a break."],
]

class Checker {
    constructor(days) {
        this.days = days
    }

    dateEquality(date1, date2) {
        return (date1.getFullYear() === date2.getFullYear()) &&
            // getMonth is 0-indexed
            (date1.getMonth() === date2.getMonth()) &&
            (date1.getDate() === date2.getDate())
    }

    check(offset) {
        let day = new Date()
        day.setDate(day.getDate() + offset)
        //console.log(day)
        let holiday = this.days.find(x => this.dateEquality(new Date(x[0] + " 12:00:00Z"), day))
        if (holiday) { //if special holiday from list
            return holiday
        } else { //maybe its friday or saturday ?
            return this.checkWE(day)
        }
    }

    nextHoliday() {
        let day = new Date()
        //console.log(day)
        day.setDate(day.getDate() + 1)
        let nextholiday = this.days.find(x => new Date(x[0] + " 00:00:00Z") > day)
        if (nextholiday) { //if special holiday from list
            // console.log(nextholiday)
            return nextholiday
        } else {
            return "No next holiday"
        }
    }

    checkWE(day) {
        if (day.getDay() === 6) {
            return ["Saturday", "the F*cking week-end!"]
        } else if (day.getDay() === 0) {
            return ["Sunday", "the F*cking week-end!"]
        } else {
            return false
        }

    }

    render() {
        let tomo = this.check(1)
        let today = this.check(0)
        return (`
        <h1>Is it holiday tomorrow at ULB?</h1>
        <div id="holiday">${ tomo ? 'YES.' : 'NO.' }</div>
        <div id="why">${tomo ? `because ${tomo[0]} is ${tomo[1]}` : ''}</div>
          <!-- page today -->
        <div id="today">
        <hr>
        <h4>and what about today?</h4>
        <div id="holidaytd">${ today ? 'YES.' : 'NO.' }</div>
        <div>${today ? `because ${today[0]} is ${today[1]}` : ''}</div>
        <h6>By the way, the next one will be on ${this.nextHoliday()[0]} </h6>
        </div>`)
    }

}

document.addEventListener("DOMContentLoaded", function() {
    const check = new Checker(holidays)
    document.getElementById("app").innerHTML = check.render()
})
