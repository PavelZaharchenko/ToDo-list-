$(function(){
    var todoList = createArr('tasksList');
    hideClearBtn('tasksList');

    $('#clear').hide();

// добавление нового элемента
    $('#add').click(function(){
        var inputValue = $("input[name=checkListItem]").val();
        $('#clear').fadeIn('fast');
        $('input[name=checkListItem]').val('');
        var task = new Task(inputValue);
        todoList.push(task);
        renderTask(task, '.list');
        saveToLS('tasksList', todoList);
        saveOnServer();
    });  

// удаление элемента
    $('.list').on('click', function(e) {
    	var index = $(e.target).closest('.item').index();

    	if ($(e.target).hasClass('delete-btn')) {
    		$(e.target).closest('.item').remove();
    		todoList.splice(index, 1);
            saveToLS('tasksList', todoList);
            saveOnServer();

    		if (hideClearBtn(todoList)) { 
	        	$('#clear').hide();
	        }
    	}

    	if ($(e.target).hasClass('text')) {
	    	$(e.target).closest('.item').toggleClass('done');
            todoList[index].isDone = !todoList[index].isDone;
            saveToLS('tasksList', todoList);
            saveOnServer();
    	}
    });

    $('#clear').click(function(){
        $('.done').remove();
        clearDone(todoList);
        saveToLS('tasksList', todoList);
        saveOnServer();

        if (hideClearBtn(todoList)) { 
        	$('#clear').hide();
        }
    });
});