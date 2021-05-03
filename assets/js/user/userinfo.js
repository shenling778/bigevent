$(function() {
        var form = layui.form
        var layer = layui.layer
        form.verify({
            nickname: function(value) {
                if (value.length < 6) {
                    return "昵称至少6位"
                }
            }
        })

        function initUserInfo() {

            $.ajax({
                url: "/my/userinfo",
                method: "get",
                success: function(res) {
                    // $("input[name=username]").val(res.data.username);
                    // $("input[name=nickname]").val(res.data.nickname);
                    // $("input[name=email]").val(res.data.email);
                    form.val("userform", res.data)
                }
            })
        }
        initUserInfo()
        $("button[type=reset]").on("click", function(e) {
            e.preventDefault()
            initUserInfo()

        })

        $(".layui-form").on("submit", function(e) {
            e.preventDefault()
            $.ajax({
                method: "post",
                url: "/my/userinfo",
                data: $(this).serialize(),
                success: function(res) {
                    window.parent.getUserInfo()
                    return layer.msg(res.message)
                }
            })
        })
    }

)