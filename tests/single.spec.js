describe('Google\'s Search Functionality', function() {
    it('can find search results', function () {
        browser
            .url('https://www.google.com/ncr')
            .setValue('*[name="q"]','BrowserStack\n')
            .pause(5000);

        expect(browser.getTitle()).toMatch(/BrowserStack - Google Search/i);
    });
});