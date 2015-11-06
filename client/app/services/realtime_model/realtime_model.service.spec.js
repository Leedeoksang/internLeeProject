'use strict';

describe('Service: realtimeModel', function () {

  // load the service's module
  beforeEach(module('homeDashboardApp'));

  // instantiate service
  var realtimeModel;
  beforeEach(inject(function (_realtimeModel_) {
    realtimeModel = _realtimeModel_;
  }));

  it('should do something', function () {
    expect(!!realtimeModel).toBe(true);
  });

});
