// In this file we can add custom functions which can be reused in every contexts
// The idea is use functions for processing/generating data and commands for grouping cypress steps as fill, click...
// This is because commands can't return values.

cy.functions = {
  buildAddTodoResponse: (content) => {
    return {data:{content:content, created_at:'2020-12-09 10:44:09.090510'}}
  }
}
