import {
  mainInput,
  actionButton,
  delButton,
  clearButton,
  circleInsides,
  circle,
  circleHead,
  circleIndex,
  CircleStyles,
  circleTail,
} from "../../src/constants/test-constants";

describe('stack works right', function(){
  beforeEach(function(){
    cy.visit('/stack');
  })

  it("button must be disabled while input empty", function(){
    cy.get(mainInput).should('have.value', '');
    cy.get(actionButton).should('be.disabled');
  })

  it('stack fills right', function(){
    cy.get(mainInput).type('1');
    cy.get(actionButton).click();
    cy.get(circle).should('exist');
    cy.get(circleInsides).should('have.css', 'border', CircleStyles.Changed).and('contain', 1);
    cy.get(circleHead).should('contain', 'top');
    cy.get(circleIndex).should('contain', 0);
    cy.get(circleInsides).should('have.css', 'border', CircleStyles.Default);

    cy.get(mainInput).type('2');
    cy.get(actionButton).click();
    cy.get(circle).first().find(circleHead).should('contain', '')
    cy.get(circle).should('have.length', 2).last().as('newCircle');
    cy.get('@newCircle').find(circleInsides).should('have.css', 'border', CircleStyles.Changed).and('contain', 2);
    cy.get('@newCircle').find(circleHead).should('contain', 'top');
    cy.get('@newCircle').find(circleIndex).should('contain', 1);
    cy.get('@newCircle').find(circleInsides).should('have.css', 'border', CircleStyles.Default);
  })  

  it('element removal works right', function(){
    cy.get(mainInput).type('1');
    cy.get(actionButton).click();
    cy.get(mainInput).type('2');
    cy.get(actionButton).click();
    cy.get(delButton).click();
    cy.get(circleInsides).last().should('have.css', 'border', CircleStyles.Changed);
    cy.get(circle).should('have.length', 1);
    cy.get(circleHead).should('contain', 'top');
    cy.get(circleIndex).should('contain', 0);
    cy.get(circleInsides).should('contain', 1);
  })

  it('stack clearing works right', function(){
    cy.get(mainInput).type('1');
    cy.get(actionButton).click();
    cy.get(mainInput).type('2');
    cy.get(actionButton).click();
    cy.get(mainInput).type('3');
    cy.get(actionButton).click();
    cy.get(circle).should('have.length', 3);
    cy.get(clearButton).click();
    cy.get(circle).should('not.exist');
  })
})