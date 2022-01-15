import {kebabCase} from 'lodash';

const sidebarNavigationDisclosures = [
  'Introduction',
  'For designers',
  'For engineers',
  'Contributing',
  'Foundations',
  'Content',
  'Patterns',
  'Components',
  'Icon',
  'Primitives',
  'Tokens',
  'Core',
  'Libraries',
  'Customization',
];

const BASE = 'sidebar-disclosure';

const buttonAttribute = (text) => `${BASE}-button-${kebabCase(text)}`;
const contentAttribute = (text) => `${BASE}-content-${kebabCase(text)}`;

Cypress.Commands.add('cleanupOpenDisclosures', (visited: Set<string>) => {
  cy.get('aside').then(($aside) => {
    const expandedDisclosures = $aside.find(`[aria-expanded="true"]`).toArray();

    const expandedAndVisitedAttributes = expandedDisclosures.reduce((accum, disclosure) => {
      const attr = disclosure.getAttribute('data-cy');
      const level = Number(disclosure.getAttribute('data-level'));

      return visited.has(attr) && level === 0 ? [...accum, attr] : accum;
    }, []);

    expandedAndVisitedAttributes.forEach((currentAttribute) => {
      cy.get(`[data-cy="${currentAttribute.replace('button', 'content')}"]`)
        .then(($container) => {
          return $container
            .find('button')
            .toArray()
            .filter(($btn) => {
              const btnAttr = $btn.getAttribute('data-cy');

              return !visited.has(btnAttr);
            });
        })
        .then((result) => {
          return result.length === 0;
        })
        .then((shouldClose) => {
          if (shouldClose) {
            cy.log(`closing disclosure button: ${currentAttribute}`);
            cy.get(`[data-cy="${currentAttribute}"]`).click().should('have.attr', 'aria-expanded', 'false');
          }
        })
        .end();
    });
  });
});

describe('Sidebar navigation', () => {
  let visited = new Set<string>();

  before(() => {
    cy.visit('/');
    cy.wait(500);
  });

  beforeEach(() => {
    if (visited.size > 0) {
      cy.get('aside').then(($aside) => {
        const expandedDisclosures = $aside.find(`[aria-expanded="true"]`).toArray();
        const expandedAndVisitedAttributes = expandedDisclosures.reduce((accum, disclosure) => {
          const attr = disclosure.getAttribute('data-cy');
          const level = Number(disclosure.getAttribute('data-level'));
          return visited.has(attr) && level === 0 ? [...accum, attr] : accum;
        }, []);
        cy.log(`🔍 Evaluating ${expandedAndVisitedAttributes.length} open disclosure(s)`);
        expandedAndVisitedAttributes.forEach((currentAttribute) => {
          cy.get(`[data-cy="${currentAttribute.replace('button', 'content')}"]`)
            .then(($container) => {
              return $container
                .find('button')
                .toArray()
                .filter(($btn) => {
                  const btnAttr = $btn.getAttribute('data-cy');
                  return !visited.has(btnAttr);
                });
            })
            .then((result) => {
              return result.length === 0;
            })
            .then((shouldClose) => {
              if (shouldClose) {
                cy.get(`[data-cy="${currentAttribute}"]`)
                  .click()
                  .should('have.attr', 'aria-expanded', 'false')
                  .log(`✨🧼 Successfully closed "${currentAttribute}" ✨`);
              }
            })
            .end();
        });
      });
    }
  });

  sidebarNavigationDisclosures.forEach((title) => {
    const buttonSelector = buttonAttribute(title);
    const contentSelector = contentAttribute(title);

    it(`should open the the "${title}" sidebar disclosure`, () => {
      cy.get(`[data-cy="${buttonSelector}"]`).as('currentButton').click().should('have.attr', 'aria-expanded', 'true');

      cy.get(`[data-cy="${contentSelector}"]`).as('currentContent');

      cy.get('@currentContent')
        .invoke('attr', 'data-level')
        .then((level) => {
          if (Number(level) > 0) {
            return cy
              .get('@currentContent')
              .prev()
              .parent()
              .parent()
              .prev()
              .invoke('offset')
              .then((containingOffset) => {
                cy.get('@currentContent')
                  .invoke('offset')
                  .then((currentOffset) => {
                    const top = containingOffset.top + currentOffset.top;
                    const left = currentOffset.left;
                    return {top, left};
                  });
              });
          }

          return cy.get('@currentContent').invoke('offset');
        })
        .then((offset) => {
          cy.get('@currentContent').scrollIntoView({offset}).should('be.visible');

          visited.add(buttonSelector);
        });
    });
  });
});
