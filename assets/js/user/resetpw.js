$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        passwd: [/[\S]{6,13}/, "密码长度要在6到13位之间！！！"],
        newpasswd: function(value) {
            if (value == $("input[name=oldPwd]").val()) {
                return "新密码不能与旧密码相同！！！"
            }
        },
        repasswd: function(value) {
            if (value != $("input[name=newPwd]").val()) {
                return "两次输入的密码不相同！！！"
            }
        }
    })

    $(".layui-form").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                $(".layui-form")[0].reset()

                layer.msg(res.message)
            }
        })
    })


})