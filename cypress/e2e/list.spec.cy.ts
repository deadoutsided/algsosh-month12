import {
  mainInput,
  actionButton,
  delButton,
  circleInsides,
  circle,
  circleHead,
  circleIndex,
  CircleStyles,
  circleTail,
  listCircle,
} from "../../src/constants/test-constants";

describe("list works right", function () {
  beforeEach(function () {
    cy.visit("/list");
  });

  it("add and del by index buttons disabled while inputs empty", function () {
    cy.get(mainInput).first().should("have.value", "");
    cy.get(mainInput).last().should("have.value", "");
    cy.get(actionButton).each((btn) => {
      cy.wrap(btn).should("be.disabled");
    });
    cy.get(delButton).last().should("be.disabled");
  });

  it("default list appear correctly", function () {
    cy.get(circle).each((circle, i) => {
      if (i === 0) {
        cy.wrap(circle).find(circleHead).should("contain", "head");
      }
      cy.wrap(circle).find(circleIndex).should("contain", i);
      cy.wrap(circle).find(circleInsides).should("contain", i + 4);
      if (i === 3) {
        cy.wrap(circle).find(circleTail).should("contain", "tail");
      }
    });
  });

  it("adding element to head", function () {
    cy.get(mainInput).first().type("1");
    cy.get(listCircle).first().as("headCircle");
    cy.get(actionButton).first().click();

    cy.get(circle).should("have.length", 5);
    cy.get("@headCircle")
      .find(circleHead)
      .find(circleInsides)
      .should("contain", 1)
      .and("have.css", "border", CircleStyles.Changed);
    cy.get(circleInsides)
      .first()
      .should("have.css", "border", CircleStyles.Modified)
      .and("contain", 1);
    cy.get(circle).first().find(circleHead).should("contain", "head");
    cy.get(circle).first().find(circleIndex).should("contain", 0);

    cy.get("@headCircle").next().find(circleHead).should("be.empty");
    cy.get("@headCircle").next().find(circleIndex).should("contain", 1);
  });

  it("adding element to tail", function () {
    cy.get(mainInput).first().type("1");
    cy.get(listCircle).last().as("tailCircle");
    cy.get(actionButton).first().next().click();

    cy.get(circle).should("have.length", 5);
    cy.get("@tailCircle")
      .find(circleHead)
      .find(circleInsides)
      .should("contain", 1)
      .and("have.css", "border", CircleStyles.Changed);

    cy.get(circleInsides)
      .last()
      .should("have.css", "border", CircleStyles.Modified)
      .and("contain", 1);
    cy.get(circle).last().find(circleTail).should("contain", "tail");
    cy.get(circle).last().find(circleIndex).should("contain", 4);
    cy.get("@tailCircle").prev().find(circleTail).should("be.empty");
    cy.get("@tailCircle").prev().find(circleIndex).should("contain", 3);
  });

  it("adding element by index", function () {
    cy.get(mainInput).first().type("12");
    cy.get(mainInput).last().type("2");
    cy.get(actionButton).last().click();

    cy.get(listCircle)
      .first()
      .find(circleHead)
      .find(circleInsides)
      .should("contain", 12)
      .and("have.css", "border", CircleStyles.Changed);
    cy.get(listCircle)
      .first()
      .next()
      .find(circleHead)
      .find(circleInsides)
      .should("contain", 12)
      .and("have.css", "border", CircleStyles.Changed);
    cy.get(listCircle).first().find(circleInsides).should('have.css', 'border', CircleStyles.Changed);
    cy.get(listCircle)
      .first()
      .next()
      .next()
      .find(circleHead)
      .find(circleInsides)
      .should("contain", 12)
      .and("have.css", "border", CircleStyles.Changed);
    cy.get(listCircle).first().next().find(circleInsides).should('have.css', 'border', CircleStyles.Changed);
    cy.get(listCircle).should('have.length', 5);
    cy.get(listCircle).first().next().next().find(circleInsides).should('contain', 12).and('have.css', 'border', CircleStyles.Modified);
    cy.get(listCircle).first().next().next().find(circleIndex).should('contain', 2);
  });

  it('removing element from head', function(){
    cy.get(listCircle).should('have.length', 4);
    cy.get(listCircle).first().as('headCircle');

    cy.get(delButton).first().click();

    cy.get('@headCircle').find(circleTail).find(circleInsides).should('contain', 4);
    cy.get('@headCircle').find(circle).first().should('contain', '');

    cy.get('@headCircle').find(circleHead).should('contain', 'head');
    cy.get('@headCircle').find(circleInsides).should('contain', 5);
    cy.get('@headCircle').find(circleIndex).should('contain', 0);
    cy.get(listCircle).should('have.length', 3);
  })

  it('removing element drom tail', function(){
    cy.get(listCircle).should('have.length', 4);
    cy.get(listCircle).last().as('tailCircle');

    cy.get(delButton).first().next().click();

    cy.get('@tailCircle').find(circleTail).find(circleInsides).should('contain', 7);
    cy.get('@tailCircle').find(circle).last().should('contain', '');

    cy.get('@tailCircle').find(circleTail).should('contain', 'tail');
    cy.get('@tailCircle').find(circleInsides).should('contain', 6);
    cy.get('@tailCircle').find(circleIndex).should('contain', 2);
    cy.get(listCircle).should('have.length', 3);
  })

  it('removing from index', function(){
    cy.get(mainInput).last().type("2");
    cy.get(delButton).last().click();
    
    cy.get(listCircle).first().find(circleInsides).should('have.css', 'border', CircleStyles.Changed).and('contain', 4);
    cy.get(listCircle).first().next().find(circleInsides).should('have.css', 'border', CircleStyles.Changed).and('contain', 5);
    cy.get(listCircle).eq(2).find(circleTail).find(circleInsides).should('contain', 6).and('have.css', 'border', CircleStyles.Changed);

    cy.get(listCircle).eq(2).find(circleInsides).should('contain', 7);
    cy.get(listCircle).eq(2).find(circleTail).should('contain', 'tail');
    cy.get(listCircle).eq(2).find(circleIndex).should('contain', 2);
  })
});
