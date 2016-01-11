SyncedCron.options.collectionName = 'cronjobs';

SyncedCron.add({
    name: 'Google cal events',
    schedule: function(parser) {
        return parser.text('every 10 seconds'); // parser is a later.parse object
    },
    job: function() {
        Meteor.call('refreshCalEvents');
    }
});


// Startup
Meteor.startup(function() {

    // Start jobs
    SyncedCron.start();

});