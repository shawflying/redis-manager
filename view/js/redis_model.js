/**
 * 创建redis对象
 * Created by Administrator on 2016/11/16.
 */
const _ = require("underscore")._;
const redis = require('redis');
const p = console;

//格式入参
const parseOptions = (params) => {
    params.nameSpace = params.nameSpace || 'happy_trian'
    params.info = params.info || '缓存信息'
    params.maxage = params.maxage || 2 * 60 * 60
    params.redis.host = params.redis.host || "127.0.0.1"
    params.redis.port = params.redis.port || 6379
    params.redis.db = params.redis.db || 1//使用第几个数据库
    params.redis.maxage = params.redis.maxage || 2 * 60 * 60//缓存时间
    params.redis.prefix = params.redis.prefix || "dxl-brush:"//数据表前辍即schema 表前缀，可以通过这个区分表 默认在所有的地方都加的 ：需要加的，命名空间
    return params;
}

class RedisModel {
    constructor(params) {
        params = parseOptions(params)
        this.nameSpace = params.nameSpace || 'common';//命名空间
        this.info = params.info || '获取缓存数据';//备注信息
        this.maxage = params.maxage || 24 * 60 * 60;//设置失效时间 单位秒
        this.RedisClient = redis.createClient(params.redis);

        this.RedisClient.on('error', function (err) {
            p.log('Error ' + err)
        });
    }

    //添加缓存
    addCache(key, value, cb) {
        var tkey = this.nameSpace + ":" + key;
        var that = this;
        this.RedisClient.set(tkey, JSON.stringify(value), function (err, data) {
            p.log(that.info + '：' + key + ' 缓存信息：' + JSON.stringify(value));
            that.RedisClient.expire(tkey, that.maxage);//设置失效时间
            cb(err, data);
        })
    }

    //查询缓存
    getCache(key, cb) {
        var tkey = this.nameSpace + ":" + key;
        var that = this;
        this.RedisClient.get(tkey, function (err, data) {
            p.log(that.info + '：' + key + ' 缓存信息：' + JSON.stringify(data));
            if (err || _.isEmpty(data)) return cb('');
            return cb(JSON.parse(data));
        });
    }

    delCache(key, cb) {
        var tkey = this.nameSpace + ":" + key;
        var that = this;
        this.RedisClient.del(tkey, function (err, data) {
            p.log(that.info + '：' + key + ' 缓存信息：' + JSON.stringify(data));
            if (err || _.isEmpty(data)) return cb('');
            return cb(JSON.parse(data));
        });
    }

    getMoreCache(key, cb) {
        var tkey = this.nameSpace + ":" + key;
        var that = this;
        this.RedisClient.keys(key, function (err, data) {
            p.log("匹配key值：" + key + JSON.stringify(data))
            for (var i = 0; i < data.length; i++) {
                key = data[i];
                key = key.substring("telecom-common:".length);
                that.RedisClient.get(key, function (err, body) {
                    p.log(that.info + '：' + key + ' 缓存信息：' + JSON.stringify(body));
                });
            }
        })
    }

    getKeyCacheCount(key, cb) {
        var tkey = this.nameSpace + ":" + key;
        var that = this;
        this.RedisClient.keys("*" + key + "*", function (err, data) {
            cb(data.length)
        })
    }

}

module.exports = RedisModel;

