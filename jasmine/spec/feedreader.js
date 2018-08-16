/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /*This is the first test in the suite, provided as an example
        * it tests that there is an object called allFeeds, and that allFeeds
        * is not empty
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('url defined', function() {
           for(let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).toBeGreaterThan(0);
           }
         });


        /* This is a test similar to the one above, excepts it checks the
         * of the name of the feed is not empty.
         */
         it('name defined', function() {
           for(let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).toBeGreaterThan(0);
           }
         });
    });


    /* Wrote a new test suite to test the menu functions */
    describe('The menu', function() {

      /* Test checks to see if the hamburger menu is hidden by default. */
       it('menu is hidden', function() {
         expect(document.body.classList.contains('menu-hidden')).toBe(true);
       });


       /* This tests whether or not you'll be able to access the hamburger menu
        * with a click, and then click it again and put it away
        */
        it('menu visibility changes', function() {
          const menu = document.querySelector('.menu-icon-link');
          menu.click();
          expect(document.body.classList.contains('menu-hidden')).not.toBe(true);
          menu.click();
          expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* Wrote a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
       /* This test uses the asynchronous function loadFeed() to make sure that
        * once the function has been called and successfully run,
        * the feed container is not empty. required
        */
       beforeEach(function(done) {
         loadFeed(0, done);
       })

       it('Loads Feed', function() {
         // have to use querySelectorAll, querySelector only looks for the first one,
         // needed querySelectorAll to get all of the feed's children.
         const feed = document.querySelectorAll('.feed .entry');
         expect(feed.length).toBeGreaterThan(0);
       })
    });

    /* new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      /* Wrote a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       const feed = document.querySelector('.feed');
       const feedArrayOne = [];
       const feedArrayTwo = [];

       beforeEach(function(done) {
         loadFeed(0, function() {
           Array.from(feed.children).forEach(function(entry) {
             feedArrayOne.push(entry.innerText);
             loadFeed(1, function() {
               Array.from(feed.children).forEach(function(entry) {
                 feedArrayTwo.push(entry.innerText);
               })
               done();
             })
           })
         })
       });

       it('content changes', function() {
         expect(feedArrayOne !== feedArrayTwo).toBe(true);
       })
    });
}());
