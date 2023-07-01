import { CircleStyles, circleInsides } from "../../src/constants/test-constants";

describe("string works right", function () {
  beforeEach(function () {
    cy.visit("/recursion");
  });

  it("button must be disabled while input empty", function () {
    cy.get("input").should("not.have.value");
    cy.get("button").last().should("be.disabled");
  });

  it("reversing works correctly", function () {
    cy.get("button")
      .contains(/развернуть/i)
      .as("submit");
    cy.get("input").as("textInput");
    cy.get("@textInput").type("Hello");
    cy.get("@submit").click();

    cy.get(circleInsides).as("circles");

    cy.get("@circles")
      .should("have.length", 5)
      .each((circle, i) => {
        cy.wrap(circle)
          .should(
            "contain",
            i === 0
              ? "H"
              : i === 1
              ? "e"
              : i === 2
              ? "l"
              : i === 3
              ? "l"
              : i === 4
              ? "0"
              : "!"
          )
          .and("have.css", 'border', CircleStyles.Default);
      });
  });
});
