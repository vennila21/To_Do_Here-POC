"use strict";

var App = angular.module("todo", ["ui.sortable", "LocalStorageModule"]);
App.controller("TodoCtrl", function ($scope, localStorageService) {
	$scope.init = function () {
		if (!localStorageService.get("todoList")) {
			$scope.model = [
				{
					name: "Primary", list: [
						{ taskName: "Create an Angular-js TodoList", isDone: false },
						{ taskName: "Understanding Angular-js Directives", isDone: true }
					]
				},
				{
					name: "Secondary", list: [
						{ taskName: "Build an open-source website builder", isDone: false },
						{ taskName: "BUild an Email Builder", isDone: false }
					]
				}
			];
		}else{
			$scope.model = localStorageService.get("todoList");
		}
		$scope.show = "All";
		$scope.currentShow = 0;
	};

	$scope.addTodo = function  () {
		/*Should prepend to array*/
		$scope.model[$scope.currentShow].list.splice(0, 0, {taskName: $scope.newTodo, isDone: false });
		/*Reset the Field*/
		$scope.newTodo = "";
	};

	$scope.deleteTodo = function  (index) {
		$scope.model[$scope.currentShow].list.splice(index, 1);
	};

	$scope.todoSortable = {
		containment: "parent",
		cursor: "move",
		tolerance: "pointer"
	};

	/* Filter Function for All | Incomplete | Complete */
	$scope.showFn = function  (todo) {
		if ($scope.show === "All") {
			return true;
		}else if(todo.isDone && $scope.show === "Complete"){
			return true;
		}else if(!todo.isDone && $scope.show === "Incomplete"){
			return true;
		}else{
			return false;
		}
	};

	$scope.$watch("model",function  (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorageService.add("todoList",angular.toJson(newVal));
		}
	},true);

});
/* ------ Menu Controllers  -------- */
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


