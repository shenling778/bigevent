$(function() {
    var layer = layui.layer
    var form = layui.form

    function initArtCateList() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function(res) {
                console.log(res);
                var tbhtml = template("arttb", res)
                $("tbody").html(tbhtml)
            }
        })
    }
    initArtCateList()

    var layerIndex = null
    $("#addCate").on("click", function() {

        layerIndex = layer.open({
            type: 1,
            title: "添加文章分类",
            content: $("#addform").html(),
            area: ['500px', '250px']
        })
    })

    $("body").on("submit", "#cateform", function(e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                layer.msg(res.message)
                initArtCateList()
                layer.close(layerIndex)
            }
        })
    })

    var editIndex = null
    $("tbody").on("click", ".editbtn", function() {
        editIndex = layer.open({
            type: 1,
            title: "修改文章分类",
            content: $("#editcate").html(),
            area: ['500px', '250px']
        })
        var id = $(this).attr("data-id")
        $.ajax({
            method: "get",
            url: "/my/article/cates/" + id,
            success: function(res) {
                form.val("editform", res.data)
            }
        })

    })

    $("body").on("submit", "#editform", function(e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {

                layer.msg(res.message)
                layer.close(editIndex)
                initArtCateList()

            }
        })

    })

    $("tbody").on("click", ".btn-del", function() {
        var id = $(this).attr("data-id")

        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: "get",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    layer.msg(res.message)
                    layer.close(index);
                    initArtCateList()

                }
            })
        });

    })
})