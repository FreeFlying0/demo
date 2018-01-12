/**
 * jeDate 演示
 */
$(function() {
    //常规选择
    $("#test01").jeDate({
        format: "YYYY-MM-DD hh:mm:ss",
    });
    $("#test02").jeDate({
        format: "YYYY-MM-DD hh:mm:ss",
        isClear: false
    });
    $("#test03").jeDate({
        format: "YYYY-MM-DD hh:mm:ss",
        isClear: true
    });

    //自定义格式选择
    $("#test12").jeDate({
        format: "YYYY年MM月DD日"
    });
    $("#test13").jeDate({
        format: "MM-DD-YYYY",
        isClear: true,
        okfun: function(obj) {
            console.log(obj)
        },
    });
    $("#test14").jeDate({
        format: "DD/MM/YYYY"
    });
    //其它功能展示选择
    $("#test15").jeDate({
        format: "YYYY-MM-DD",
        isinitVal: true
    });

    var custom = $("#test19").jeDate({
        format: "YYYY-MM-DD"
    });
    custom.setValue("2017-09-01");

    var custom2 = $("#test20").jeDate({
        format: "YYYY-MM-DD hh:mm:ss"
    });
    custom2.setValue("2017-09-01 10:30:40");


});