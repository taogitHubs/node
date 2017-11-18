'use strict';
// fs.readFile('./xxx.txt',(err,data)=>{ data.toString();    })

// 1:引入核心对象
const fs = require('fs');
//2:按照相对路径读取文件数据
// fs.readFile('./tmp.txt',(err,data)=>{
//     console.log(err);  // 如果读取文件的时候，出现异常，err就是一个对象,没有异常err就是null,
//     console.log(data.toString()); //出现异常,data是一个undefined,没有异常data就是数据
// });


//有点像 $('#xxx').on('writed',function(){})
//有点像 $('#xxx').on('readed',function(){})


// 写入文件   fs.writeFile('./tmp2.txt','看守所就像家一样，里面各个都是人才',(err)=>{})
// fs.writeFile('./tmp2.txt','看守所就像家一样，里面各个都是人才',(err)=>{
//         if(err) throw err; //抛出异常，程序停止

//         console.log('文件写入成功');
// });


//在文件操作的所有API中,所有的API都存在同异步两个版本
//同步的
let txt = fs.readFileSync('./tmp.txt').toString();
console.log(txt);
//同步写文件
fs.writeFileSync('./tmp3.txt','哈哈呵呵');