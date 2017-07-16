function Task(text) {
    this.text = text;
    this.isDone = false;
}

function renderTask(task, output) {
    $(output).append('<div class="item"><span class="text">' + task.text + '</span><button class="delete-btn">Delete</button></div>');
}

function clearDone(arr) {
    arr.forEach(function(task, i){
        if (task.isDone) {
            arr.splice(i, 1);
        }
    });
}

function hideClearBtn(arr) {
    if (!arr.length) {
        return true;
    }
}

function saveToLS(key, arr) {
    arr = JSON.stringify(arr);
    localStorage.setItem(key, arr);
}

function createArr(key) {
    var getLSresult = localStorage.getItem(key);

    if(getLSresult) {
        var arr = JSON.parse(getLSresult);

        arr.forEach(function(task, i) {
            renderTask(task, '.list');

            if (task.isDone) {
                $('.item').eq(i).addClass('done');
            }
        });
        return arr;
    } else {
        return [];
    }
}

function saveOnServer() {
    $.ajax({
        type: "GET",
        url: "http://192.168.1.101:9080/hello.json",
        success: function(html) {
            $('.results').text(html);
        }
    })
    .done(function() {console.log("Успешное выполнение");})
    .fail(function() {console.log("Ошибка выполнения");});
}