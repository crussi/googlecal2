this.UserConnections = new Mongo.Collection("user_status_sessions");

relativeTime = function(timeAgo) {
    var ago, days, diff, time;
    diff = moment.utc(TimeSync.serverTime() - timeAgo);
    time = diff.format("H:mm:ss");
    days = +diff.format("DDD") - 1;
    ago = (days ? days + "d " : "") + time;
    return ago + " ago";
};

//Meteor.startup(function(){
//    console.log('meteor startup on client start monitoring');
//    UserStatus.startMonitor({
//        threshold: 30000,
//        interval: 1000,
//        idleOnBlur: true
//    });
//});

Deps.autorun(function(c) {
    try {
        UserStatus.startMonitor({
            threshold: 30000,
            idleOnBlur: true
        });
        return c.stop();
    } catch (_error) {}
});