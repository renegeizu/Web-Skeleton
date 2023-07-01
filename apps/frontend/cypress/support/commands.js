// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("fillTodoInputWith", (content) => {
  const inputClass = ".new-todo";
  cy.get(inputClass)
    .should("have.attr", "placeholder", "What needs to be done?")
    .type(content)
    .invoke("val")
    .then((val) => {
      const myVal = val;
      expect(myVal).to.equal(content);
    })
  cy.get(inputClass).type("{enter}");
});
