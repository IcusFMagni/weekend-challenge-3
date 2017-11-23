console.log('client.js has been loaded');

$(document).ready(function () {
    getAllToDo();
    console.log('JQ')

});

function getAllToDo() {
    $.ajax({
        method: 'GET',
        url: '/todo',
        success: function (response) {
            console.log('response', response);
            $('#shoeList').empty();
            for (let i = 0; i < response.length; i++) {
                var todo = response[i];
                var $newTodo = $('<tr><td>' + todo.due + '</td><td>' + todo.task + '</td><td>' + todo.steps + '</td><td>' + todo.completed + '</td></tr>');

                var $deleteButton = $('<td><button class="delete">Delete</button></td>')
                $deleteButton.data('id', todo.id);
                $newTodo.prepend($deleteButton)

                var $completeButton = $('<td><button class="complete">Complete</button></td>')
                $completeButton.data('id', todo.id);
                $newTodo.prepend($completeButton);




                $('#toDoList').append($newTodo)
                // var shoe=
                // var $newShoeItem = $('<li>' + todo.task + '</li>');
                // var $deleteShoeButton = $('<button class="deleteButton">Delete</button>');
                // var $editButton = $('<button class="editButton">Edit</button>')
                // $deleteShoeButton.data('id', shoe.id);
                // $editButton.data('id', shoe.id)
                // $newShoeItem.append($deleteShoeButton);
                // $newShoeItem.append($editButton);
                // $('#shoeList').append($newShoeItem);
            }
            console.log($newTodo)
        }
    })
}