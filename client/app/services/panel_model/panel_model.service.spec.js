'use strict';

describe('Service: panelModel', function () {

  // load the service's module
  beforeEach(module('homeDashboardApp'));

  // instantiate service
  var panelModel;
  beforeEach(inject(function (_panelModel_) {
    panelModel = _panelModel_;
  }));

  it('should do something', function () {
    expect(!!panelModel).toBe(true);
  });

});
