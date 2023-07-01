@todoList
Feature: Todo list
    In order to maintain a todo list
    As a user
    I need to see the list of tasks and create new ones

    Background:
        Given I add "Content-Type" header equal to "application/json"

    @api
    Scenario: Add a new task to the list
        When I send a POST request to "/todos" with body:
            """
            {"content": "Plant a tree"}
            """
        Then the JSON node "data.content" should contain "Stairway to Heaven"
        And the JSON node "data.created_at" should match "/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+/"

    @api
    Scenario: List the todo tasks
        Given I have the tasks:
            | content            |
            | Stairway to Heaven |
            | Bohemian Rhapsody  |
        When I send a GET request to "/todos"
        Then the JSON node "data" should have 2 elements
        And the JSON node "data[0].content" should contain "Stairway to Heaven"
        And the JSON node "data[0].created_at" should match "/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+/"
        And the JSON node "data[1].content" should contain "Bohemian Rhapsody"
