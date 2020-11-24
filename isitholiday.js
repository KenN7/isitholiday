// hilday calculator

const holidays = [
    ["2020-01-01", "the New Year!! BTW Happy New Year ;)"],
    ["2020-01-02", "a random holiday that we all enjoy."],
    ["2020-04-13", "Easter."],
    ["2020-05-01", "the celebration of work."],
    ["2020-05-21", "the feast of the Ascension."],
    ["2020-05-22", "the first covid holiday."],
    ["2020-05-29", "the second covid holiday."],
    ["2020-06-01", "the Pentecost."],
    ["2020-07-21", "the Belgian national day."],
    ["2020-11-02", "a random holiday."],
    ["2020-11-11", "the Armistice of 1918."],
    ["2020-11-20", "the Saint-Verhaegen (celebration of founding of ULB)."],
    ["2020-12-24", "a fixed holiday."],
    ["2020-12-25", "Christmas."],
    ["2020-12-28", "the backup day for 15th of August."],
    ["2020-12-29", "the backup day for 27th of September."],
    ["2020-12-30", "the day ULB thinks you should take a break."],
    ["2020-12-31", "the day ULB thinks you should get drunk."],
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
