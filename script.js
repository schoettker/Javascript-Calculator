window.onload = function() {
  addNumsEventListeners();
  addOperandsEventListeners();
}

var str = new String();
var toggleReset = false;
function addNumsEventListeners() {
  var nums = document.getElementById('numblock').childNodes;
  for (var i = 0, l = nums.length - 2; i < l; i++) {
    var num = nums[i];
    num.addEventListener('click', function(e) {
      // console.log(this.getAttribute('data-value'));
      document.getElementById('clear').innerHTML = 'CE';
      checkForInfinity();
      if (toggleReset) {
        str = '';
        document.getElementById('input-history').innerHTML = null;
        toggleReset = false;
      }
      str += this.getAttribute('data-value');
      display(this.getAttribute('data-value'), 'input-current');
      display(str, 'input-current');
      console.log(str);
    });
  }
}
function addOperandsEventListeners() {
  var operands = document.getElementById('operands').childNodes;
  for (var i = 2, l = operands.length; i < l; i++) {
    document.getElementById('clear').innerHTML = 'CE';
    var operand = operands[i];
    operand.addEventListener('click', function(e) {
      checkForInfinity();
      if (isNaN(str[str.length-1])) {
        str = str.slice(0, str.length - 1);
      }
      if (str.length >= 1) {
        str += this.getAttribute('data-operation');
        display(str, 'input-current');
      }
      toggleReset = false;
    });
  }
}
function compute() {
  document.querySelector('div[data-value="compute"]')
    .addEventListener('click', function(event) {
      if (isNaN(str[str.length-1])) {
        str = str.slice(0, str.length - 1);
      }
      if (str.length >= 3) {
        str = String(eval(str));
        display(eval(str), 'input-history');
        document.getElementById('clear').innerHTML = 'CLR';
        toggleReset = true;
      }
    });
}
compute();
function display(input, parent) {
  // var regex  = new RegExp('')
  document.getElementById(parent).innerHTML = null;
  if (typeof input == 'string') {
    input = input.replace(/\//g, '÷');
    input = input.replace(/\./g, '\,');
    input = input.replace(/\*/g, 'x');
  }
  document.getElementById(parent).
    appendChild(document.createTextNode(input));
}
function checkForInfinity() {
  if (str === 'Infinity') 
    str = '';
}
function clearInput() {
  document.getElementById('clear')
    .addEventListener('click', function(e) {
      if (this.innerHTML === 'CE') {
        str = str.slice(0, str.length - 1);
      }
      if (this.innerHTML === 'CLR') {
        str = '';
        display(str, 'input-history');
      }
      display(str, 'input-current');
    });
}
clearInput();
// workaround for safaris default pinched in zoom on mobile devices
document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
});
