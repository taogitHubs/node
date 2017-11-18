'use strict';

console.log(process.env.NODE_ENV);


// 简单区分同一个代码运行在不同机器上的方式
// 防君子不防小人,不是用来防御
if(process.env.NODE_ENV == 'dev'){
    console.log('这是凃老师的电脑');
}else{
    console.log('这是同学们的电脑');
}