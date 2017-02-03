var app = angular.module("todoApp", []); 
app.controller("TodoController", function($scope, $http) {
    $scope.tasks = [];
    $scope.button_mode = 'add';
    $scope.id = 0;

    $scope.getTasks = function(){
        var data = [];

        $http.get("/tasks/getTasks").then(
            function(response) {
                $scope.tasks = response.data;
                $scope.clearFields();
            }
        );
        
    };

    $scope.addTask = function(){
        $http({
                url: '/tasks/addTask',
                method: "POST",
                data:  {title:$scope.title,notes:$scope.notes,deadline:$scope.deadline} 
                }
            ).then(
            function(response) {
                console.log(response);
                $scope.getTasks();
            }
        );
    };

    $scope.deleteTask = function(id){
        $http({
                url: '/tasks/deleteTask/'+id,
                method: "DELETE"
                }
            ).then(
            function(response) {
                    console.log(response);
                    $scope.getTasks();
            }
        );
    };

    $scope.showTask = function(object){
        $scope.button_mode='edit';
        $scope.title = object.title;
        $scope.notes = object.notes;
        $scope.deadline = object.deadline;
        $scope.id = object._id;
    };

    $scope.clearFields = function(){
        $scope.button_mode = 'add';
        $scope.title = '';
        $scope.notes = '';
        $scope.deadline = '';
        $scope.id = 0;
    };

    $scope.editTask = function(){
        $http({
                url: '/tasks/editTask',
                method: "POST",
                data:  {id:$scope.id,title:$scope.title,notes:$scope.notes,deadline:$scope.deadline} 
                }
            ).then(
            function(response) {
                console.log(response);
                $scope.getTasks();
            }
        );
    };

    $scope.getTasks();
});