// 2021 -> July -> 11, 12, 13 -> Sunday, Monday, Tuesday // The days this was scripted.

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

    const date = new Date();
    date.setFullYear(year, month, 1); // January -> 0

    const dayIndex = date.getDay();

    return { dayIndex: dayIndex, day: days[dayIndex] };
}

// dayIndex: (Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5, Saturday = 6)
function displayDays(dayIndex) {
    const dayTiles = document.querySelectorAll(".calender-tile");

    // Check whether the dayIndex is valid or not.
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
            dayTile.removeAttribute("data-day");
        });
}

function showCalender(date, month, year) {
    month -= 1; // January -> 0

    clearCalenderDayTiles();

    // Display days in corresponding dayTiles.
    displayDays(firstDayOfMonth(month, year).dayIndex);

    document.querySelectorAll(".calender-tile").forEach((dayTile) => {
        const dayTileClassList = dayTile.classList;

        if (month === currentDate.getMonth() && dayTile.dataset.day == date) {
            // Highlight current day.
            dayTileClassList.add("current-day");
        } else if (dayTileClassList.contains("current-day")) {
            dayTileClassList.remove("current-day");
        }
    });

    // Set values for span in header div.
    const headerSpan = document.querySelector(".header > span");
    headerSpan.textContent = `${month + 1} / ${year}`;
    headerSpan.setAttribute("data-month", month + 1);
    headerSpan.setAttribute("data-year", year);
}

function previousAndNextMonthButtons() {
    const date = currentDate.getDate();
    let month = currentDate.getMonth(); // January -> 0
    let year = currentDate.getFullYear();

    document.querySelectorAll(".header > div").forEach((button) => {
        button.onclick = () => {
            month += parseInt(button.dataset.monthOffset);

            if (month > 12) {
                month = 1;
                year += 1;
            } else if (month < 1) {
                month = 12;
                year -= 1;
            }

            showCalender(date, month, year);
        };
    });
}

// function addTodo(selectedDate, selectedMonth, selectedYear) {
//     const todoItemKey = `${selectedDate}/${selectedMonth}/${selectedYear}`;
//     const todoItem = JSON.stringify({
//         time: new Date().getTime(),
//         todo: "Hello, world!",
//     });

//     localStorage.setItem(todoItemKey, todoItem);

//     setTimeout(() => {
//         console.log(localStorage.getItem(todoItemKey));
//     }, 5000);

//     setTimeout(() => {
//         localStorage.removeItem(todoItemKey);
//     }, 10000);
// }

// Add onclick listeners to each dayTile.
function selectDayTile() {
    let headerSpan;
    let selectedDate;
    let selectedYear;

    document
        .querySelectorAll(".calender-tile:not(.name-of-day)")
        .forEach((dayTile) => {
            dayTile.onclick = () => {
                headerSpan = document.querySelector(".header > span");
                selectedDate = parseInt(dayTile.dataset.day);
                selectedMonth = parseInt(headerSpan.dataset.month);
                selectedYear = parseInt(headerSpan.dataset.year);

                showTodo(selectedDate, selectedMonth, selectedYear);
            };
        });
}

function showTodo(selectedDate, selectedMonth, selectedYear) {
    console.log(selectedDate, selectedMonth, selectedYear);

    const todoItemKey = `${selectedDate}/${selectedMonth}/${selectedYear}`;
    const todoItem = JSON.stringify({
        time: new Date().getTime(),
        todo: "Hello, world!",
    });

    // localStorage.setItem(todoItemKey, todoItem);

    setTimeout(() => {
        console.log(localStorage.getItem(todoItemKey));
    }, 5000);

    // setTimeout(() => {
    //     localStorage.removeItem(todoItemKey);
    //     console.log("Todo removed!");
    // }, 10000);
}

showCalender(
    currentDate.getDate(),
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
);
previousAndNextMonthButtons();
selectDayTile();

// localStorage.setItem("name", "Paradox");
// console.log(localStorage.getItem("name"));
// localStorage.removeItem("name");
// console.log(localStorage.getItem("name"));
