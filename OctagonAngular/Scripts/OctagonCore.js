var octagonCalc = angular.module('octagonCalc', []);

octagonCalc.controller('calcCtrl', function($scope, $rootScope) {
    $scope.preValue = null;
    $rootScope.resultField = 0;
    $scope.ClearAll = function() {
        $scope.preValue = null;
        $rootScope.resultField = 0;
        $scope.currentAction = "";
    }
    $scope.ClearField = function() {
        $rootScope.resultField = 0;
    }
    $scope.InsertValue = function (value) {
        var result;
        if ($rootScope.resultField != null) {
            result = parseFloat($rootScope.resultField.toString() + value.toString());
        } else {
            result = value;
        }
        $rootScope.resultField = result;
    }
    $scope.Addition = function() {
        $rootScope.resultField = $scope.preValue + $rootScope.resultField;
    };
    $scope.Substraction = function() {
        $rootScope.resultField = $scope.preValue - $rootScope.resultField;
    };
    $scope.Multiple = function() {
        $rootScope.resultField = $scope.preValue * $rootScope.resultField;
    };
    $scope.Division = function() {
        if ($scope.resultField != 0) {
            $rootScope.resultField = $scope.preValue / $rootScope.resultField;
        } else
            alert("Division by  zero");
    };
    $scope.Percent = function () {
        if ($scope.preValue != null) {
            $rootScope.resultField = $scope.preValue * ($rootScope.resultField / 100);
        } else $rootScope.resultField = 0;
    };
    $scope.SROOT = function() {
        if ($rootScope.resultField >= 0) {
            $rootScope.resultField = Math.pow($rootScope.resultField, 0.5);
        } else
            alert("Negative Number");
    };
    $scope.Power = function() {
        $rootScope.resultField = Math.pow($scope.preValue, $rootScope.resultField);
    };
    $scope.Invert = function() {
        $rootScope.resultField = -$rootScope.resultField;
    };
    $scope.Execute = function (value) {
        if ($scope.preValue != null) {
            if ($scope.currentAction != "") {
                switch ($scope.currentAction) {
                case '+':
                    this.Addition();
                    break;
                case '-':
                    this.Substraction();
                    break;
                case '*':
                    this.Multiple();
                    break;
                case '/':
                    this.Division();
                    break;
                case '^':
                    this.Power();
                    break;
                }
                $scope.preValue = null;
                $scope.currentAction = "";
            }
        } else {
            $scope.preValue = $rootScope.resultField;
            $rootScope.resultField = 0;
            $scope.currentAction = value;
        }

    };
});

octagonCalc.controller('memCtrl', function ($scope, $rootScope) {
    $rootScope.memoryField = 0;
    $scope.MemoryPlus = function () {
        $rootScope.memoryField += $rootScope.resultField;
    }
    $scope.MemoryMinus = function () {
        $rootScope.memoryField -= $rootScope.resultField;
    }
    $scope.MemorySet = function () {
        $rootScope.memoryField = $rootScope.resultField;
    }
    $scope.MemoryRead = function () {
        $rootScope.resultField = $rootScope.memoryField;
    }
    $scope.MemoryClear = function() {
        $rootScope.memoryField = 0;
    }
});

octagonCalc.directive('calcNum', function() {
    return {
        restrict: 'C',
        template:
                '<input value="9" class="btn btn-warning" ng-click="InsertValue(9)" type="button">' +
                '<input value="8" class="btn btn-warning" ng-click="InsertValue(8)" type="button">' +
                '<input value="7" class="btn btn-warning" ng-click="InsertValue(7)" type="button">' +
                '<input value="6" class="btn btn-warning" ng-click="InsertValue(6)" type="button">' +
                '<input value="5" class="btn btn-warning" ng-click="InsertValue(5)" type="button">' +
                '<input value="4" class="btn btn-warning" ng-click="InsertValue(4)" type="button">' +
                '<input value="3" class="btn btn-warning" ng-click="InsertValue(3)" type="button">' +
                '<input value="2" class="btn btn-warning" ng-click="InsertValue(2)" type="button">' +
                '<input value="1" class="btn btn-warning" ng-click="InsertValue(1)" type="button">' +
                '<input value="0" class="btn btn-warning" ng-click="InsertValue(0)" type="button">' +
                '<button class="btn btn-success" ng-click="Execute()" value="exec" id="execute">=</button>'
    };
});