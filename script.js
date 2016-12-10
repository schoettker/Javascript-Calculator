window.onload = function() {
  addNumsEventListeners();
  addOperandsEventListeners();
}

var str = new String();
function addNumsEventListeners() {
  var nums = document.getElementById('numblock').childNodes;
  for (var i = 0, l = nums.length - 2; i < l; i++) {
    var num = nums[i];
    num.addEventListener('click', function(e) {
      // console.log(this.getAttribute('data-value'));
      str += this.getAttribute('data-value');
      display(this.getAttribute('data-value'), 'input-current');
      display(str, 'input-history');
      console.log(str);
    });
  }
}
function addOperandsEventListeners() {
  var operands = document.getElementById('operands').childNodes;
  for (var i = 0, l = operands.length; i < l; i++) {
    var operand = operands[i];
    operand.addEventListener('click', function(e) {
      if (!isNaN(str[str.length-1])) {
        str += this.getAttribute('data-operation');
        display(str, 'input-history');
        console.log(str);
      }
    })
  }
}
function compute() {
  document.querySelector('div[data-value="compute"]')
    .addEventListener('click', function(event) {
      if (isNaN(str[str.length-1])) {
        str = str.slice(0, str.length - 1);
      }
      // console.log(eval(str));
      // display(eval(str), 'input-current');
      str = String(eval(str));
      console.log(str);
      display(eval(str), 'input-current');
    });
}
compute();
function display(input, parent) {
  document.getElementById(parent).innerHTML = null;
  document.getElementById(parent).
    appendChild(document.createTextNode(input));
}
