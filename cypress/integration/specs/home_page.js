import { navHeader } from '../../support/page_objects/nav_header';
import { searchArea } from '../../support/page_objects/search_area';
import { homePage } from '../../support/page_objects/home_page';

describe('Home page test',() => {
    beforeEach(function () {
        cy.visit('https://www.donorschoose.org/');
    });

    it('should show header', () => {
        navHeader.verifyHeader();
    });

    it('should have search area', function() {
        searchArea.verifyExist();
    });

    it('should return at least one search result', function () {
        searchArea.canSearch('reading', 'New York, NY');
    });

    it('should have urgent project carousel', function () {
        homePage.hasUrgentProjectCarousel();
    });
})