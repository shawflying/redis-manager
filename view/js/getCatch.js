var CatchClass = require('../../redis/CatchClass');

var client = new CatchClass('QueryBaseInfoCatch', '获取设备基本信息');
var deviceId = "17721021494";
////查询
var resdata = function (cb) {

}

var getName = function () {
    client.getCache(deviceId, function (data) {
        console.log(JSON.stringify(data))
        document.getElementById("my").value = document.getElementById("key").value
        document.getElementById("my").value = JSON.stringify(data);
    });

}