'use strict';

angular.module('homeDashboardApp')
	.service('panelModel', function ($q, api, User, Util) {
    	var deferred = $q.defer(),
    		savedData = Util.localStorage.getObject('userData');

    	function getStep (usage) {
    		var kWh = usage / 1000000,
    	       quotient = kWh / 100;

            return quotient + 1 <= 6 ? quotient + 1 : 6;
    	}

    	function getModel () {
    		var queue = [],
    			model = {},
    			siteHash = User.uuid ? User.uuid : savedData.uuid,
    			userId = User.profile.userId ? User.profile.userId : savedData.profile.userId,
    			deviceHash = User.profile.deviceHash ? User.profile.deviceHash : savedData.profile.deviceHash;

    		$q.all([
    			api.getUserInfo(userId),
    			api.getRealtimeUsage(siteHash),
    			api.getMeteringUsage(siteHash),
    		]).then(function (responses) {
    			var model = [];
    			
    			model.push({
    				step: getStep(responses[2].meteringPeriodUsage)
    			});
    			model.push({
    				maxLimitUsage: responses[0].maxLimitUsage / 1000000,
    				maxLimitBill: responses[0].maxLimitBill,
    				meteringPeriodUsage: responses[2].meteringPeriodUsage / 1000000,
    				meteringPeriodBill: responses[2].meteringPeriodBill
    			});
    			model.push({
    				meteringPeriodUsage: responses[2].meteringPeriodUsage / 1000000,
    				meteringPeriodBill: responses[2].meteringPeriodBill
    			});
    			model.push({
    				power: responses[1].activePower / 1000
    			});
    			deferred.resolve(model);
    		});

    		return deferred.promise;
    	}

    	return {
    		getModel: getModel
    	};
    });
