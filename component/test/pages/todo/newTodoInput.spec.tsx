import React from "react";
import { BaseNewTodoInput } from "../../../src/pages/todo/NewTodoInput";
import { render, fireEvent } from "@testing-library/react";

describe("New todo input", () => {
  let submit: (e: any) => void;

  beforeEach(() => {
    submit = jest.fn();
  });

  it.skip("submits its content when enter is pressed", () => {
    const { getByPlaceholderText } = render(<BaseNewTodoInput submit={submit} />);

    fireEvent.keyDown(getByPlaceholderText("What needs to be done?"), {
      key: "Enter",
      code: 13,
      charCode: 13,
      which: 13,
    });

    expect((submit as jest.Mock).mock.calls).toBe([["Plant a tree"]]);
  });
});
