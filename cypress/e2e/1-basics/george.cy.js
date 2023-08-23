/// <reference types="cypress" />

const SEARCH_INPUT = "input[type='search']";
const SEARCH_BAR_BUTTON = "[data-testid='search-action-button']";
const LIST_ITEMS = `[data-testid="list-item"]`;
const LIST_ITEM_EXCHANGE_RATE = `[data-testid="list-item-exchange-rate"]`;

const performSearch = (search) => cy.get(SEARCH_INPUT).type(search);
const getItemsList = () => cy.get(LIST_ITEMS);

const assertItemsLength = (length) =>
  getItemsList().should("have.length", length);
const assertFirstItemContains = (text) => {
  getItemsList().first().should("contain.text", text);
};

const assertFirstItemRateContains = (text) => {
  getItemsList().get(LIST_ITEM_EXCHANGE_RATE).first().should("have.text", text);
};

describe("George Currencies", () => {
  beforeEach(() => {
    cy.intercept("GET", "/v3/*", {
      fixture: "../../src/mocks/fx.json",
    }).as("mocky");
    cy.visit("http://127.0.0.1:5173/");
  });

  it("Should load list of all currencies", () => {
    cy.get("div[role='status']").should("have.length", 1);
    assertItemsLength(147);
    assertFirstItemContains("Afghanistan");
    assertFirstItemRateContains("78.6653 AFN");
    cy.get(LIST_ITEMS).last().should("contain.text", "Zimbabwe");
  });

  it("should be able to search for USD", () => {
    performSearch("USD");
    assertItemsLength(1);
    assertFirstItemContains("United States");
    assertFirstItemRateContains("1.1299 USD");
    cy.hash().should("eq", "#USD");
  });

  it("should be not able to search for XXX", () => {
    performSearch("XXX");
    assertItemsLength(0);
  });

  context("with deep links", () => {
    it("Should be able to reload page without losing search", () => {
      performSearch("brazil");
      assertItemsLength(1);
      assertFirstItemContains("Brazil");
      assertFirstItemRateContains("4.0404 BRL");
      cy.reload();
      assertItemsLength(1);
      assertFirstItemContains("Brazil");
      cy.hash().should("eq", "#brazil");
    });

    it("Should be able to load page with search hash", () => {
      cy.visit(`http://127.0.0.1:5173/#mexico`);
      assertItemsLength(1);
      assertFirstItemContains("Mexico");
      cy.hash().should("eq", "#mexico");
    });
  });

  it("Should be able to see error when page fails load data", () => {
    cy.intercept("GET", "/v3/*", {
      statusCode: 500,
    }).as("mocky");
    cy.visit(`http://127.0.0.1:5173/`);
    cy.get("div[role='alert']").should("have.length", 1);
    cy.get("div[role='alert']")
      .first()
      .should("contain.text", "Unexpected error occurred");
  });
});
