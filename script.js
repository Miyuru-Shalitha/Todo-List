// 2021 -> July -> 11, 12, 13, 14, 15 -> Sunday, Monday, Tuesday, Wednesday, Thursday // The days this was scripted.

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

let headerSpan;
let selectedDate;
let selectedMonth;
let selectedYear;

let headerMonth = currentDate.getMonth(); // Month in header.
let headerYear = currentDate.getFullYear(); // Year in header.

function numberOfDaysOfMonth(month, year) {
    month++;
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
    for (let i = 1; i <= numberOfDaysOfMonth(headerMonth, headerYear); i++) {
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

        if (
            year === currentDate.getFullYear() &&
            month === currentDate.getMonth() &&
            dayTile.dataset.day == date
        ) {
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

    showBottomBorders(month + 1, year);
}

function previousAndNextMonthButtons() {
    const date = currentDate.getDate();
    // let month = currentDate.getMonth(); // January -> 0
    // let headerYear = currentDate.getFullYear();
    headerMonth = currentDate.getMonth();
    headerYear = currentDate.getFullYear();

    // showBottomBorders(headerMonth, headerYear);

    document.querySelectorAll(".header > button").forEach((button) => {
        button.onclick = () => {
            headerMonth += parseInt(button.dataset.monthOffset);

            if (headerMonth > 11) {
                headerMonth = 0;
                headerYear += 1;
            } else if (headerMonth < 0) {
                headerMonth = 11;
                headerYear -= 1;
            }

            showCalender(date, headerMonth + 1, headerYear);

            showBottomBorders(headerMonth + 1, headerYear);
        };
    });
}

// Add onclick listeners to each dayTile.
function selectDayTile() {
    document
        .querySelectorAll(".calender-tile:not(.name-of-day)")
        .forEach((dayTile) => {
            dayTile.onclick = () => {
                headerSpan = document.querySelector(".header > span");
                selectedDate = parseInt(dayTile.dataset.day);
                selectedMonth = parseInt(headerSpan.dataset.month);
                selectedYear = parseInt(headerSpan.dataset.year);

                showTodo();
            };
        });
}

// "Add" button functionality.
function addTask() {
    document.querySelector(".create-task").onsubmit = (event) => {
        event.preventDefault();

        let input = document.querySelector(".create-task > input");

        // todoList.push({ time: new Date().getTime(), todo: input.value });
        const todoItemKey = `${selectedDate}/${selectedMonth}/${selectedYear}`;
        // const todoItem = JSON.stringify(tempTodoList);

        const storedTodoListJSON = localStorage.getItem(todoItemKey);
        let newTodoList;

        if (storedTodoListJSON) {
            const tempTodoList = JSON.parse(storedTodoListJSON);
            tempTodoList.push({
                id: new Date().getTime(),
                time: new Date().getTime(),
                todo: input.value,
            });

            newTodoList = JSON.stringify(tempTodoList);
        } else {
            newTodoList = JSON.stringify([
                {
                    id: new Date().getTime(),
                    time: new Date().getTime(),
                    todo: input.value,
                },
            ]);
        }

        localStorage.setItem(todoItemKey, newTodoList);

        input.value = "";

        showTodo();
    };
}

function showTodo() {
    document.querySelector(".todo-list").innerHTML = null;

    const todoItemKey = `${selectedDate}/${selectedMonth}/${selectedYear}`;

    const storedTodoList = localStorage.getItem(todoItemKey);

    if (storedTodoList) {
        const todoList = JSON.parse(localStorage.getItem(todoItemKey));

        todoList.forEach((listItem) => {
            addListTile(listItem);
        });
    } else {
        console.log("No todos!"); //////////////////////NO TODOS//////////////////////
    }
}

function addListTile(listItem) {
    showBottomBorders(selectedMonth, selectedYear);

    let tempNewTodo; // Tempory value for edit form input.

    const listTile = document.createElement("div");
    listTile.id = listItem.id;
    listTile.className = "list-tile";
    listTile.dataset.todoId = listItem.id;
    listTile.dataset.key = `${selectedDate}/${selectedMonth}/${selectedYear}`;

    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";

    const span = document.createElement("span");
    span.innerText = listItem.todo;

    const editButton = document.createElement("button");
    editButton.className = "button edit";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "button delete";
    deleteButton.textContent = "Delete";

    document.querySelector(".todo-list").appendChild(listTile);
    listTile.appendChild(inputCheckbox);
    listTile.appendChild(span);
    listTile.appendChild(editButton);
    listTile.appendChild(deleteButton);

    const storageKey = listTile.dataset.key;
    const storageTodoId = listTile.dataset.todoId;

    deleteButton.onclick = () => {
        deleteTodoFromStorage(storageKey, storageTodoId);

        listTile.remove();

        showBottomBorders(selectedMonth, selectedYear);
    };

    editButton.onclick = () => {
        const editTaskForm = document.createElement("form");
        editTaskForm.className = "edit-task";

        // listTile.replaceChildren(editTaskForm);
        // listTile.replaceChild(editTaskForm);
        listTile.removeChild(inputCheckbox);
        listTile.removeChild(span);
        listTile.removeChild(editButton);
        listTile.removeChild(deleteButton);
        listTile.appendChild(editTaskForm);

        const editTaskInput = document.createElement("input");
        editTaskInput.type = "text";
        editTaskInput.placeholder = "Edit task";
        editTaskInput.value = tempNewTodo != null ? tempNewTodo : listItem.todo;

        const editTaskSubmit = document.createElement("input");
        editTaskSubmit.type = "submit";
        editTaskSubmit.value = "Save";

        listTile.appendChild(editTaskForm);
        editTaskForm.appendChild(editTaskInput);
        editTaskForm.appendChild(editTaskSubmit);

        document.querySelector(".edit-task").onsubmit = (event) => {
            event.preventDefault();

            const newTodo = event.target[0].value;

            tempNewTodo = newTodo;

            editTodoFromStorage(storageKey, storageTodoId, newTodo)
                .then(() => {
                    listTile.removeChild(editTaskForm);
                    listTile.appendChild(inputCheckbox);
                    listTile.appendChild(span);
                    listTile.appendChild(editButton);
                    listTile.appendChild(deleteButton);

                    span.innerText = newTodo;
                })
                .catch((error) => {
                    // console.log(error);
                    alert(error);
                });
        };
    };
}

function deleteTodoFromStorage(key, todoId) {
    const storedTodo = JSON.parse(localStorage.getItem(key));
    for (let i = 0; i < storedTodo.length; i++) {
        if (storedTodo[i].id == todoId) {
            storedTodo.splice(i, 1);

            if (storedTodo.length === 0) {
                // If there are no todos in the list "[]" remove entire item.
                localStorage.removeItem(key);
            } else {
                // Otherwise only update the stored value.
                const updatedTodoListJSON = JSON.stringify(storedTodo);

                localStorage.setItem(key, updatedTodoListJSON);
                break;
            }
        }
    }

    // // Update todo list.
    // showTodo();
}

function editTodoFromStorage(key, todoId, newTodo) {
    // console.log(key, todoId, newTodo);

    let editSuccess = false;

    const storedTodo = JSON.parse(localStorage.getItem(key));
    for (let i = 0; i < storedTodo.length; i++) {
        if (storedTodo[i].id == todoId) {
            storedTodo[i].todo = newTodo;
            storedTodo[i].time = new Date().getTime();

            const updatedTodoListJSON = JSON.stringify(storedTodo);
            localStorage.setItem(key, updatedTodoListJSON);

            editSuccess = true;

            break;
        }
    }

    return new Promise((resolve, reject) => {
        if (editSuccess) {
            resolve("Success");
        } else {
            reject("Falid");
        }
    });
}

// Add bottom borders corresponding to todo count.
function showBottomBorders(month, year) {
    const monthInt = parseInt(month);
    const yearInt = parseInt(year);

    const dayTiles = document.querySelectorAll(
        ".calender-tile:not(.name-of-day)"
    );

    // console.log(monthInt, yearInt);

    dayTiles.forEach((dayTile) => {
        const storedTodoListJSON = localStorage.getItem(
            `${dayTile.dataset.day}/${monthInt}/${yearInt}`
        );

        // Remove previous bottom border styles.
        dayTile.classList.remove("red-border-bottom");
        dayTile.classList.remove("green-border-bottom");
        dayTile.classList.remove("blue-border-bottom");

        const currentTodoCountSpan = document.querySelector(
            ".calender-tile:not(.name-of-day) > span"
        );

        const clearPreviousTodoCountSpan = new Promise((resolve, reject) => {
            if (currentTodoCountSpan) {
                currentTodoCountSpan.remove();
            }

            resolve("Cleaned");
        });

        if (storedTodoListJSON) {
            const storedTodoList = JSON.parse(storedTodoListJSON);
            const todoCount = storedTodoList.length;

            const todoCountSpan = document.createElement("span");
            todoCountSpan.className = "todo-count";
            todoCountSpan.textContent = todoCount;
            clearPreviousTodoCountSpan.then(() => {
                dayTile.appendChild(todoCountSpan);
            });

            if (todoCount < 4) {
                dayTile.classList.add("blue-border-bottom");
                todoCountSpan.style.backgroundColor = "blue";
            } else if (todoCount < 7) {
                dayTile.classList.add("green-border-bottom");
                todoCountSpan.style.backgroundColor = "green";
            } else {
                dayTile.classList.add("red-border-bottom");
                todoCountSpan.style.backgroundColor = "red";
            }
        }
    });
}

showCalender(
    currentDate.getDate(),
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
);
previousAndNextMonthButtons();
selectDayTile();
addTask();
// localStorage.setItem("name", "Paradox");
// console.log(localStorage.getItem("name"));
// localStorage.removeItem("name");
// console.log(localStorage.getItem("name"));

// document.querySelector(".calender-tile").classList.add("red-border-bottom");
