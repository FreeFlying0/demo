$(function() {
    var d = 2;
    var a = 4;
    var c = 1;
    var b = {
        isMobile: function() {
            var h = navigator.userAgent;
            var e = h.match(/(iPad).*OS\s([\d_]+)/),
                g = !e && h.match(/(iPhone\sOS)\s([\d_]+)/),
                f = h.match(/(Android)\s+([\d.]+)/),
                i = g || f;
            if (i) { return true } else { return false }
        },
        queryTocTree: function() {
            var f = $("body h" + d);
            for (var e = 0; e < f.length; e++) { f.eq(e).addClass("shenbao-toc-tree-hx") }
            d = d + 1;
            if (d <= a) { this.queryTocTree() } else { this.creatTocTree() }
        },
        creatTocTree: function() {
            var l = $(".shenbao-toc-tree-hx");
            if (l.length == 0) { $(".shenbao-toc-tree-catalog").hide(); return }
            var n = [];
            for (var k = 0; k < l.length; k++) {
                var f = l.eq(k);
                var m = {};
                m.tagName = (f.prop("tagName")).toString().toLowerCase();
                m.id = f.prop("id");
                m.title = f.text();
                n.push(m)
            }
            var e = "";
            for (var h = 0; h < n.length; h++) {
                var g = '<li class="shenbao-toc-tree-li ' + n[h].tagName + '-nav">' + n[h].title + "</li>";
                e += g
            }
            $(".shenbao-toc-tree-body").html(e);
            setTimeout(this.scrollFn, 100);
            this.liClick()
        },
        liClick: function() {
            $(".shenbao-toc-tree-body li").click(function() {
                c = 0;
                var e = $(this).index();
                $(".shenbao-toc-tree-body li").removeClass("active");
                $(this).addClass("active");
                var f = $(".shenbao-toc-tree-hx").eq(e).offset().top + 5;
                $("body,html").animate({ scrollTop: f }, 300, function() { c = 1 })
            })
        },
        scrollFn: function() {
            $(window).scroll(function() {
                var f = $(window).scrollTop();
                if (c == 1) {
                    $(".shenbao-toc-tree-hx").each(function() {
                        var h = $(this).index(".shenbao-toc-tree-hx");
                        if (h >= $(".shenbao-toc-tree-hx").length - 1) { $divTop = $(".the-end").offset().top } else { $divTop = $(".shenbao-toc-tree-hx").eq(h + 1).offset().top }
                        if ($divTop > f) {
                            $(".shenbao-toc-tree-body li").removeClass("active");
                            $(".shenbao-toc-tree-body li").eq(h).addClass("active");
                            var i = $(".shenbao-toc-tree-body li").height();
                            var j = i * h;
                            var k = j - ($("#shenbao-toc-tree-content").height() / 2 - 15);
                            $("#shenbao-toc-tree-content").animate({ scrollTop: k }, 10);
                            return false
                        }
                    });
                    var e = f < $(".shenbao-toc-tree-hx").eq(0).offset().top;
                    var g = f > $(".the-end").offset().top;
                    if (e || g) { $(".shenbao-toc-tree-body li").removeClass("active") }
                }
            })
        }
    };
    b.queryTocTree();
    $("#back-top").click(function() { $("body,html").animate({ scrollTop: 0 }, 800) })
});