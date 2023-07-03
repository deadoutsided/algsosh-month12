import {
  CircleStyles,
  circleInsides,
  circleTail,
  circle,
  mainInput,
  actionButton,
} from "../../src/constants/test-constants";

const fibSequence = [1, 1, 2, 3, 5, 8];

describe("fibonaci works right", function () {
  beforeEach(function () {
    cy.visit("/fibonacci");
  });

  it("button must be disabled while input empty", function () {
    cy.get(mainInput).should("have.value", "");
    cy.get(actionButton).should("be.disabled");
  });

  it("fibonacci nums counts correctly", function () {
    cy.get(mainInput).type("5");
    cy.get(actionButton).click();

    cy.get(circle).as("circles");

    cy.get("@circles")
      .should("have.length", 6)
      .each((circle, i) => {
        cy.wrap(circle).find(circleTail).should("contain", `${i}`);
        cy.wrap(circle)
          .find(circleInsides)
          .should("contain", `${fibSequence[i]}`)
          .and("have.css", "border", CircleStyles.Default);
      });
  });
});
