Accounts.onCreateUser(function (options, user) {
    // We still want the default hook's 'profile' behavior.
    console.log("hello world from Account.onCreateUser");
    var userProperties = {};
    //var userProperties = {
    //    InvitedBy: '',
    //    AccountId: Random.id()
    //
    //};
    if (user.services.google.email == "chrisrussi@kidsgrowup.com") {
        var userProperties = {
            InvitedBy: '',
            TenentId: Random.id()

        };
    } else {
        var userProperties = {
            InvitedBy: 'GkhtfsWzxcst3DYAQ',
            TenentId: 'wWRJ2CAXye8obPGzA'

        };
    }
    if (options.profile) {
        user.profile = options.profile;
        user.profile = _.extend(user.profile, userProperties);
    }
    console.log("email: " + user.services.google.email);
    console.dir(user);
    return user;
});