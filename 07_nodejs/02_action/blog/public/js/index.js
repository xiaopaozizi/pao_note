/**
 * Created by 毅 on 2016/8/28.
 */

$(function() {

    var aMenu = $('.menu a');
    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');
    var $userInfo = $('#userInfo');

    // 导航条点击高亮效果
    aMenu.each(function () {
        $(this).click(function(){
            aMenu.removeClass('focus');
            $(this).addClass('focus');
        })
    });

    // 点击马上登录切换到登录界面
    $registerBox.find('a.colMint').click(function(){
        $loginBox.show();
        $registerBox.hide();
    });
    // 点击马上注册切换到注册界面
    $loginBox.find('a.colMint').click(function(){
        $registerBox.show();
        $loginBox.hide();
    });
    // 注册
    $registerBox.find('button').click(function(){
        $.ajax({
            type : 'post',
            url : '/api/user/register',
            data : {
                username : $registerBox.find('[name="username"]').val(),
                password : $registerBox.find('[name="password"]').val(),
                repassword : $registerBox.find('[name="repassword"]').val(),
            },
            dataType : 'json',
            success : function (result){
                // 显示提示信息
                $registerBox.find('.colWarning').html(result.message);
                // 如果返回码是0，代表注册成功
                if(!result.code){
                    // 显示登录框，隐藏注册框
                    window.location.reload();
                }
            }
        });
    });

    // 登录
    $loginBox.find('button').click(function(){
        $.ajax({
            type : 'post',
            url : '/api/user/login',
            data : {
                username : $loginBox.find('[name="username"]').val(),
                password : $loginBox.find('[name="password"]').val()
            },
            dataType : 'json',
            success : function (result){
                // 显示提示信息
                $loginBox.find('.colWarning').html(result.message);
                // 如果返回码是0，代表注册成功
                if(!result.code){
                    // 显示登录框，隐藏注册框
                    window.location.reload();
                }
            }
        });
    });


    // 退出
    $('#logout').click(function(){
        $.ajax({
            url : '/api/user/logout',
            success : function (result){
                // 如果返回码是0，代表注册成功
                if(!result.code){
                    // 显示登录框，隐藏注册框
                    window.location.reload();
                }
            }
        });
    });
})