(function () {
	$("#box").height($(document).height());
	var container = '';
	for (var i = 0; i < 16; i++) {
		container += '<div></div>';
	}
	$('#body').html(container);
	var game = new Game();
	$(document).keydown(function (event) {
		game.move(event);
	});
	$('img.refrush').click(function () {
		location.reload();
	});
}())