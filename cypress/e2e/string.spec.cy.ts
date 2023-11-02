import {
  CircleStyles,
  circleInsides,
  actionButton,
  mainInput,
} from "../../src/constants/test-constants";

describe("string works right", function () {
  beforeEach(function () {
    cy.visit("/recursion");
  });

  it("button must be disabled while input empty", function () {
    cy.get(mainInput).should("have.value", "");
    cy.get(actionButton).should("be.disabled");
  });

  it("reversing works correctly", function () {
    cy.get(mainInput).type("01234");
    cy.get(actionButton).click();

    cy.get(circleInsides).as("circles");

    cy.get("@circles")
      .should("have.length", 5)
      .each((circle, i) => {
        cy.wrap(circle)
          .should("contain", `${i}`)
          .and("have.css", "border", CircleStyles.Default);
      });

    cy.get("@circles").each((circle, i) => {
      if (i === 0 || i === 4) {
        cy.wrap(circle)
          .should("contain", `${i}`)
          .and("have.css", "border", CircleStyles.Changed);
      }
    });

    cy.get("@circles").each((circle, i) => {
      if (i === 0 || i === 4) {
        cy.wrap(circle).should("have.css", "border", CircleStyles.Modified);
      }
    });

    cy.get("@circles").each((circle, i) => {
      if (i === 0) {
        cy.wrap(circle).should("contain", 4);
      }
      if (i === 4) {
        cy.wrap(circle).should("contain", 0);
      }
    });

    cy.get("@circles").each((circle, i) => {
      if (i === 1 || i === 3) {
        cy.wrap(circle)
          .should("contain", `${i}`)
          .and("have.css", "border", CircleStyles.Changed);
      }
    });

    cy.get("@circles").each((circle, i) => {
      if (i === 1 || i === 3) {
        cy.wrap(circle).should("have.css", "border", CircleStyles.Modified);
      }
    });

    cy.get("@circles").each((circle, i) => {
      if (i === 1) {
        cy.wrap(circle).should("contain", 3);
      }
      if (i === 3) {
        cy.wrap(circle).should("contain", 1);
      }
    });

    cy.get("@circles").each((circle, i) => {
      if (i === 2) {
        cy.wrap(circle).should("have.css", "border", CircleStyles.Modified);
      }
    });

    cy.get("@circles").each((circle, i) => {
      if (i === 2) {
        cy.wrap(circle).should("contain", 2);
      }
    });
  });
});
