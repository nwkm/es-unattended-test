/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { aliasQuery, hasOperationName } from '../utils/graphql';

export const testApiUrl = Cypress.env('gqUrl');

Cypress.Commands.add('interceptGraphQlRequests', () => {
    cy.intercept('POST', testApiUrl, (req) => {
        aliasQuery(req, 'GetPlayers');
    });
});

const registeredResponses = new Map<string, string>();

Cypress.Commands.add(
    'interceptGql',
    (operationName: string, response: string) => {
        registeredResponses.set(operationName, response);
        cy.intercept('POST', testApiUrl, (req) => {
            if (hasOperationName(req, operationName)) {
                req.alias = operationName;
                req.reply({
                    fixture: `/gql/${registeredResponses.get(
                        req.body.operationName
                    )}.json`,
                });
            }
        });
    }
);

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            interceptGraphQlRequests(): Chainable<void>;
            interceptGql(operationName: string, response: string): void;
        }
    }
}

export {};
