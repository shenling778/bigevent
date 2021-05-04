$(function() {
    var laypage = layui.laypage;

    var param = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: ""
    }
    template.defaults.imports.dataformter = function(date) {
        const dt = new Date(date)
        var y = addZero(dt.getFullYear())
        var m = addZero(dt.getMonth() + 1)
        var d = addZero(dt.getDay())

        var hh = addZero(dt.getHours())
        var mm = addZero(dt.getMinutes())
        var ss = addZero(dt.getSeconds())

        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss
    }

    function addZero(n) {
        return n > 9 ? n : "0" + n
    }

    function initTable() {
        $.ajax({
            method: "get",
            url: "/my/article/list",
            data: param,
            success: function(res) {
                var tabhtml = template("arttb", res);
                $("tbody").html(tabhtml)
                renderPage(res.total)
            }
        })
    }

    initTable()
    initCate()

    function initCate() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function(res) {
                var opthtml = template("cateopt", res);
                $("[name=category]").html(opthtml)
                layui.form.render()

            }
        })
    }

    $("form").on("submit", function(e) {
        e.preventDefault()
        param.cate_id = $("[name=category]").val()
        param.state = $("[name=state]").val()
        initTable()
    })

    function renderPage(total) {

        laypage.render({
            elem: 'page',
            count: total,
            limit: param.pagesize,
            limits: [2, 3, 5, 10],
            curr: param.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                param.pagenum = obj.curr
                param.pagesize = obj.limit
                if (!first) {
                    initTable()

                }
            }
        });
    };

    $("tbody").on("click", ".btn-del", function() {
        var id = $(this).attr("data-id")
        var len = $(".btn-del").length
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: "get",
                url: "/my/article/delete/" + id,
                success: function(res) {
                    layer.msg(res.message)
                    layer.close(index);
                    if (len == 1) {
                        param.pagenum = param.pagenum == 1 ? 1 : param.pagenum - 1
                    }
                    initTable()

                }
            })
        });

    })

})