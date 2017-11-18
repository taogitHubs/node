// 最好只操作DOM，计算的事情留给cal.js

//给按钮添加点击事件
document.querySelector('button').onclick = function(){
    //获取其他两个数及result
    var inputs = document.querySelectorAll('input');
    var n1 = inputs[0].value - 0;
    var n2 = inputs[1].value - 0;

    var sum = cal.add(n1,n2);

    //显示结果
    inputs[2].value = sum;

}