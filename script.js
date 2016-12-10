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
        console.log(str);
      } else {
        console.log(str);
      }
    })
  }
}
function compute() {
  document.querySelector('div[data-value="compute"]')
    .addEventListener('click', function(event) {
      console.log(eval(str));
    });
}
compute();
