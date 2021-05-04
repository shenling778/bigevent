$(function() {

    function initCate() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function(res) {
                var opthtml = template("catetem", res);
                $("[name=cate_id]").html(opthtml)
                layui.form.render()

            }
        })
    }
    initCate()
    initEditor()
        // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $("#choosecover").on("click", function() {
        $("#filech").click()
    })


    $("#filech").on("change", function(e) {
        var filelist = e.target.files
        if (filelist.length == 0) {
            return "请选择文件！"
        }

        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var state = "已发布";

    $("#save2").on("click", function() {
        state = "草稿"
    })


    $("form").on("submit", function(e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append("state", state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img", blob)
                publish(fd)

            })

    })

    function publish(formdata) {
        $.ajax({
            method: "post",
            url: "/my/article/add",
            data: formdata,
            contentType: false,
            processData: false,
            success: function(res) {
                layui.layer.msg(res.message)
                location.href = "/article/art_list.html"
            }
        })
    }
})