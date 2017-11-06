
var page = 1;

var myScrollload = new Scrollload({
    container: document.querySelector('.scrollload-container'),
    content: document.querySelector('.scrollload-content'),
    loadMore: function(sl) {

        if(page >= 5 ){
            sl.noMoreData();
            return;
        }
        
        var html = '';
        for (var index = 0; index < 10; index++) {
            html = html + '<li> loadMore - '+  page + ' - ' + index +'</li>';           
        }
        $(sl.contentDom).append(html);
        sl.unLock()
        page++;
    },
    // 你也可以关闭下拉刷新
    enablePullRefresh: true,
    pullRefresh: function (sl) {
        page = 1;
        var html = '';
        for (var index = 0; index < 10; index++) {
            html = html + '<li> loadMore - '+  page + ' - ' + index +'</li>';           
        }
        $(sl.contentDom).html(html);
        sl.refreshComplete();
        sl.refreshData();
    }
});