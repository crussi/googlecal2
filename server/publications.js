Meteor.publish('calendar-events', function() {
    return CalendarEvents.find({TenentId:this.user().profile.TenentId});
});
