var moment = require("moment")

var RedisModel = require('./redis_model.js');

var config = {
    nameSpace: 'limt',
    info: '流量防刷',
    maxage: 60 * 60 * 24,
    redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 1,//使用第几个数据库
        maxage: 2 * 60 * 60,//缓存时间
        prefix: 'dxl-brush:'//数据表前辍即schema 表前缀，可以通过这个区分表 默认在所有的地方都加的 ：需要加的，命名空间
    }
};

var client = new RedisModel(config);

var limit_brush = function (key, cb) {
    key = key + "-" + moment().format("YYYYMMDD")
    //存储和查询是OK的 
    client.getCache(key, (data) => {
        if (!data) {
            let now = Math.round(new Date().getTime() / 1000);
            client.addCache(key, now, (err) => {
                p.log(err)
            })
            cb("可以参与")
        } else {
            cb("已经有缓存了")
        }
    })
}

var getName = function () {
    console.log("1111111")
    document.getElementById("my").innerHTML = "操作demo11111";
}