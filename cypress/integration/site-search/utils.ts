export const NO_RESULT = 'no_result';

export const addQueryMetaData = ({query, result}) => {
  const [results] = result.results;

  return {results: [{...results, query, params: `query=${query}&hitsPerPage=5`}]};
};
export const extractRequestParams = (parsedBody) => Cypress._.get(parsedBody, 'requests[0].params');
export const extractHits = (xhr) => Cypress._.get(xhr, 'response.body.results[0].hits', []);

export const generateSearchTest = (term) => {
  return function () {
    cy.wrap(term.split('')).as('searchPhrase');

    cy.get<string>('@searchPhrase').each((letter: string) => {
      cy.get<string>('@inputText')
        .then((inputText) => {
          cy.wrap<string>(inputText + letter).as('inputText');
        })
        .then((query) => {
          cy.get('[data-cy="paste-docs-search-input"]').should('be.visible').click().should('have.focus').type(letter);

          cy.wait('@searchRequest')
            .its('request.body')
            .then((jsonBody) => {
              return JSON.parse(jsonBody);
            })
            .then((body) => {
              const searchParamString = extractRequestParams(body);
              cy.verifyExpectedQuery(searchParamString, {query});
            });

          cy.get('@searchRequest')
            .its('response.body.results')
            .then((results) => {
              return results[0].hits;
            })
            .then((hits) => {
              cy.wrap(hits).as('resultHits');

              cy.get('[id*="algolia-autocomplete-listbox"]')
                .should('be.visible')
                .find('[role="option"]')
                .should('have.length', hits.length);
            });
        });
    });
  };
};
