var createServiceConfiguration;

createServiceConfiguration = function(service, clientId, secret) {
    var config;
    ServiceConfiguration.configurations.remove({
        service: service
    });
    config = {
        generic: {
            service: service,
            clientId: clientId,
            secret: secret
        },
        facebook: {
            service: service,
            appId: clientId,
            secret: secret
        },
        twitter: {
            service: service,
            consumerKey: clientId,
            secret: secret
        }
    };
    switch (service) {
        case 'facebook':
            return ServiceConfiguration.configurations.insert(config.facebook);
        case 'twitter':
            return ServiceConfiguration.configurations.insert(config.twitter);
        default:
            return ServiceConfiguration.configurations.insert(config.generic);
    }
};
//1411870182471595
//createServiceConfiguration('google', '691897649419-bc8jqkbt51v3ov8qf0sf8ajvdmidk7as.apps.googleusercontent.com', 'tYAFRRNr15bzAsvJ_aQGQJrx')
//01/01/2016 borrowed this from toduo-react2
createServiceConfiguration('google', '937484174984-udu5l6ovmq7c9t88mo2mchisvsrgpstu.apps.googleusercontent.com', 'DJWJ17_WPiPuR3vGyrd1AxIg')

//createServiceConfiguration('facebook', '1411870182471595', '26e945572d1609fa680cf4331cf95272')
//createServiceConfiguration('twitter','9tVsKJKrnpNTrgr04EKrX1eJ3','BXY4BVaSHpihUM6vKxGZ9hvOMjAwojmo7qgVTAvCavklArDTaK')
