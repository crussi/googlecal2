
var subscriptions = { };
winston = Winston;
winston.level = 'debug';



Meteor.publish('user', function() {
var userId = this.userId;
winston.info('user connected', {userId: userId});

this.ready();
this.onStop(function() {
  winston.info('user disconnected', {userId: userId});
});
});


Meteor.publish('calendar-list', function() {
    winston.debug('inside publish calendar-list');
    var subscription = this;
    var subscriptionId = this._subscriptionId;
    var calendars = [];
    var user = Helpers.getUser(this.userId);
    subscriptions[subscriptionId] = subscription;
    subscription.added( 'calendarList', 'b_random_id', { calendars: calendars } );
    subscription.onStop(function() {
        winston.debug('stop subscription to calendar-list id: ' + subscriptionId);
        delete subscriptions[subscriptionId];
    });
    var calevtopts = _.extend({},Calendar.CalendarEventOptions);
    Calendar.getCalendars(user, calevtopts, function (err, calendars) {
        winston.debug('subscription to calendar-list changed id: ' + subscriptionId);
        subscription.changed( 'calendarList', 'b_random_id', { calendars: calendars } );
    });
});



//Meteor.setInterval( function () {
//    var currentdate = new Date();
//    var datetime = "Last Sync: " + currentdate.getDate() + "/"
//                    + (currentdate.getMonth()+1)  + "/"
//                    + currentdate.getFullYear() + " @ "
//                    + currentdate.getHours() + ":"
//                    + currentdate.getMinutes() + ":"
//                    + currentdate.getSeconds();
//    console.log("server side time: " + datetime);
//}, 30000 );

//Meteor.publish('calendar-events', function() {
//    try {
//        winston.debug('inside publish calendar-events');
//        if (this.userId) {
//            winston.debug('inside publish calendar-events user is logged in');
//            var subscription = this;
//            var subscriptionId = this._subscriptionId;
//            var calevents = [];
//            var user = Helpers.getUser(this.userId);
//            subscriptions[subscriptionId] = subscription;
//            subscription.added( 'calendarEvents', 'c_random_id', { calevents: calevents } );
//            subscription.onStop(function() {
//                winston.debug('stop subscription to calendar-events id: ' + subscriptionId);
//                delete subscriptions[subscriptionId];
//            });
//            var calevtopts = _.extend({},Calendar.CalendarEventOptions);
//
//            Calendar.getEvents(user, calevtopts, function(err, calevents) {
//                //some change
//                console.log('inside Calendar.getEvents ... calevents.len: ' + calevents.length);
//                winston.debug('subscription to calendar-events changed id: ' + subscriptionId);
//                subscription.changed( 'calendarEvents', 'c_random_id', { calevents: calevents } );
//
//            });
//
//        } else {
//            winston.debug('inside publish calendar-events user is NOT logged in');
//        }
//
//    } catch (e) {
//        winston.error('inside publish calendar-events: catch error');
//        console.dir(e);
//    }
//});



