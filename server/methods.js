var apiCall = function (apiUrl, callback) {
    // try…catch allows you to handle errors
    try {
        var response = HTTP.get(apiUrl).data;
        // A successful API call returns no error
        // but the contents from the JSON response
        callback(null, response);
    } catch (error) {
        // If the API responded with an error message and a payload
        if (error.response) {
            var errorCode = error.response.data.code;
            var errorMessage = error.response.data.message;
            // Otherwise use a generic error message
        } else {
            var errorCode = 500;
            var errorMessage = 'Cannot access the API';
        }
        // Create an Error object and return it via callback
        var myError = new Meteor.Error(errorCode, errorMessage);
        callback(myError, null);
    }
}

Meteor.methods({

    refreshCalEvents: function() {
        var users = Meteor.users.find({}).fetch();
        console.log("meteor.methods: refreshCalEvents");
        console.log('users len: ' + users.length);
        console.log("email ~ _id ~ invitedby ~ tenentid ~ online ~ idle");
        for (var i=0; i< users.length; i++) {
            var user = users[i];
            var pro = user.profile;
            var status = user.status;
            console.log(user.services.google.email  + " ~ " + user._id + " ~ " + pro.InvitedBy + " ~ " + pro.TenentId + " ~ " + status.online + " ~ " + status.idle);
        }
    }

});