var page = 1;
var comments = null;
// 提交评论

$('#messageBtn').click(function () {
    $.ajax({
        type : 'POST',
        url : '/api/article/comment',
        data : {
            // 文章id
            articleId : $('#articleId').val(),
            // 评论内容
            comment : $('#messageContent').val(),
        },
        success : function (res) {
            $('#messageContent').val('');
            comments = res.article.comments.reverse();
            renderDetail();
        }
    });
});
$.ajax({
    type : 'POST',
    url : '/api/article',
    data : {
        // 文章id
        articleId : $('#articleId').val(),
    },
    success : function (res) {
        comments = res.article.comments.reverse();
        renderDetail();
    }
});
// 格式化时间
function formatDate(date){
    var d = new Date(date);
    var minites = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        + ' ' + d.getHours() + ':' +  minites + ':' + d.getSeconds();
}
// 重新渲染详情页面
function renderDetail() {
    /*
     * 分页效果
     * count 总条数
     * size  每页多少条
     * pages 一共多少页
     * page   当前页数
     * */

    let count = comments.length;
    let size = 2;
    let pages = Math.ceil(count / size);
    let start = Math.max(0, (page - 1) * size);
    let end = Math.min(start + size, count);
    $lis = $('.pager li');
    if( pages > 0 ) {
        $lis.eq(1).html('<strong>' + page + ' / ' + pages + '</strong>');
    } else {
        $lis.eq(1).html('<strong>没有数据</strong>');
    }
    if( page <= 1 ){
        page = 1;
        $lis.eq(0).html('<span>没有上一页了</span>');
    } else {
        $lis.eq(0).html('<a href="javasript:;">上一页</a>');
    }
    if( page >= pages ){
        page = pages;
        $lis.eq(2).html('<span>没有下一页了</span>');
    } else {
        $lis.eq(2).html('<a href="javasript:;">下一页</a>');
    }
    $('#messageCount').html(count);
    $('.commentNum').html(count);
    let html = '';

    for ( let i = start; i < end; i++ ) {
        html +=
            `<div class="messageBox">
                <p class="name clear">
                    <span class="fl">${comments[i].user.username}</span>
                    <span class="fr">${formatDate(comments[i].postTime)}</span>
                </p>
                <p>${comments[i].comment}</p>
            </div>`;
    }
    if(html) {
        $('.messageBox').hide();
    }
    $('.messageList').html(html);
}

// 分页效果
// 事件委派，点击上一页和下一页
$('.pager li').delegate('a', 'click', function () {
    if($(this).parent().hasClass('previous')){
        page--;
    } else {
        page++;
    }
    renderDetail();
});
