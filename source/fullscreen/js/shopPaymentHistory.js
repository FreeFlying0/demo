/**
 * 
 * @authors shenbao
 * @date    2017-10-22
 * 
 */

var util = {
    // 时间格式化
    getTimeFormat: function(time, format){                    
        var t = new Date(time);
        var tf = function(i){return (i < 10 ? '0' : '') + i};
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
            switch(a){
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
    },
    // 分转化元，保留两位小数
    centsToYuan: function(cents){
        return (cents/100).toFixed(2);
    },
    removeArrayIndex: function(array,index){
        if(index<=(array.length-1)){ 
            for(var i = index;i < array.length; i++){
                array[i] = array[i+1]; 
            }
        }else{ 
            throw new Error('超出最大索引！'); 
        } 
        array.length = array.length - 1; 
        return array; 
    },
    deepClone: function(obj){
        var newObj= obj instanceof Array?[]:{};
        for(var i in obj){
           newObj[i]=typeof obj[i]=='object'?  
           util.deepClone(obj[i]):obj[i];    
        }
        return newObj;
    }
}
function RunPrefixMethod(obj, method) {
    var pfx = ["webkit", "moz", "ms", "o", ""];
    var p = 0, m, t;
    while (p < pfx.length && !obj[m]) {
        m = method;
        if (pfx[p] == "") {
            m = m.substr(0, 1).toLowerCase() + m.substr(1);
        }
        m = pfx[p] + m;
        t = typeof obj[m];
        if (t != "undefined") {
            pfx = [pfx[p]];
            return (t == "function" ? obj[m]() : obj[m]);
        }
        p++;
    }

}
// 删除十分钟之前的订单
function delTenMinutesAgo(_orderList){
    var orderList = util.deepClone(_orderList);
    var nowTime = Date.now();
    // var tenMinutesTime = nowTime - 60*1000;
    var tenMinutesTime = nowTime - 10*60*1000;
    var delArr = [];
    for (var i = 0; i < orderList.length; i++) {
        var paymentId = orderList[i].paymentId;
        var reqTime = orderList[i].reqTime;
        if(reqTime < tenMinutesTime){
            delArr.push(paymentId);
        }
    }
    var newOrderList = util.deepClone(orderList);
    for (var j = 0; j < delArr.length; j++) {
        var index = newOrderList.findIndex(function(item){
            return item.paymentId === delArr[j];
        });
        newOrderList = util.removeArrayIndex(newOrderList, index);
    }
    return newOrderList;
}

window.orderList = [];

$(function () {
    // new vue
    window.FastXBoxApplication = new Vue({
        el: '#root',
        data: {
            orderList: []
        },
        created: function () {

            var that = this;
            var firstStartTime = Date.now() - 10*60*1000;
            // var firstStartTime = Date.now() - 10*60*60*60*60*1000;
            var nextStartRime = Date.now();

            var reqOrderList = function(isFirst){
                // 请求之前处理10分钟之前的数据
                window.orderList = delTenMinutesAgo(window.orderList);

                var data = {
                    shopCode : window.shopCode
                };
                var nowTime = Date.now();
                if(isFirst){
                    data.startTime= firstStartTime;
                    data.endTime= nextStartRime;
                }else {
                    data.startTime=  nextStartRime;
                    data.endTime= nowTime;
                    // 存储下一次请求需要的startTime
                    nextStartRime = nowTime;
                }
                $.ajax({
                    url: '/mock/pay-ok.json',
                    type: "GET",
                    // type: "POST",
                    dataTye: 'json',
                    // contentType:"application/json",
                    data: data,
                    success: function (res) {
                        var data = res.attachment;
                        for (var i = 0; i < data.length; i++) {
                            data[i].reqTime =  nextStartRime;            
                        }
                        // 合并返回的数据和当前存储的数据
                        window.orderList = data.concat(window.orderList);
                        // 判断当前是否大于100，大于100 删除100之后的数据
                        if(orderList.length >100){
                            orderList.length = 100;
                        }
                        // 重新set vue data 
                        that.$set(that.$data, 'orderList', window.orderList);
                        // 6秒之后请求
                        setTimeout(function(){
                            reqOrderList(false);
                        },6000);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown){
                        // textStatus: "timeout", "error", "notmodified" 和 "parsererror"。
                        console.log(XMLHttpRequest);
                        console.log(textStatus);
                        console.log(errorThrown);

                    }
                });
            };
            // 第一次请求
            reqOrderList(true);
        }
    });
    // 点击十次全屏或退出全屏
    var e = document.getElementById("fullscreen");
    var clickNumber = 0;
    var setTimeoutTimer;
    e.onclick = function () {
        console.log(clickNumber)
        if(clickNumber == 0){
            setTimeoutTimer = setTimeout(function() {
                clickNumber = 0;
            }, 10000);
        }
        clickNumber = clickNumber + 1;
        if(clickNumber == 10){
            if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
                RunPrefixMethod(document, "CancelFullScreen");
            }
            else {
                RunPrefixMethod(e, "RequestFullScreen");
            }
            clearTimeout(setTimeoutTimer);
            clickNumber = 0;
        }
    }
});




