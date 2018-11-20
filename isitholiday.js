// hilday calculator

var holidays = [
    ["2018-11-20", "the Saint-Verhaegen (celebration of founding of ULB)."],
    ["2018-12-25", "Christmas."],
    ["2018-12-26", "the backup day for 21st of July."],
    ["2018-12-27", "the backup day for 11th of November."],
    ["2018-12-28", "the day ULB thinks you should take a break."],
    ["2018-12-31", "the day ULB thinks you should get drunk."],
    ["2019-01-01", "the New Year!! BTW Happy New Year ;)"],
    ["2019-01-01", "a random holiday that we all enjoy."],
    ["2019-04-22", "Easter."],
    ["2019-05-01", "the celebration of work."],
    ["2019-05-30", "the feast of the Ascension."],
    ["2019-06-10", "the Pentecost."],
    ["2019-08-15", "the Assumption."],
    ["2019-09-27", "the feast of Wallonie-Bruxelles federation."],
    ["2019-11-01", "the All Saints' Day."],
    ["2019-11-11", "the Armistice of 1918."],
    ["2019-11-20", "the Saint-Verhaegen (celebration of founding of ULB)."],
    ["2019-12-25", "Christmas."],
    ["2019-12-26", "the backup day for 21st of July."],
    ["2019-12-27", "the backup day for 2nd of November."],
    ["2019-12-30", "the day ULB thinks you should take a break."],
    ["2019-12-31", "the day ULB thinks you should get drunk."]
];

class Checker {
    constructor(days) {
        this.days = days;
    }

    dateEquality(date1, date2) {
        return (date1.getFullYear() === date2.getFullYear()) &&
           // getMonth is 0-indexed
           (date1.getMonth() === date2.getMonth()) &&
           (date1.getDate() === date2.getDate());
    }

    check(offset) {
        var day = new Date()
        day.setDate(day.getDate() + offset)
        console.log(day)
        var holiday = this.days.find( x => this.dateEquality( new Date(x[0]+" 12:00:00Z"), day ) )
        if ( holiday ) { //if special holiday from list
            return holiday;
        }
        else { //maybe its friday or saturday ?
            return this.checkWE(day);
        }
    }

    checkWE(day) {
        if (day.getDay() == 6) {
            return ["Saturday", "the F*cking week-end!"]
        }
        else if (day.getDay() == 0) {
            return ["Sunday", "the F*cking week-end!"]
        }
        else {
            return false;
        }

    }

    modifyPage() {
        var yesBox = document.getElementById("holiday");
        var reasonBox = document.getElementById("why");
        var yestdBox = document.getElementById("holidaytd");
        var reasontdBox = document.getElementById("whytd");
        var tomo = this.check(1)
        if ( tomo ) {
            yesBox.innerHTML = "YES.";
            reasonBox.innerHTML = "because "+tomo[0]+" is "+tomo[1];
        }
        else {
            yesBox.innerHTML = "NO.";
            reasonBox.innerHTML = "";
        }
        var today = this.check(0)
        if ( today ) {
            yestdBox.innerHTML = "YES.";
            reasontdBox.innerHTML = "because "+today[0]+" is "+today[1];
        }
        else {
            yestdBox.innerHTML = "NO.";
            reasontdBox.innerHTML = "";
        }
    }

}

document.addEventListener("DOMContentLoaded", function(){
    const check = new Checker(holidays);
    check.modifyPage();
});
