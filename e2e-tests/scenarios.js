'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/home/login");
  });


  describe('login', function() {

    beforeEach(function() {
      browser.get('index.html#/home/login');
    });

    it('should render login view when user navigates to /home/login', function() {
      expect(element.all(by.css('h2')).first().getText()).
        toMatch(/Login/);
    });

  });

  describe('register', function() {

    beforeEach(function() {
      browser.get('index.html#/home/register');
    });

    it('should render register view when user navigates to /home/register', function() {
      expect(element.all(by.css('h2')).first().getText()).
        toMatch(/Register/);
    });

  });

  describe('app', function() {

    beforeEach(function() {
      browser.get('index.html#/app');
    });

    it('should render app view when user navigates to /app', function() {
      expect(element.all(by.css('h2')).first().getText()).
        toMatch(/App/);
    });

  });

});
