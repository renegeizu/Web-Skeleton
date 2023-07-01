//Shared vars are used to modify the endpoint interceptions dynamically (calls affect to other calls responses)
let addedItemsWithPost;

//Just want to reinitialize the shared vars before each test, so each one is independent from the rest.
const initSharedVars = () => {
  addedItemsWithPost = [];
}

context('Todos', () => {
  beforeEach(() => {
    initSharedVars();

    //Add api interceptors so requests are not sent to the server.
    //Getting the fixture from fixtures/todos.json and adding an interceptor for <domain>/todos endpoint (GET) appending with shared var
    cy.fixture('todos').then((json) => {
      cy.intercept('GET', 'todos', (req) => {
        req.reply({...json, data:[...json.data, ...addedItemsWithPost]});
      }).as('todoList');
    });

    //Adding a simple interceptor for <domain>/todos (POST) (adding content to shared var too)
    cy.intercept('POST', 'todos', (req) => {
      const response = cy.functions.buildAddTodoResponse(req.body.content)
      addedItemsWithPost.push(response.data);
      req.reply(response);
    });

    cy.visit('/');
    cy.wait('@todoList')
  });

  it('shows the todo list', () => {
    cy.contains('plant a tree');
  });

  it('can add an element to the list', () => {
    cy.fillTodoInputWith('write a book');
    cy.visit('/');
    //reloading still contains
    cy.get('li').should('have.length', 2)
  });
});
