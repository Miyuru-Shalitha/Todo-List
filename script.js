// 2021 -> July -> 12 -> Monday // The day this was scripted.

// 1  -> 31
// 2  -> 28 / 29
// 3  -> 31
// 4  -> 30
// 5  -> 31
// 6  -> 30
// 7  -> 31
// 8  -> 31
// 9  -> 30
// 10 -> 31
// 11 -> 30
// 12 -> 31

// let year = 4000;
// let month = 7;
// let day = 12;

const currentDate = new Date();

function numberOfDaysOfMonth(month, year) {
    // Check whether "month" is a valid month or not.
    if (month > 12) {
        alert(`${month} is not a valid month!`);
        return;
    }

    // If "month" is a vaild month check the number of days.
    if (month === 2) {
        if (checkLeapYear(year)) {
            return 29;
        } else {
            return 28;
        }
    } else if (month < 8) {
        if (month % 2 === 0) {
            return 30;
        } else {
            return 31;
        }
    } else {
        if (month % 2 === 0) {
            return 31;
        } else {
            return 30;
        }
    }
}

// Check whether the year is a leap year or not.
function checkLeapYear(year) {
    if (year % 100 === 0) {
        if (year % 400 === 0) {
            console.log(`${year} is a leap year`);
            return true;
        } else {
            console.log(`${year} is not a leap year`);
            return false;
        }
    } else if (year % 4 === 0) {
        console.log(`${year} is a leap year`);
        return true;
    } else {
        console.log(`${year} is not a leap year`);
        return false;
    }
}

// console.log(numberOfDaysOfMonth(7, 2021));

// Return the name of the first day of the month.
// Example: (2021 -> July   -> 1 -> Thursday)
// Example: (2021 -> August -> 1 -> Sunday)
function firstDayOfMonth(month, year) {
    // Check whether the month is valid or not.
    if (month > 11) {
        alert(`Month ${month} is out of range. (January -> 0)`);
    }

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const d = new Date();
    d.setFullYear(year, month, 1); // January -> 0

    const dayIndex = d.getDay();

    return { dayIndex: dayIndex, day: days[dayIndex] };
}

// dayIndex: (Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5, Saturday = 6)
function displayDays(dayIndex) {
    const dayTiles = document.querySelectorAll(".calender-tile");

    // Check whether the dayIndex in valid or not.
    if (dayIndex === undefined || dayIndex < 0 || dayIndex > 6) {
        alert(
            `dayIndex: ${dayIndex} is out of range! It must be between 0 - 6 (including 0 and 6)`
        );
        return;
    }

    // Set corresponding day for dayTile.
    for (let i = 1; i <= numberOfDaysOfMonth(7, 2021); i++) {
        document.querySelector(`#day-tile${dayIndex}`).textContent = i;
        document
            .querySelector(`#day-tile${dayIndex}`)
            .setAttribute("data-day", i);
        dayIndex++;

        if (dayIndex > 34) {
            dayIndex = dayIndex - 35;
        }
    }
}

function clearCalenderDayTiles() {
    document
        .querySelectorAll(".calender-tile:not(.name-of-day)")
        .forEach((dayTile) => {
            dayTile.textContent = "";
        });
}

function showCalender(monthOffset, yearOffset) {
    clearCalenderDayTiles();

    console.log(monthOffset, yearOffset);

    // const currentDate = new Date();

    const date = currentDate.getDate();
    let month = currentDate.getMonth() + monthOffset; // January -> 0
    let year = currentDate.getFullYear() + yearOffset;

    // if (month > 11) {
    //     month = month - 12;
    // }

    // Display days in corresponding dayTiles.
    displayDays(firstDayOfMonth(month, year).dayIndex);

    // if (monthOffset === 0) {
    //     // Highlight current day.
    //     document.querySelectorAll(".calender-tile").forEach((dayTile) => {
    //         if (dayTile.dataset.day == date) {
    //             dayTile.classList.add("current-day");
    //         }
    //     });
    // } else {
    //     document.querySelectorAll(".calender-tile").forEach((dayTile) => {
    //         if (dayTile.classList.contains("current-day")) {
    //             dayTile.classList.remove("current-day");
    //         }
    //     });
    // }

    document.querySelectorAll(".calender-tile").forEach((dayTile) => {
        const dayTileClassList = dayTile.classList;

        if (monthOffset === 0 && dayTile.dataset.day == date) {
            // Highlight current day.
            dayTileClassList.add("current-day");
        } else if (dayTileClassList.contains("current-day")) {
            dayTileClassList.remove("current-day");
        }
    });

    document.querySelector(".header > span").textContent = `${date} / ${
        month + 1
    } / ${year}`;
}

// function changeMonth(monthOffset, yearOffset) {
//     showCalender(monthOffset, yearOffset);
// }

///////////////////////////////////////////////////

// setTimeout(() => {
//     changeMonth(1);
// }, 5000);

// setTimeout(() => {
//     changeMonth(0);
// }, 10000);

// document.querySelector(".header > div").onclick = () => {
//     console.log(this.dataset);
// };

function previousAndNextMonthButtons() {
    let offset = 0;

    document.querySelectorAll(".header > div").forEach((button) => {
        button.onclick = () => {
            offset += parseInt(button.dataset.monthOffset);

            if (currentDate.getMonth() + offset > 11) {
                offset = 0;
            }

            showCalender(offset, 0);
            // changeMonth(offset, 0);
        };
    });
}

showCalender(0, 0);
previousAndNextMonthButtons();
