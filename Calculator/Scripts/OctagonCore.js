var _actions = document.getElementsByClassName('actions');
var _memoryActions = document.getElementsByClassName('memoryActions');
var _reset = document.getElementById('reset');
var _resetField = document.getElementById('resetField');
var _field = document.getElementById('field');
var _memory = document.getElementById('memory');
var _action = document.getElementById('action');
var _preValue = 0;

var _calculateObj = new Calculator();
var _memoryObj = new Memory();

function Reset() {
    _field.value = 0;
    _preValue = 0;
    _action.value = "";
}

function CreateNums() {
    var numButtons = document.getElementById("num");

    for (var i = 9; i >= 0; i--) {
        var input = document.createElement('input');
        input.type = "button";
        input.className = "btn btn-warning";
        input.value = i;
        input.addEventListener("click", function() {
            _field.value += this.value;
        });
        numButtons.appendChild(input);
    }
}

function Execute(a, action, b) {
    switch (action) {
    case "+":
        return _calculateObj.Addition(a, b);
        break;
    case "-":
        return _calculateObj.Substrction(a, b);
        break;
    case "*":
        return _calculateObj.Multiplication(a, b);
        break;
    case "/":
        return _calculateObj.Division(a, b);
        break;
    case "^":
        return _calculateObj.Power(a, b);
        break;
        case "root":
        return _calculateObj.ROOT(a, b);
        break;
    case "+/-":
        return a * (-1);
        break;
    default:
        break;
    }
}

function Action() {
    if (this.value != "exec")
        _action.value = this.value;
    if (_preValue != 0) {
        _field.value = Execute(_preValue, _action.value, _field.value);
        _preValue = 0;

    } else {
        _preValue = _field.value;
        _field.value = 0;
    }
}

function appendAction(elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", Action);
    }
}

function MemoryExec(action) {

    switch (action) {
        case "MR":
            _field.value = _memoryObj.MR();
            break;
        case "MS":
            _memoryObj.MS(_field.value);
            break;
        case "MC":
            _memoryObj.MC();
            break;
        case "M+":
            _memoryObj.MP(_field.value);
            break;
        case "M-":
            _memoryObj.MM(_field.value);
            break;
    }
}

function MemoryHandler() {
    MemoryExec(this.value);
}

function appendMemory(elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", MemoryHandler);
    }
}

appendAction(_actions);
appendMemory(_memoryActions);
Reset();
CreateNums();

_reset.addEventListener('click', Reset);
_resetField.addEventListener('click', function() {
    _field.value = 0;
});


//Memory&Calculator
function Memory() {
    _memory.value = 0;
}

Memory.prototype.MR = function () {
    return _memory.value;
}
Memory.prototype.MS = function (value) {
    _memory.value = value;
}
Memory.prototype.MC = function () {
    _memory.value = 0;
}
Memory.prototype.MP = function (value) {
    _memory.value = _calculateObj.Addition(_memory.value, value);
}
Memory.prototype.MM = function (value) {
    _memory.value = _calculateObj.Substrction(_memory.value, value);
}

function Calculator() {
}

Calculator.prototype.Addition = function (a, b) {
    var result = parseFloat(a) + parseFloat(b);
    return result;
}
Calculator.prototype.Substrction = function (a, b) {
    var result = parseFloat(a) - parseFloat(b);
    return result;
}
Calculator.prototype.Multiplication = function (a, b) {
    var result = parseFloat(a) * parseFloat(b);
    return result;
}
Calculator.prototype.Division = function (a, b) {
    if (b != 0) {
        var result = parseFloat(a) / parseFloat(b);
        return result;
    }
    else return "Division by zero!";
}
Calculator.prototype.Power = function (a, b) {
    var result = Math.pow(parseFloat(a), parseFloat(b));
    return result;
}
Calculator.prototype.ROOT = function (a, b) {
    var result = Math.pow(parseFloat(a), 1 / parseFloat(b));
    return result;
}