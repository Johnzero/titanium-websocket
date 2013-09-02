var createNotificationViaService = function(message, interval) {
    var intent = Ti.Android.createServiceIntent({
        url : 'IntentService.js'
    });
    intent.putExtra('message', message || '新消息！');
    if (interval) {
        intent.putExtra('interval', interval);
    }
    Ti.Android.startService(intent);
};

module.exports = createNotificationViaService;