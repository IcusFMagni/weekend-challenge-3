console.log('client.js has been loaded');

$(document).ready(function () {
    $('#toDoList').on('click', '.deleteButton', deleteToDo)
    $('#toDoList').on('click', '.completeButton', completeToDo)
    $('#submitButton').on('click').on('click', submitToDo)

    getAllToDo();
    console.log('JQ')

});

function completeToDo () {
    console.log($(this).parent().data());
    var toComplete = $(this).parent().data().id;

    $.ajax({
        method: 'PUT',
        url: '/todo/' + toComplete,
        data: { complete: 'Y'},
        success: function (response) {
            getAllToDo();
        }
    })
}

function deleteToDo () {
    console.log($(this).parent().data());    
    var toDoToDelete = $(this).parent().data().id;
    
    $.ajax({
        method: 'DELETE',
        url: '/todo/' + toDoToDelete,
        success: function(response) {
            getAllToDo();
        }
    });
}

function getAllToDo() {
    $.ajax({
        method: 'GET',
        url: '/todo',
        success: function (response) {
            console.log('response', response);
            $('#toDoList').empty();
            for (let i = 0; i < response.length; i++) {
                var todo = response[i];
                var due = moment(todo.due).format("MMM Do YYYY"); 

                var $newTodo = $('<tr><td>' + due + '</td><td>' + todo.task + '</td><td>' + todo.steps + '</td><td>' + todo.completed + '</td></tr>');

                var $deleteButton = $('<td><button class="deleteButton">Delete</button></td>')
                $deleteButton.data('id', todo.id);
                $newTodo.prepend($deleteButton)

                var $completeButton = $('<td><button class="completeButton">Complete</button></td>')
                $completeButton.data('id', todo.id);
                $newTodo.prepend($completeButton);

                $('#toDoList').append($newTodo)
            }
        }
    })
}

function submitToDo () {
    var toDo = {
        task: $('#taskIn').val(),
        due: $('#dueIn').val(),
        steps: $('#stepsIn').val()
    }
    console.log (toDo)
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: toDo,
        success: function (response) {
            console.log('response', response);
            getAllToDo();
        }
    });
}

