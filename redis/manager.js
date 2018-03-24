var RedisModel = require('./redis_model');
const moment = require("moment")
const p = console;
var config = {
    nameSpace: 'limt',
    info: '流量防刷',
    maxage: 60 * 60 * 24,
    redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 0,//使用第几个数据库
        maxage: 2 * 60 * 60,//缓存时间
        prefix: 'dxl-brush:'//数据表前辍即schema 表前缀，可以通过这个区分表 默认在所有的地方都加的 ：需要加的，命名空间
    }
};

// var client = new RedisModel(config);

// client.getKeyCacheCount("ip", (data) => {
//     p.log(data)
// })

//进入之后展示所有数据库列表 生成多个列表
//默认是16个
for (let i = 0; i < 16; i++) {
    p.log(`第${i}个数据库`)
}
//选择第一个数据库，展示所有数据
config.info = `第${1}个数据库`
let my = new RedisModel(config);

//显示所有key值
my.getAllKeyByDbId(function (err, data) {
    data.forEach((m, i) => {
        p.log("key:" + m);
    });
});

//根据key值：进行分组

// my.getAll("", function (data) {
//     p.log(data)
// })
//获取到key 值，通过key获取信息
my.getCache("ec678fd279872e4275bf27c1130331d5-20180322", function (data) {
    p.log("--------------------------", data)
})
//将信息进行展示
//string 类型，set类型
