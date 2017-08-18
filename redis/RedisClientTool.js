var redis = require('redis');
var config = {
    debug: false
};
var RedisClient = redis.createClient({
    host: config.debug ? '127.0.0.1' : '172.16.50.141',
    port: 6379,
    db: 4,//使用第几个数据库
    maxage: 2 * 60 * 60,//缓存时间
    prefix: 'telecom-common:'//数据表前辍即schema 表前缀，可以通过这个区分表 默认在所有的地方都加的 ：需要加的，命名空间
});

RedisClient.on('error', function (err) {
    console.log('Error ' + err)
});


module.exports = RedisClient;