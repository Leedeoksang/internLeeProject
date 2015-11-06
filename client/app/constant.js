angular.module('homeDashboardApp')
	
	.constant('APIURL', (function (isDev) {
		var domain = isDev ? 'http://api-staging.encoredtech.com' : 'https://api.encoredtech.com:8082';

		return {
			userInfo: function (userId) {
		      return domain + '/1.2/' + (userId || 'me');
		    },

		    deviceInfo: function (deviceHash) {
		      return domain + '/1.2/devices/' + deviceHash;
		    },

		    appliances: function (siteHash) {
		      return domain + '/1.2/sites/' + siteHash + '/appliances';
		    },

		    nilmAppliancesBySite: function (siteHash) {
		      return domain + '/1.2/sites/' + siteHash + '/nilm/appliances';
		    },

		    nilmApplianceUsageBySite: function (siteHash, periodUnit) {
		      return domain + '/1.2/sites/' + siteHash + '/nilm/appliances/' + periodUnit + '/usages';
		    },

		    nilmAppliances: function (deviceHash) {
		      return domain + '/1.2/devices/' + deviceHash + '/nilm/appliances';
		    },

		    nilmApplianceUsage: function (deviceHash, periodUnit) {
		      return domain + '/1.2/devices/' + deviceHash + '/nilm/appliances/' + periodUnit + '/usages';
		    },

		    forecastUsage: function (deviceHash) {
		      return domain + '/1.2/devices/' + deviceHash + '/forecastUsage';
		    },

		    forecastUsages: function (siteHash) {
		      return domain + '/1.2/sites/' + siteHash + '/appliances/hourly/forecastusages';
		    },

		    realtimeUsage: function (deviceHash) {
		      return domain + '/1.2/devices/' + deviceHash + '/realtimeUsage';
		    },

		    meteringUsage: function (deviceHash) {
		      return domain + '/1.2/devices/' + deviceHash + '/meteringUsage';
		    },

		    meteringUsages: function (deviceHash) {
		      return domain + '/1.2/devices/' + deviceHash + '/meteringUsages';
		    },

		    periodicUsage: function (deviceHash) {
		      return domain + '/1.2/devices/' + deviceHash + '/usages';
		    },

		    standbyUsage: function (deviceHash) {
		      return domain + '/1.2/devices/' + deviceHash + '/standbyPower';
		    },

		    usageRanking: function (siteHash) {
		      return domain + '/1.2/ranking/usages/' + (siteHash || '');
		    },

		    periodicEvents: function (siteHash) {
		      return domain + '/1.2/sites/' + siteHash + '/events';
		    },

		    monthlyUsage: function (siteHash) {
		      return domain + '/1.2/sites/' + siteHash + '/monthly/usages';
		    },

		    billByUsage: function (deviceHash) {
		      return domain + '/1.2/devices/' + deviceHash + '/bill/meteringUsage';
		    },
		    usageByBill: function (deviceHash) {
		      return domain + '/1.2/devices/' + deviceHash + '/bill/expectedUsage';
		    },
		    billByTimestamp: function (deviceHash) {
		      return domain + '/1.2/devices/' + deviceHash + '/bill/home';
		    },
		    'profileUrl': domain + '/1.2/users/basicinfo',
		    'siteInfoUrl': function (uuid) {
		    	return domain + '/1.2/sites/' + uuid;
		    },
		    'deviceStatusUrl': function (uuid) {
        		return domain + '/1.2/devices/' + uuid + '/status';
      		},
		};
	})(true))

	.constant('OAUTH', (function (isDev) {
		var domain = 'https://enertalk-auth.encoredtech.com',
			clientId,
			clientSecret;

		if (isDev) {
			clientId = 'RU5DT1JFRF9FTkVSVEFMS19IT01F';
	    	clientSecret = 'oc16745q3cf6cg4239y83mm61a15w9g27dq30a0';
		} else {
			clientId = 'RU5DT1JFRF9FTkVSVEFMS19IT01FX1BST0Q=',
			clientSecret = 'ek1uf46h30w9x48y06dg4i824x6bn9nc3pe6nv1';
		}

		return {
			'authorizationUrl' : domain + '/authorization',
      		'tokenUrl'         : domain + '/token',
      		'verifyUrl'        : domain + '/verify',
      		'uuidUrl'          : domain + '/uuid',

      		'clientId'         : clientId,
      		'clientSecret'     : clientSecret
		};

	})(true));