/*
 * @FilePath: /Wee.js/src/wee.js
 * @author: Wibus
 * @Date: 2021-07-17 13:48:32
 * @LastEditors: Wibus
 * @LastEditTime: 2021-07-17 14:18:52
 * Coding With IU
 */
Array.prototype.remove = function (value) {
    let index = this.indexOf(value);
    if(index > -1) this.splice(index, 1);
};

(function (global, setting) {
    class Wee{
        // 构造函数
        constructor(a, b) {
            return Wee.fn.init(a, b);
        }
        // 批量处理
        static each(data, fn) {
            for (var i = 0; i < data.length; i++) {
                fn(data[i], i, data);
            }
        }
        static select(obj) {
            switch (typeof obj) {
                case "object": return obj; break;
                case "string": return document.querySelector(obj); break;
            }
        }
        static selectAll(obj) {
            switch (typeof obj) {
                case "object": return obj; break;
                case "string": return document.querySelectorAll(obj); break;
            }
        }
        // 创建元素
        static createEle(tagName, prop){
            let Ele = document.createElement(tagName);

            if (prop) {
                if (prop.id)
                    Ele.id = prop.id;
                if (prop.src)
                    Ele.src = prop.src;
                if (prop.href)
                    Ele.href = prop.href;
                if (prop.class)
                    Ele.className = prop.class;
                if (prop.text)
                    Ele.innerText = prop.text;
                if (prop.html)
                    Ele.innerHTML = prop.html;

                if (prop.child) {
                    if (prop.child.constructor === Array) {
                        this.each(prop.child, (i) => {
                            Ele.appendChild(i);
                        });
                    }
                    else {
                        Ele.appendChild(prop.child);
                    }
                }

                if (prop.attr) {
                    if (prop.attr.constructor === Array) {
                        Wee.each(prop.attr, (i) => {
                            Ele.setAttribute(i.name, i.value);
                        });
                    }
                    else if (prop.attr.constructor === Object) {
                        Ele.setAttribute(prop.attr.name, prop.attr.value);
                    }
                }

                if (prop.parent)
                    prop.parent.appendChild(Ele);
            }

            return Ele;
        }
        static notice(content, attr) {
            var item = Wee.createEle(
                "div",
                { class: "wee-notice", html: "<span class='content'>" + content + "</span>", parent: notice.wrap }
                );

            notice.list.push(item);

            if (!document.querySelector("body > notice"))
                document.body.appendChild(notice.wrap);

            if (attr && attr.time) {
                setTimeout(notice_remove, attr.time);
            }
            else {
                var close = Wee.createEle("span", { class: "close", parent: item });

                close.onclick = notice_remove;
            }

            if (attr && attr.color) {
                item.classList.add(attr.color);
            }

            function notice_remove() {
                item.classList.add("remove");
                notice.list.remove(item);

                setTimeout(function () {
                    try {
                        notice.wrap.removeChild(item);
                        item = null;
                    }
                    catch (err) { }

                    if (document.querySelector("body > notice") && notice.list.length === 0) {
                        document.body.removeChild(notice.wrap);
                    }
                }, 300);
            }
        }
        // ajax请求
        // TODO：使用fetch而并非XMLHttpRequest
        static ajax(prop) {
            if (!prop.url)
                prop.url = document.location.href;
            if (!prop.method)
                prop.method = "GET";

            if (prop.method === "POST") {
                var data = new FormData();

                for (var d in prop.data) {
                    data.append(d, prop.data[d]);
                }
            }
            else if (prop.method === "GET") {
                var url = prop.url + "?";

                for (var d in prop.data) {
                    url += d + "=" + prop.data[d] + "&";
                }

                prop.url = url.substr(0, url.length - 1);
            }

            var request = new XMLHttpRequest();
            request.open(prop.method, prop.url);
            if (prop.crossDomain) { request.setRequestHeader("X-Requested-With", "XMLHttpRequest"); }

            if (prop.header) {
                for (var i in prop.header) {
                    request.setRequestHeader(prop.header[i][0], prop.header[i][1]);
                }
            }

            request.send(data);

            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200 || request.status === 304) {
                        if (prop.type) {
                            switch (prop.type) {
                                case "text": prop.success(request.responseText); break;
                                case "json": prop.success(JSON.parse(request.response)); break;
                            }
                        }
                        else {
                            prop.success ? prop.success(request) : console.log(prop.method + " 请求发送成功");
                        }
                    }
                    else {
                        prop.failed ? prop.failed(request) : console.log(prop.method + " 请求发送失败");
                    }

                    request = null;
                }
            };

            return request;
        }
        // 平滑移动
        static scrollTo(el, offset) {
            el = KStyle.selectAll(el);

            el.forEach(function (t) {
                t.onclick = function (e) {
                    var l = e.target.pathname;
                    var c = window.location.pathname;

                    var t = e.target.href.match(/#[\s\S]+/);
                    if (t)
                        t = ks.select(t[0]);

                    if (c === l) {
                        e.preventDefault();

                        var top = t ? (offset ? t.offsetTop - offset : t.offsetTop) : 0;

                        "scrollBehavior" in document.documentElement.style ? global.scrollTo({ top: top, left: 0, behavior: "smooth" }) : global.scrollTo(0, top);
                    }
                    else {
                        console.log(c, l);
                    }
                };
            });
        }
    }
    Wee.fn = Wee.prototype = {
        construtor: Wee,
        init: function (a, b) {
            a = Wee.selectAll(a);
    
            a.each = function (fn){
                return Wee.each(a, fn);
            };
            a.scrollTo = function (offset) {
                return Wee.scrollTo(a, offset);
            };
            return a;
        }
    };
    var notice = {
        wrap: Wee.createEle("notice"),
        list: []
    };
    console.log (
        "\n %c  Wee.js By Wibus" + " https://iucky.cn ",
        " color: #fff; padding:5px 0; border-radius: 66px; background: linear-gradient(145deg, #22d3d1, #1db1b0); box-shadow:  36px 36px 71px #158483, -36px -36px 71px #2bffff;",
    );
    // 两种方式调用：wee/Wee，大小写通用
    global.wee = Wee;
    global.Wee = Wee;
})(window)