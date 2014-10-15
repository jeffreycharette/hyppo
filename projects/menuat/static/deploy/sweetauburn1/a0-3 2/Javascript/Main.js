var widgetAPI = new Common.API.Widget();

var Main = {};

Main.onLoad = function() {
	widgetAPI.sendReadyEvent();
};