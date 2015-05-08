//definition of variables
var _binaryActions = document.getElementsByClassName('binaryActions');
var _unaryActions = document.getElementsByClassName('unaryActions');
var _memoryActions = document.getElementsByClassName('memoryActions');
var _field = document.getElementById('field');
var _memory = document.getElementById('memory');
var _action = document.getElementById('action');
var _resetAll = document.getElementById('resetAll');
var _resetField = document.getElementById('resetField');
var _preValue = 0;

//create instance of Calculator and Memory
var _calculateObj = new Calculator();
var _memoryObj = new Memory();

//function that clear all data
function ResetAll() {
    _field.value = 0;
    _preValue = 0;
    _action.value = "";
}

//function that clear field
function ResetField() {
    _field.value = 0;
}

//dinamic creation of number form
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

    var execute = document.createElement('button');
    execute.className = "btn btn-success";
    execute.id = "execute";
    execute.innerHTML = "=";
    execute.addEventListener("click", BinaryHendler);
    numButtons.appendChild(execute);
}

//select and exec operation
function BinaryExecute(a, action, b) {
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
    default:
        break;
    }
}

//unary functions execute
function UnaryExecute(a, action) {
    switch (action) {
        case "squareRoot":
            return _calculateObj.SROOT(a);
            break;
        case "percent":
            return _calculateObj.Percent(a);
            break;
        case "plusMinus":
            return -a;
            break;
        default:
            break;
    }
}

//memory functions execute
function MemoryExecute(action) {

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

//hendler for unary functions
function UnaryHandler() {
    _field.value = UnaryExecute(_field.value, this.value);
}

//check data and run BinaryExecute
function BinaryHendler() {
    if (_preValue != 0) {
        _field.value = BinaryExecute(_preValue, _action.value, _field.value);
        _preValue = 0;
        _action.value = "";
    } else {
        if (this.value != "") {
            _preValue = _field.value;
            _action.value = this.value;
            _field.value = 0;
        }
    }
}

//handler for memory functions
function MemoryHandler() {
    MemoryExecute(this.value);
}

//add event for unary func
function appendUnaryAction(elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", UnaryHandler);
    }
}

//add event for bin func
function appendBinaryAction(elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", BinaryHendler);
    }
}

//add event for mem func
function appendMemory(elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", MemoryHandler);
    }
}

//run adding events
appendBinaryAction(_binaryActions);
appendUnaryAction(_unaryActions);
appendMemory(_memoryActions);

//add event for special buttons
_resetAll.addEventListener('click', ResetAll);
_resetField.addEventListener('click', ResetField);

//clear all
ResetAll();

//create num form
CreateNums();

//Memory and Calculator
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
    } else {
        alert("Division by zero!");
        return 0;
    }
}
Calculator.prototype.Power = function (a, b) {
    var result = Math.pow(parseFloat(a), parseFloat(b));
    return result;
}
Calculator.prototype.SROOT = function (a) {
    var result = Math.pow(parseFloat(a), 0.5);
    return result;
}
Calculator.prototype.Percent = function (a) {
    var result = parseFloat(_preValue) * (a / 100);
    return result;
}