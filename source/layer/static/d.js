
!function(){


  //信息框
  $('a').eq(0).click(function(){
    layer.open({
      content: '移动版和PC版不能同时存在同一页面'
      ,btn: '我知道了'
    });
  });
  
  // //提示
  $('a').eq(1).click(function(){
    layer.open({
      content: 'hello layer'
      ,skin: 'msg'
      ,time: 2 //2秒后自动关闭
    });
  });
  // //询问框
  $('a').eq(2).click(function(){
    layer.open({
      content: '您确定要取消吗？',
      style: 'background-color:#09C1FF;'
      ,btn: ['是的', '不要']
      ,yes: function(index){
        location.reload();
        layer.close(index);
      }
    });
  });
  
  // //底部对话框
  $('a').eq(3).click(function(){
    layer.open({
      content: '这是一个底部弹出的询问提示'
      ,btn: ['删除', '取消']
      ,skin: 'footer'
      ,yes: function(index){
        layer.open({content: '执行删除操作'})
      }
    });
  });
  
  
  // //底部提示
  $('a').eq(4).click(function(){
    layer.open({
      content: '一个没有任何按钮的底部提示'
      ,skin: 'footer'
    });
  });
  
  // //自定义标题风格
  $('a').eq(5).click(function(){
    layer.open({
      title: [
        '我是标题',
        'background-color: #FF4351; color:#fff;'
      ]
      ,content: '标题风格任你定义。'
    });
  });
  
  // //页面层
  $('a').eq(6).click(function(){
    layer.open({
      type: 1
      ,content: '可传入任何内容，支持html。一般用于手机页面中'
      ,anim: 'up'
      ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 200px; padding:10px 0; border:none;'
    });
  });
  
  // //loading层
  
  $('a').eq(7).click(function(){
    layer.open({type: 2});
  });
  
  // //loading带文字
  $('a').eq(8).click(function(){
    layer.open({
      type: 2
      ,content: '加载中'
    });
  });


}();
