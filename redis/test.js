var RedisModel = require('./redis_model');
const redis = require('redis');
const moment = require("moment")

const p = console;
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
var RedisClient = redis.createClient(config.redis);
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

limit_brush("ip-id", (info) => {
    p.log(info);
})

p.log(111)


RedisClient.set("string key", "string val", redis.print);
RedisClient.hset("hash key", "hashtest 1", "some value", redis.print);
RedisClient.hset(["hash key", "hashtest 2", "some other value"], redis.print);
RedisClient.hmset("hosts", "mjr", "1", "another", "23", "home", "1234");
RedisClient.hgetall("hosts", function (err, obj) {
    console.dir(obj);
});
RedisClient.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    RedisClient.quit();

});
