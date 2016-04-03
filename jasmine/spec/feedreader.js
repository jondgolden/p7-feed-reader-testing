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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('allFeeds variable is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed and makes sure there is a defined URL
         */
        it('has a URL that is defined', function() {
        	for(i = 0, l = allFeeds.length; i < l; i++) {
				expect(allFeeds[i].url).toBeDefined();
        	}
        });

        it('does not have an empty URL', function() {
        	for(i = 0, l = allFeeds.length; i < l; i++) {
        		console.log(allFeeds[i].url);
    			expect(allFeeds[i].url).not.toEqual('');
        	}
		});

        /* Loops through each feed and makes sure there is a defined name
         */
		it('has a name that is defined', function() {
       		for(i = 0, l = allFeeds.length; i < l; i++) {
				expect(allFeeds[i].name).toBeDefined();
        	}
    	});

        it('does not have an empty name', function() {
        	for(i = 0, l = allFeeds.length; i < l; i++) {
        		console.log(allFeeds[i].name);
    			expect(allFeeds[i].name).not.toEqual('');
        	}
    	});
    });

    describe('The menu', function() {
        var $menuIcon = $('.menu-icon-link');
        var $hiddenClass = $('body').hasClass('menu-hidden');

        /* This test ensures 'menu' is
         * hidden by default.
         */
        it('hides by default', function() {
            expect($hiddenClass).toBeTruthy();
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('displays when clicked and hides when clicked again', function() {

            $menuIcon.trigger('click');
            // looks for the menu-hidden class after the trigger click. Re-checks the state of the current DOM.
            var $hiddenClass = $('body').hasClass('menu-hidden');
            expect($hiddenClass).toBeFalsy();

            $menuIcon.trigger('click');
            // looks for the menu-hidden class after the trigger click. Re-checks the state of the current DOM.
            $hiddenClass = $('body').hasClass('menu-hidden');
            expect($hiddenClass).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            // Calls loadFeed() method, an async function.
            // The 'done()' tells us the async function is completed and gives the go ahead for more testing.
            loadFeed(0, done);
        });

        it('has at least one single .entry element within the .feed container', function() {
        	console.log($('.entry').length);
            expect($('.entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content changes.
         */
        var $feedA; // Makes sure 'feedA' =/= 'feedB'

        beforeEach(function(done) {

            loadFeed(2, function() {
                $feedA = $('.feed .entry').html();
                done();
            });
        });

        it('content changes when new feed is loaded', function(done) {
            var $feedB;

            loadFeed(0, function() {
                $feedB = $('.feed .entry').html();
	            expect($feedB).not.toEqual($feedA);
	            done();
            });
        });
    });
}());
