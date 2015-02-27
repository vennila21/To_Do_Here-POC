
App.controller('menuBar', function($scope) {
    $scope.myVar = false;
    $scope.menuOpen = '';
    $scope.menuState = "is-closed";
    $scope.toggle = function() {
        if ($scope.myVar == true) {
            $scope.menuState = "is-closed";
            $scope.menuOpen = '';
      } else {
          $scope.menuOpen = 'toggled';
          $scope.menuState = "is-open";
      }
    $scope.myVar = !$scope.myVar;
    };
});


App.controller('TodoCtrl', function($scope) {
  $scope.todos = [];
  $scope.markAll = false;
    
  $scope.addTodo = function() {
      if(event.keyCode == 13 && $scope.todoText){
          $scope.todos.push({text:$scope.todoText, done:false});
          $scope.todoText = '';
      }
  };
  $scope.isTodo = function(){
      return $scope.todos.length > 0;  
  }
  $scope.toggleEditMode = function(){
      $(event.target).closest('li').toggleClass('editing');
  };
  $scope.editOnEnter = function(todo){
      if(event.keyCode == 13 && todo.text){
          $scope.toggleEditMode();
      }
  };
    
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.hasDone = function() {
      return ($scope.todos.length != $scope.remaining());
  }    
    
  $scope.itemText = function() {
      return ($scope.todos.length - $scope.remaining() > 1) ? "items" : "item";     
  };
      
  $scope.toggleMarkAll = function() {
      angular.forEach($scope.todos, function(todo) {
        todo.done =$scope.markAll;
      });
  };
  
  $scope.clear = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
    
});