/// <reference types="cypress" />

import { hasOperationName } from '../utils/graphql';

export const testApiUrl = Cypress.env('gqUrl');

Cypress.Commands.add(
    'interceptGql',
    (operationName: string, response: string) => {
        cy.intercept('POST', testApiUrl, (req) => {
            if (hasOperationName(req, operationName)) {
                req.reply({
                    fixture: `/${response}.json`,
                });
            }
        }).as(operationName);
    }
);

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            interceptGql(
                operationName: string,
                response: string
            ): Chainable<void>;
        }
    }
}

export {};
