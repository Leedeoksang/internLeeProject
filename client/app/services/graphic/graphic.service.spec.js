'use strict';

describe('Service: graphic', function () {

  // load the service's module
  beforeEach(module('homeDashboardApp'));

  // instantiate service
  var graphic;
  beforeEach(inject(function (_graphic_) {
    graphic = _graphic_;
  }));

  it('should do something', function () {
    expect(!!graphic).toBe(true);
  });

});
