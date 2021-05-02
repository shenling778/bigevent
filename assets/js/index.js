$(function() {
    console.log("aaaaaaa");

    getUserInfo();

    var layer = layui.layer
    $("#logoutbtn").on("click", function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem("token");
            location.href = "/login.html"
            layer.close(index);
        });
    })
})

function getUserInfo() {
    console.log("dddd");
    $.ajax({
        url: "/my/userinfo",
        method: "get",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)

        }
    })
}



function renderAvatar(userInfo) {
    var name = userInfo.nickname || userInfo.username;


    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    if (userInfo.user_pic) {
        $(".layui-nav-img").attr("src", userInfo.user_pic)
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        $(".text-avatar").html(name[0].toUpperCase())
    }


}