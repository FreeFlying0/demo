$(function() {
    // 添加默认楼层
    $("#totleList").find("li").eq(0).addClass("on");
    // 获取头部高度
    var hdHigh = Number($('#totleList').height());
    var showTop = 0;
    var flagPay = false;
    var flagBalPay = false;
    var flag = new Flag();
    if (allObj.showStatus == 10) {
        showTop = $('.header-flash').height() + $('.banner').height();
    } else {
        showTop = $('.header').height();
    }


    // 点击楼层
    $("#totleList").find("li").on("tap", function(e) {

        var index = $(this).index();
        if (index == 0) {
            var top = $(".goodsLayer").eq(index).offset().top - hdHigh + 2;
        } else {
            var top = $(".goodsLayer").eq(index).offset().top - hdHigh;
        }

        $(window).off("scroll");
        var scrObj = {
            toT: top,
            durTime: 500,
            callback: function() {
                $(window).on("scroll", onScroll);
            },
            floorFixed: function() {
                floorFixed();
            }
        }
        $(window).scrollTo(scrObj);
        $("#totleList").find("li").removeClass("on");
        $(this).addClass("on");
    });

    // 监听页面渲染
    $(window).off("scroll").on("scroll", onScroll);

    function floorFixed() {
        if ($("body").scrollTop() > showTop) {
            $('#totleList').css('position', "fixed");
            $('#totleList').css('top', "0");
        } else {
            $('#totleList').css('position', "relative");
        }
    }
    var ticking = false;

    function onScroll() {
        floorFixed();
        if (!ticking) {
            requestAnimationFrame(realFunc);
            ticking = true;
        }
    }

    function realFunc() {

        var layer = $(".goodsList").find("dl");
        var len = layer.length;
        while (true) {
            if (len < 1) {
                break;
            }
            // 判断高度不能与点击高度相等
            if (layer.eq(len - 1).offset().top - $("body").scrollTop() < hdHigh + 2) {
                $("#totleList").find("li").removeClass("on");
                $(".layer" + len).addClass("on");
                break;
            }
            len--;
        }
        ticking = false;
    }

    // 加
    $(".plus").on("tap", function(e) {
        e.stopPropagation();
        var num = parseInt($(this).siblings(".amount").text());
        $(this).siblings(".amount").text(num + 1);
        goodsNumber();
        if (rechargeActivityStatus) {
            goodsDisPrice();
        } else {
            goodsPrice();
        }

    });

    // 减
    $(".minus").on("tap", function(e) {
        e.stopPropagation();
        var num = parseInt($(this).siblings(".amount").text());
        if (num > 0) {
            $(this).siblings(".amount").text(num - 1);
            goodsNumber();
            if (rechargeActivityStatus) {
                goodsDisPrice();
            } else {
                goodsPrice();
            }
        }
    });

    // 商品数量
    function goodsNumber() {

        var layer = $(".goodsLayer");

        for (var i = 0; i < layer.length; i++) {
            var amount = layer.eq(i).find(".amount");
            var totle = 0;
            for (var j = 0; j < amount.length; j++) {
                totle += parseInt(amount.eq(j).text());
            }
            if (totle > 0) {

                $(".layer" + (i + 1)).find(".amountIcon").text(totle).show();
            } else {

                $(".layer" + (i + 1)).find(".amountIcon").text(0).hide();
            }
        }
    }
    // 保留小数点
    function toDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }
    // 计算价格
    function goodsPrice() {

        var layer = $(".goodsLayer");
        var totle = 0;
        var price = 0;
        for (var i = 0; i < layer.length; i++) {
            var amount = layer.eq(i).find(".amount");
            for (var j = 0; j < amount.length; j++) {
                var num = parseInt(amount.eq(j).text());
                if (num > 0) {
                    totle += num;
                    price += parseFloat(amount.eq(j).closest("dd").attr("data-price")) * num;
                }
            }
        }
        if (totle > 0) {
            flagPay = true;
            $(".totle").html("合计:<b style='font-size:0.52rem;color:#fc7809;'>￥" + toDecimal(price / 100.00) + "</b>");
            $(".payment").addClass("pricing");
            $(".payment").html("支付(" + totle + ")");
            $('.totle').css("background", "#fff");
            $('.totle').css("color", "#666")

        } else {
            flagPay = false;
            $(".totle").text("请选择商品");
            $(".payment").removeClass("pricing");
            $(".payment").html("支付");
        }
    }
    // 计算折扣价格
    function goodsDisPrice() {

        var layer = $(".goodsLayer");
        var totle = 0;
        var price = 0;
        var disPrice = 0;
        for (var i = 0; i < layer.length; i++) {
            var amount = layer.eq(i).find(".amount");
            for (var j = 0; j < amount.length; j++) {
                var num = parseInt(amount.eq(j).text());
                if (num > 0) {
                    totle += num;
                    price += parseFloat(amount.eq(j).closest("dd").attr("data-price")) * num;
                    if (amount.eq(j).closest("dd").attr("data-disprice") > 0) {
                        disPrice += parseFloat(amount.eq(j).closest("dd").attr("data-disprice")) * num;
                    } else {
                        disPrice += parseFloat(amount.eq(j).closest("dd").attr("data-price")) * num;
                    }

                }
            }
        }
        if (totle > 0) {
            flagPay = true;
            $(".totleNow").html("<p class='originalPrice'>合计:<span class='totleNumDtl'>￥" + toDecimal(price / 100.00) + "</span></p>" +
                "<p class='presentPrice'>充值享亏本价:<span class='totleDisNumDtl'>￥" + toDecimal(disPrice / 100.00) + "</span></p>");
            $(".paymentNow").addClass("pricing");
            // 判断余额支付和微信支付
            if (disPrice <= Number(allObj.balanceNum)) {
                flagBalPay = true;
                var balancePayHtml = "<p class='balancePay'>余额支付</p>" +
                    "<p class='totleDiscount' data-disPrice=" + toDecimal(disPrice / 100.00) + ">" +
                    "<span  style='color:#010101'></span>￥" +
                    toDecimal(disPrice / 100.00) +
                    "</p>";
                $(".paymentNow").html(balancePayHtml);
                $('.balanceNum').css({ "color": "#ff5005", "text-decoration": "none" });
                $('.totleNumDtl').css({ "color": "#666", "text-decoration": "line-through" });
                $('.totleDisNumDtl').css({ "color": "#ff5005", "text-decoration": "none" });
            } else {
                flagBalPay = false;
                $(".paymentNow").html("微信支付");
                $('.balanceNum').css({ "color": "#666", "text-decoration": "line-through" });
                $('.totleNumDtl').css({ "color": "#ff5005", "text-decoration": "none" });
                $('.totleDisNumDtl').css({ "color": "#666", "text-decoration": "line-through" });
            }

        } else {
            flagPay = false;
            $('.balanceNum').css({ "color": "#ff5005", "text-decoration": "none" });
            $(".totleNow").html("<p class='totleNum'>请选择商品</p>");
            $(".paymentNow").removeClass("pricing");
            $(".paymentNow").html("支付");
        }
    }
    // 支付只能点击一次
    var paying = false;

    function payingLock() {

        if (paying == false) {
            paying = true;
            if (rechargeActivityStatus) {
                $(".balancePay").html('支付中...');
                $(".paymentNow").removeClass("pricing");
            } else {

                $(".payment").html('支付中...');
                $(".payment").removeClass("pricing");
            }
        } else {
            paying = false;
            if (rechargeActivityStatus) {
                $(".balancePay").html('余额支付');
                $(".paymentNow").addClass("pricing");
            } else {
                $(".payment").html("支付");
                $(".payment").addClass("pricing");
            }
        }

    }

    // 请求支付
    $("#payment").on("tap", function() {
        if (!flagPay || paying) {

            return;
        }
        payingLock();
        var goods = $(".goodsDetail");
        var saveDatoaAryObj = Object.create(null);
        saveDatoaAryObj.saveDataAry = [];
        for (var i = 0; i < goods.length; i++) {
            var num = parseInt(goods.eq(i).find(".amount").text());
            if (num > 0) {
                var sgid = Number(goods.eq(i).attr("data-sgid"));
                var item = {};
                item.shopGoodsId = sgid;
                item.number = num;
                saveDatoaAryObj.saveDataAry.push(item);
            }
        }
        if (flagBalPay) {
            balPay(saveDatoaAryObj);
        } else {
            getWxPay(saveDatoaAryObj);
        }


    });
    // 跳转我想吃
    $('#want').on('tap', function() {
        window.location.href = '/user-want/v/to-list.html?shopId=' + allObj.shopId;
    });

    $('.banner').on('tap', function() {
        // flashUrl
        window.location.href = allObj.flashUrl;
    });
    $('.balanceBtn').on('tap', function() {
        window.location.href = allObj.flashUrl;
    });
    // 余额支付
    function balPay(saveDatoaAryObj) {
        var payPrice = $('.totleDiscount').attr("data-disPrice");
        $.ajax({
            url: "/account/v/balance-order.json?shopId=" + allObj.shopId,
            data: JSON.stringify(saveDatoaAryObj.saveDataAry),
            type: "POST",
            dataTye: 'json',
            contentType: "application/json",
            success: function(msg) {
                if (msg.status == 200) {
                    var html = '<div class="mask">' +
                        '<div class="payMask">' +
                        '<img class="close" src="' + allObj.staticUrl + '/img/dmshop/close.png">' +
                        '<span class="payStatus">余额支付</span>' +
                        '</div>' +
                        '<div class="orderDetails">' +
                        '<p class="payShopName">' + allObj.shopName + '</p>' +
                        '<p class="payPrice">￥' + payPrice + '</p>' +
                        '</div>' +
                        '<div class="payComplete">' +
                        '<div class="payOk">确认支付</div>' +
                        '</div>' +
                        '</div>'
                    var paymentId = msg.attachment.paymentId
                    balPayMask(paymentId, html);
                    // payingLock();
                } else {
                    payingLock();
                    if (msg.status == 404) {
                        alert("库存不足,请刷新页面");
                        return;
                    }
                    alert("请求支付失败");
                }
            },
            error: function() {
                payingLock();
                alert("支付失败请重试");

            }
        });
    }

    // 拉起余额支付弹窗
    function balPayMask(paymentId, html) {
        var lay = layer.open({
            type: 1,
            content: html,
            style: 'border-radius:0.1rem',
            anim: 'up',
            shadeClose: false
        });
        $(".close").click(function() {
            layer.close(lay);
            payingLock();
            if (flag.pamentStatus == 1) {
                location.reload();
                flag.pamentStatus = 0;
            }

        });
        $('.payOk').on("tap", function() {

            if (flag.pamentStatus == 0 && flag.paying != 1) {
                flag.paying = 1;
                $.ajax({
                    url: "/account/v/balance-pay.json?paymentId=" + paymentId,
                    data: {},
                    type: "POST",
                    success: function(data) {

                        if (data.status == 200) {

                            flag.pamentStatus = 1;
                            flag.paying = 2;

                        } else {
                            flag.paying = 3;
                            flag.pamentStatus = 0;
                        }
                    },
                    error: function() {
                        flag.paying = 3;
                        flag.pamentStatus = 0;
                        alert("网络出小差了");

                    }
                });
            } else if (flag.pamentStatus == 1) {
                location.reload();
            }
        })
    }
    // 请求微信支付接口

    function getWxPay(saveDatoaAryObj) {
        $.ajax({
            url: "/payment/order.json?shopId=" + allObj.shopId + "&openid=" + allObj.openId,
            data: JSON.stringify(saveDatoaAryObj.saveDataAry),
            type: "POST",
            dataTye: 'json',
            contentType: "application/json",
            success: function(msg) {
                if (msg.status == 200) {
                    if (msg.attachment.payType == "0") {
                        // 哆啦宝
                        window.location.href = msg.attachment.data.url;
                        return;
                    } else if (msg.attachment.payType == "1") {
                        // 微信支付
                        var obj = msg.attachment;
                        wxPay(obj);
                    } else {
                        payingLock();
                        alert("请求支付失败");
                    }
                } else {
                    payingLock();
                    if (msg.status == 404) {
                        alert("库存不足,请刷新页面");
                        return;
                    }
                    alert("请求支付失败");
                }
            },
            error: function() {
                payingLock();
                alert("支付失败请重试");

            }
        });
    }

    // 跳转微信支付
    function wxPay(obj) {
        function onBridgeReady() {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": obj.appId, //公众号名称，由商户传入
                    "timeStamp": obj.timeStamp, //时间戳，自1970年以来的秒数
                    "nonceStr": obj.nonceStr, //随机串
                    "package": obj.package,
                    "signType": "MD5", //微信签名方式：
                    "paySign": obj.paySign //微信签名               
                },
                function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:cancel") {
                        payingLock();
                    }
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        // 获取跳转记录
                        var historyLength = history.length;
                        var itvId = setInterval(function() {
                            if (historyLength >= history.length) {
                                return;
                            }
                            clearInterval(itvId);
                            window.location.href = "";

                        }, 10);
                        window.location.href = obj.toPayCompleteUrl;
                        payingLock();
                    } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                }
            );
        };
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    }
});
// 点击菜单滚动动画
$.fn.scrollTo = function(options) {

    var defaults = {
        toT: 0,
        durTime: 500,
        delay: 30,
        callback: null,
        floorFixed: null
    };
    var opts = $.extend(defaults, options),
        timer = null,
        _this = this,
        curTop = _this.scrollTop(),
        subTop = opts.toT - curTop,
        index = 0,
        dur = Math.round(opts.durTime / opts.delay),
        smoothScroll = function(t) {
            index++;
            var per = Math.round(subTop / dur);
            if (index >= dur) {
                _this.scrollTop(t);
                window.clearInterval(timer);
                if (opts.callback && typeof opts.callback == 'function') {
                    opts.callback();
                }
                return;
            } else {
                _this.scrollTop(curTop + index * per);
            };
            if (opts.floorFixed && typeof opts.floorFixed == 'function') {
                opts.floorFixed();
            };

        };
    timer = window.setInterval(function() {
        smoothScroll(opts.toT);
    }, opts.delay);
    return _this;
};
// 开关锁
function Flag() {
    var paying = 0;
    var pamentStatus = 0;
    Object.defineProperty(this, 'paying', {
        get: function() {
            return paying;
        },
        set: function(value) {
            paying = value;
            payingFlag();
        }
    });
    Object.defineProperty(this, 'pamentStatus', {
        get: function() {
            return pamentStatus;
        },
        set: function(value) {
            pamentStatus = value;
        }
    });

    function payingFlag() {
        if (paying === 0) {
            $('.payOk').html("确认支付")
                .css('background', '#fc7809');
        } else if (paying === 1) {
            $('.payOk').html("支付中...")
                .css('background', '#ccc');
        } else if (paying === 2) {
            var successHtml = '<img class="paySuccessImg" src="' + allObj.staticUrl + '/img/dmshop/paysuccess.png">' +
                '<p class="payPrice">支付成功</p>';
            $('.orderDetails').html(successHtml);
            $('.payOk').html("完成").css('background', '#fc7809');
        } else if (paying === 3) {
            console.log('3');
            var errorHtml = '<img class="paySuccessImg" src="' + allObj.staticUrl + '/img/dmshop/payerror.png">' +
                '<p class="payPrice">支付失败</p>';
            $('.orderDetails').html(errorHtml);
            $('.payOk').html("重新支付")
                .css('background', '#fc7809');
        }
    };

};