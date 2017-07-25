
# history pushState/replaceState


## API


- history.pushState(state, title, url): pushState 是人工插入历史记录和修改地址栏,此时地址栏虽然修改,但并不触发网页跳转,换句话说就是给你看的而已,第一个参数是一个对象,你可以放入需要的参数,第二个标题名称,第三个就是url.这是地址栏里显示的东西.

- window.onpopstate: 用户点击浏览器历史前进后退按钮，并且页面无刷的时候（由于使用pushState修改了history）会触发popstate事件，事件发生时浏览器会从history中取出URL和对应的state对象替换当前的URL和history.state。

- history.replaceState(state,title,url): 用新的state和URL替换当前。不会造成页面刷新。
    - state：与要跳转到的URL对应的状态信息。
    - title：标题
    - url：要跳转到的URL地址，不能跨域。

读取当前的state、读取现有state

当页面加载时，它可能会有一个非空的state对象。这可能发生在当页面设置一个state对象(使用pushState或者replaceState)之后用户重启了浏览器。当页面重新加载，页面将收到onload事件，但不会有popstate事件。然而，如果你读取history.state属性，将在popstate事件发生后得到这个state对象

```

window.addEventListener("popstate", function(e) {
    console.log(e);
});

```

实现原理如下：

- 每次发起Ajax请求时，将Ajax地址的查询内容(?后面的)附在HTML页面地址后面，使用history.pushState塞到浏览器历史中。

- 浏览器的前进与后退，会触发window.onpopstate事件，通过绑定popstate事件，就可以根据当前URL地址中的查询内容让对应的菜单执行Ajax载入，实现Ajax的前进与后退效果。

- 页面首次载入的时候，如果没有查询地址、或查询地址不匹配，则使用第一个菜单的Ajax地址的查询内容，并使用history.replaceState更改当前的浏览器历史，然后触发Ajax操作。

除此之外，单页应用处理路由还可以监听onhashchange事件，只要hash值一改变就会触发该事件。Angular的路由机制就同时利用了这两种方案。










链接： https://developer.mozilla.org/zh-CN/docs/Web/API/Window/history




