import {generateSearchTest, extractRequestParams, addQueryMetaData, NO_RESULT} from './utils';

type meow = typeof cy.intercept;

describe('Docs website search', () => {
  before(() => {
    cy.fixture('./search.json').as('fixtureData');
  });

  beforeEach(() => {
    cy.intercept('**/**/**/page-data.json').as('pageDataResponses');
    cy.intercept('**/**/**/app-data.json').as('appDataResponse');
    cy.visit('/');

    cy.wait(['@pageDataResponses', '@appDataResponse']).each<{response: {statusCode: number}}>(
      ({response: {statusCode}}) => {
        cy.wrap(statusCode).should('be.a', 'number');
      }
    );
  });

  beforeEach(function () {
    cy.intercept({pathname: '/1/indexes/*/queries', method: 'POST'}, (req) => {
      const {body: jsonBody, reply} = req;

      const searchString = extractRequestParams(JSON.parse(jsonBody));
      const parsedParams = new URLSearchParams(searchString);

      const queryString = parsedParams.get('query') != null ? parsedParams.get('query') : NO_RESULT;

      const stubbedResponseBody = addQueryMetaData({
        query: queryString,
        result: this.fixtureData[queryString] || this.fixtureData[NO_RESULT],
      });

      // passing a StaticResponse object here stubs the request.
      reply({body: stubbedResponseBody, statusCode: 200});
    }).as('searchRequest');
  });

  beforeEach(() => {
    cy.wrap('').as('inputText');
  });

  context('Matching hits from engine', () => {
    it('should handle search', generateSearchTest('hello'));
  });

  context('No matching hits from engine', () => {
    it('should handle search', generateSearchTest('?!$%^'));
  });
});
