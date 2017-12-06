
(function (global, $, doc) {
    var Application = function () {
        this.reqUrl = '/menu.json';
        this.html = '';
        this.reqMenuList();
        
    };
    Application.prototype = {
        constructor: Application,
        reqMenuList: function(){
            var data = {
                TIMER: Date.now()
            };
            $.ajax({
                url: this.reqUrl,
                data: data,
                type: "get",
                dataTye: 'json',
                success: function (res) {
                   console.log(res);
                   if(res.State !=0){
                       alert('请求失败');
                       return;
                   }
                    this.creatMenu(res.Data);
                    $('#city_lei').html(this.html)
                }.bind(this),
                error: function (err) {

                }.bind(this)
            });
        },
        creatMenu: function(options){
            for (var index = 0; index < options.length; index++) {
                var item = options[index];
                if(item.ListRec.length == 0){
                    this.html = this.html + '<li>'+ item.Name +'</li>';
                }else {
                    this.html = this.html + 
                    '<li>' +
                        '<span>' + item.Name + '</span>' +
                        '<ul>';
                    this.creatMenu(item.ListRec);
                    this.html = this.html +
                        '</ul>' +
                    '</li>';
                }
            }
        }
    };

    $(function () {
        global.Application = new Application();
    });
})(this, this.$, document);
