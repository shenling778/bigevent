$(function() {
    $(".link_reg").on("click", function() {
        // $(".regdiv").css("display", "block")
        // $(".logdiv").css("display", "none")
        $(".regdiv").show();
        $(".logdiv").hide();
    })

    $(".link_login").on("click", function() {
        $(".logdiv").show();
        $(".regdiv").hide();
    })


    var form = layui.form;
    var layer = layui.layer
    form.verify({
        passwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repasswd: function(value) {
            var pw = $(".regdiv [name=password]").val()
            if (value != pw) {
                return "两次输入的密码不一样"
            }
        }
    })

    $("#regForm").on("submit", function(e) {

        // alert("asdfasdfasdf")
        e.preventDefault()

        $.post("/api/reguser", {
                username: $("#regForm [name=username]").val(),
                password: $("#regForm [name=password]").val()
            },
            function(res) {
                if (res.status == 0) {
                    layer.msg("注册成功")
                    $(".link_login").click()
                } else {
                    return layer.msg(res.message)
                }
            }
        )
    })

    $("#loginForm").on("submit", function(e) {

        // alert("asdfasdfasdf")
        e.preventDefault()

        $.post("/api/login", $(this).serialize(),
            function(res) {
                console.log(res);
                if (res.status == 0) {
                    layer.msg("登录成功")
                    localStorage.setItem("token", res.token)
                    console.log(res.token);
                    location.href = '/index.html'

                } else {
                    return layer.msg("dddd" + res.message)
                }
            }
        )
    })

})