// hilday calculator

var holidays = [
    ["2018/11/21", "Saint V"],
    ["2018/12/24", "noel"]
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

    check() {
        var tomo = new Date(Date.now())
        tomo.setDate(tomo.getDate() + 1)
        var holiday = this.days.find( x => this.dateEquality( new Date(x[0]), tomo ) )
        if ( holiday ) {
            return holiday;
        }
        else {
            return false;
        }
    }

    modifyPage() {
        var yesBox = document.getElementById("holiday");
        var reasonBox = document.getElementById("why");
        var dateBox = document.getElementById("date");
        var today = this.check()
        if ( today ) {
            yesBox.innerHTML = "YES";
            reasonBox.innerHTML = today[1];
            dateBox.innerHTML = today[0];
        }
        else {
            yesBox.innerHTML = "NO";
        }
    }

}

document.addEventListener("DOMContentLoaded", function(){
    const check = new Checker(holidays);
    console.log(check.check());
    check.modifyPage();
});
