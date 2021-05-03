$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)


    $("#filechoose").on("click", function() {
        $("#file").click();
        console.log("cnm");

    })

    $("#file").on("change", function(e) {

        var filelist = e.target.files
        if (filelist.length == 0) {
            return layui.layer.msg("请选择文件！")
        }

        var imgurl = URL.createObjectURL(filelist[0])
        $image.cropper("destroy").attr("src", imgurl).cropper(options)
    })

    $("#upload").on("click", function() {
        var dataurl = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')

        $.ajax({
            method: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataurl
            },
            success: function(res) {
                window.parent.getUserInfo()
                return layui.layer.msg(res.message)

            }
        })
    })
})