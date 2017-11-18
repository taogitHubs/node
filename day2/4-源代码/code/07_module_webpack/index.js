
var cal2 = require('./cal.js');

// 坏人出现，修改cal的值
console.log(cal); //测试是否对象是全局的
var cal = null;


document.querySelector('button').onclick = function(){
    //获取其他两个数及result
    var inputs = document.querySelectorAll('input');
    var n1 = inputs[0].value - 0;
    var n2 = inputs[1].value - 0;

    var sum = cal2.add(n1,n2);

    //显示结果
    inputs[2].value = sum;

}