import { navHeader } from '../../support/page_objects/nav_header';
import { searchPage } from '../../support/page_objects/search_page';
import { searchArea } from '../../support/page_objects/search_area';

describe('Search page tests', function () {
    beforeEach(function () {
        cy.visit('https://www.donorschoose.org/donors/search.html');
    });
    it('should have header', function () {
        navHeader.verifyHeader();
    });

    it('should have search area', function() {
        searchArea.verifyExist();
    });

    it('can filter search result to "Match only"', function() {
        searchArea.canSearch('painting', 'Springfield, IL');
        searchPage.canFilterMatchOnly();
    })
})