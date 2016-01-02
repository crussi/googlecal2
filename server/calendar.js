
CalendarEvent = (function () {
    function CalendarEvent(gcalevent) {
        this.created = gcalevent.created;
        this.creator = {};
        this.start = {};
        this.end = {};
        this.creator.displayName = gcalevent.creator.displayName;
        this.creator.email = gcalevent.creator.email;
        if (gcalevent.end.dateTime) {
            this.end.hasTime = true;
            this.end.dateTime = gcalevent.end.dateTime;
        }
        else if (gcalevent.end.date) {
            this.end.dateTime = gcalevent.end.date;
        }
        this.htmlLink = gcalevent.htmlLink;
        this.id = gcalevent.id;
        this.summary = gcalevent.summary;
        if (gcalevent.start.dateTime) {
            this.start.hasTime = true;
            this.start.dateTime = Helpers.clone(gcalevent.start.dateTime);
        }
        else if (gcalevent.start.date) {
            this.start.dateTime = Helpers.clone(gcalevent.start.date);
        }
        this.updated = gcalevent.updated;
    }
    return CalendarEvent;
})();

Calendar = {
    CalendarEventOptions : {
        maxResults:10,
        timeMin: (new Date()).toISOString(),
        showDeleted:false,
        singleEvents:true,
        orderBy:'startTime'
    },

    Urls : {
        calendarList : "/calendar/v3/users/me/calendarList?minAccessRole=owner",
        calendarEvents : "/calendar/v3/calendars/calendarId/events",
    },
    getCalendars : function(user, calevtopts, callback){
        //refresh user's google accesstoken
        this._refreshToken(user);
        calevtopts = calevtopts || {};
        var i, j, calendars = this._getCalendarList(user);
        for (i = 0; i < calendars.length; i++) {
            winston.debug('Calendar: ' + calendars[i].summary);
            calendars[i] = _.extend(calendars[i],{events:[]});
            if (calendars[i] && calendars[i].id) {
                calendars[i].events = this._getCalendarEvents(user, calevtopts, calendars[i].id);
                //for (j = 0; j < calendars[i].events.length; j++) {
                //    console.log('cal event: ' + calendars[i].events[j].summary);
                //}
            } else {
                console.log("calendar[" + i + "] is undefined");
            }
        }
        callback(null,calendars);
    },
    getEvents : function(user, calevtopts, callback) {
        //refresh user's google accesstoken
        this._refreshToken(user);
        calevtopts = calevtopts || {};
        var i, j, gcalevents = [], calevents = [], calevent,
            calendars = this._getCalendarList(user);
        for (i = 0; i < calendars.length; i++) {
            winston.debug('Calendar: ' + calendars[i].summary);
            //_.extend(calendars[i],{events:[]});

            gcalevents = this._getCalendarEvents(user, calevtopts, calendars[i].id);
            for (j = 0; j < gcalevents.length; j++) {
                console.log('cal event: ' + gcalevents[j].summary);
                //calevent = _.extend({},CalendarEvent);
                calevent = new CalendarEvent(gcalevents[j]);
                calevent.calendarId = calendars[i].id;
                calevent.calendarName = calendars[i].summary;
                //calevent.load(gcalevents[j]);
                calevents.push(calevent);
            }
        }
        callback(null,calevents);

    },
    _refreshToken : function(user) {
        //relies on GoogleApi method exchangeRefreshToken
        var result = Meteor.call('exchangeRefreshToken', user && user._id);
        if (result.err) {
            winston.error('Unable to refresh user access token:', result.err);
        }
    },
    _getCalendarList : function(user){
        var options,
            calendars = [],
            result;
        options = {user:user};
        calendars = [];
        result = GoogleApi.get(this.Urls.calendarList, options);

        if (result.err) {
            console.log('err: ' + err);
        } else {
            calendars = result.items;
        }

        return calendars;
    },
    _getCalendarEvents : function(user, calevtopts, calendarId) {
        calevtopts = calevtopts || {};
        var params = "?" + Helpers.toQueryString(calevtopts);
        //winston.debug('params: ' + params);
        var url = this.Urls.calendarEvents.replace("calendarId",calendarId) + params;
        var options = {user:user};
        var calendarevents = [];
        var result = GoogleApi.get(url, options);

        if (result.err) {
            winston.error('Unable to get calendar events: ',result.err);
        } else {
            calendarevents = result.items;
        }
        return calendarevents;
    }

}