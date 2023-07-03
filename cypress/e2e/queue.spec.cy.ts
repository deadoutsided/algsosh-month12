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

describe('queue works right', function(){
  beforeEach(function(){
    cy.visit('/queue');
  })

  it('add button must be disabled while input empty', function(){
    cy.get(mainInput).should('have.value', '');
    cy.get(actionButton).should('be.disabled');
  })

  it('queue fills right', function(){
    cy.get(circle).should('have.length', 7);

    cy.get(mainInput).type('1');
    cy.get(actionButton).click();
    cy.get(circle).first().as('firstCircle');
    cy.get('@firstCircle').find(circleInsides).should('have.css', 'border', CircleStyles.Changed);
    cy.get('@firstCircle').should('contain', 1);
    cy.get('@firstCircle').find(circleHead).should('contain', 'head');
    cy.get('@firstCircle').find(circleTail).should('contain', 'tail');
    cy.get('@firstCircle').find(circleIndex).should('contain', 0);
    cy.get('@firstCircle').find(circleInsides).should('have.css', 'border', CircleStyles.Default);

    cy.get('@firstCircle').next().as('secondCircle');
    cy.get(mainInput).type('2');
    cy.get(actionButton).click();
    cy.get('@secondCircle').find(circleInsides).should('have.css', 'border', CircleStyles.Changed);
    cy.get('@secondCircle').should('contain', 2);
    cy.get('@firstCircle').find(circleHead).should('contain', 'head');
    cy.get('@secondCircle').find(circleTail).should('contain', 'tail');
    cy.get('@secondCircle').find(circleIndex).should('contain', 1);
    cy.get('@secondCircle').find(circleInsides).should('have.css', 'border', CircleStyles.Default);

    cy.get(mainInput).type('3');
    cy.get(actionButton).click();
    cy.get(mainInput).type('4');
    cy.get(actionButton).click();
    cy.get(mainInput).type('5');
    cy.get(actionButton).click();
    cy.get(mainInput).type('6');
    cy.get(actionButton).click();
    cy.get(mainInput).type('7');
    cy.get(actionButton).click();
    cy.get(delButton).click();
    cy.get(mainInput).type('8');
    cy.get(actionButton).click();
    
    cy.get('@firstCircle').find(circleInsides).should('have.css', 'border', CircleStyles.Changed);
    cy.get('@firstCircle').should('contain', 8);
    cy.get('@firstCircle').find(circleTail).should('contain', 'tail');
    cy.get('@firstCircle').find(circleIndex).should('contain', 0);
    cy.get('@firstCircle').find(circleInsides).should('have.css', 'border', CircleStyles.Default);
    cy.get('@secondCircle').find(circleHead).should('contain', 'head');
  })

  it('element removal works right', function(){
    cy.get(mainInput).type('1');
    cy.get(actionButton).click();
    cy.get(circle).first().as('firstCircle');
    cy.get(mainInput).type('2');
    cy.get(actionButton).click();
    cy.get('@firstCircle').next().as('secondCircle');

    cy.get(delButton).click();
    cy.get('@firstCircle').find(circleInsides).should('have.css', 'border', CircleStyles.Changed);
    cy.get('@firstCircle').find(circleInsides).should('contain', '');
    cy.get('@firstCircle').find(circleHead).should('contain', '');
    cy.get('@firstCircle').find(circleTail).should('contain', '');
    cy.get('@firstCircle').find(circleInsides).should('have.css', 'border', CircleStyles.Default);

    cy.get('@secondCircle').find(circleHead).should('contain', 'head');
    cy.get('@secondCircle').find(circleTail).should('contain', 'tail');
  })

  it('queue clearing works right', function(){
    cy.get(mainInput).type('1');
    cy.get(actionButton).click();
    cy.get(mainInput).type('2');
    cy.get(actionButton).click();
    cy.get(mainInput).type('3');
    cy.get(actionButton).click();

    cy.get(clearButton).click();
    cy.get(circleInsides).should('contain', '').and('have.length', 7);
  })
})