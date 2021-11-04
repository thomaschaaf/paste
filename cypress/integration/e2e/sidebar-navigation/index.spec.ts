describe('Sidebar navigation', () => {
  beforeEach(() => {
    cy.intercept('/page-data/app-data.json').as('appData');
    cy.intercept('/page-data/illustrations/page-data.json').as('pageData');
    cy.visit('/');
    cy.wait(['@appData', '@pageData']);
  });

  it('opens the sidebar disclosures', () => {
    cy.get('[data-cy=getting-started-button]').click().shouldHaveAttribute('aria-expanded', 'true');
    cy.getInFixedContainer('[data-cy=getting-started-list]').shouldBeVisible();

    cy.get('[data-cy=design-tokens-button]').click().shouldHaveAttribute('aria-expanded', 'true');
    cy.getInFixedContainer('[data-cy=design-tokens-list]').shouldBeVisible();

    cy.get('[data-cy=components-button]').click().shouldHaveAttribute('aria-expanded', 'true');
    cy.getInFixedContainer('[data-cy="components-list"]').shouldBeVisible();

    cy.get('[data-cy=primitives-button]').click().shouldHaveAttribute('aria-expanded', 'true');
    cy.getInFixedContainer('[data-cy=primitives-list]').shouldBeVisible();

    cy.get('[data-cy=layout-button]').click().shouldHaveAttribute('aria-expanded', 'true');
    cy.getInFixedContainer('[data-cy=layout-list]').shouldBeVisible();

    cy.get('[data-cy=icons-button]').click().shouldHaveAttribute('aria-expanded', 'true');
    cy.getInFixedContainer('[data-cy=icons-list]').shouldBeVisible();

    cy.get('[data-cy=content-button]').click().shouldHaveAttribute('aria-expanded', 'true');
    cy.getInFixedContainer('[data-cy=content-list]').shouldBeVisible();

    cy.get('[data-cy=patterns-button]').click().shouldHaveAttribute('aria-expanded', 'true');
    cy.getInFixedContainer('[data-cy=patterns-list]').shouldBeVisible();
  });
});
