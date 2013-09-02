// open a single window
var win = Ti.UI.createWindow({
		backgroundColor:'white',
		title: "Animation module tests"
	}),
	tests = [
		{title: "Flip View", module: "flip"},
		{title: "Cross fade", module: "crossfade"},
		{title: "backgroundColor", module: "background"},
		{title: "Rotate and Bounce", module: "bounce"},
	],
	testList = Ti.UI.createTableView({minRowHeight:"48dp"}),
	rows = [],
	i = 0;

for (; i < tests.length; i++) {
	rows.push(
		Ti.UI.createTableViewRow({title: tests[i].title})
	);
}

testList.addEventListener("click", function(e) {
	require(tests[e.index].module).run();
});
testList.setData(rows);
win.add(testList);
win.addEventListener("open", function() {
	var module = require("com.billdawson.timodules.animation");
	module.viewPropertyAnimator.animate(testList)
	.setDuration(500)
	.setStartDelay(500)
	.alpha(0)
	.withEndAction(function() {
		module.viewPropertyAnimator.animate(testList)
		.setStartDelay(0)
		.alpha(1)
	});
});

win.open();

