var taskArray;
var sortAlphabetFlag = "false";
var sortStatusFlag = "false";

document.addEventListener("DOMContentLoaded", function () {

    // проверка наличия данных в веб-хранилище
    if (sessionStorage.sortAlphabet) {
        sortAlphabetFlag = sessionStorage.sortAlphabet;
    }
    if (sessionStorage.sortStatus) {
        sortStatusFlag = sessionStorage.sortStatus;
    }
    if (sessionStorage.taskList) {
        taskArray = JSON.parse(sessionStorage.taskList);
        showTaskList();
    }

    document.getElementById("submitButton").addEventListener("click", addTask);
    document.getElementById("sortAlphabet").addEventListener("click", sortAlphabet);
    document.getElementById("sortStatus").addEventListener("click", sortStatus);
    document.getElementById("sortCancel").addEventListener("click", sortCancel);

    //запись данных в веб-хранилище перед перезагрузкой страницы
    window.addEventListener('beforeunload', function () {
        if (taskArray) {
            sessionStorage.taskList = JSON.stringify(taskArray);
        }
        sessionStorage.sortAlphabet = sortAlphabetFlag;
        sessionStorage.sortStatus = sortStatusFlag;
    });
});

//функция добавления задачи в список дел
function addTask() {

    // конструктор
    function task(id, status, content) {
        this.id = id;
        this.status = status;
        this.content = content;
    }

    var content = document.getElementById("inputTask").value.trim();
    if (content === "") {
        alert("Вы не ввели данные");
        return;
    }
    document.getElementById("inputTask").value = ""; // Очистка поля

    if (taskArray) {
        //запись новой задачи в массив taskArray
        var lastIndex = taskArray.length;
        var newID = taskArray[lastIndex - 1].id + 1; // 
        taskArray[lastIndex] = new task(newID, 1, content);
    } else {
        //запись первой задачи в массив taskArray
        var lastIndex = 0;
        taskArray = [new task(0, 1, content)];
    }

    if (sortAlphabetFlag === "true") {
        //функция сортирует массив и обновляет список дел на экране с новым значением 
        sortAlphabet();
    }

    if (sortStatusFlag === "true") {
        //функция сортирует массив и обновляет список дел на экране с новым значением
        sortStatus();
    }

    if ((sortAlphabetFlag === "false") && (sortStatusFlag === "false")) {

        // добавление элемента без обновления всего списка
        addToList(taskArray[lastIndex].id, "active", taskArray[lastIndex].content);

    }

    //добавления новым элементам обработчиков событий
    addButtonsListeners();
}

//фунция добавляет 1 элемент li в ul
function addToList(id, status, content) {
    var str = '<div title="Изменить статус" class="' + status + '"></div><div class="delete" title="Удалить"></div><pre class="content">' + content + '</pre>';

    var newLi = document.createElement('li');
    newLi.setAttribute("data-id", id);
    newLi.innerHTML = str;

    document.getElementById("list").appendChild(newLi);
}

//функия выводит список дел на экран
function showTaskList() {

    var str = "";
    var statusStr = "";

    //очистка списка
    document.getElementById("list").innerHTML = "";

    for (i = 0; i < taskArray.length; i++) {

        // в объекте task, статус задачи хранится в виде 1 (active) и 0 (nonActive)
        if (taskArray[i].status === 1) {
            statusStr = "active";
        } else {
            statusStr = "nonActive";
        }

        addToList(taskArray[i].id, statusStr, taskArray[i].content);
    }

    addButtonsListeners();
}

function addButtonsListeners() {
    var deleteButtons = document.getElementsByClassName("delete");
    for (i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteTask);
    }

    var statusActiveButtons = document.getElementsByClassName("active");
    for (i = 0; i < statusActiveButtons.length; i++) {
        statusActiveButtons[i].addEventListener("click", changeStatus);
    }

    var statusNonActiveButtons = document.getElementsByClassName("nonActive");
    for (i = 0; i < statusNonActiveButtons.length; i++) {
        statusNonActiveButtons[i].addEventListener("click", changeStatus);
    }
}

function deleteTask(event) {
    if (confirm("Удалить задачу?")) {
        var id = +event.currentTarget.parentNode.dataset.id;
        event.currentTarget.parentNode.remove();

        for (i = 0; i < taskArray.length; i++) {
            if (taskArray[i].id === id) {
                taskArray.splice(i, 1);
            }
        }
    }
}

function changeStatus(event) {
    var active = "active";
    var nonActive = "nonActive";

    var id = +event.currentTarget.parentNode.dataset.id;

    for (i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id === id) {
            if (taskArray[i].status === 1) {
                taskArray[i].status = 0;
                event.currentTarget.classList.remove(active);
                event.currentTarget.classList.add(nonActive);
            } else {
                taskArray[i].status = 1;
                event.currentTarget.classList.remove(nonActive);
                event.currentTarget.classList.add(active);
            }
        }
    }
}

function sortStatus() {
    sortStatusFlag = "true";
    taskArray.sort(function (a, b) {
        return b.status - a.status
    })
    showTaskList();
}

function sortAlphabet() {
    sortAlphabetFlag = "true";
    taskArray.sort(function (a, b) {
        var contentA = a.content.toLowerCase(),
            contentB = b.content.toLowerCase()
        if (contentA < contentB) //сортируем строки по возрастанию
            return -1
        if (contentA > contentB)
            return 1
        return 0 // Никакой сортировки
    })
    showTaskList();
}

function sortCancel() {
    sortAlphabetFlag = "false";
    sortStatusFlag = "false";
    taskArray.sort(function (a, b) {
        return a.id - b.id
    })
    showTaskList();
}
