import React, { ProviderProps, useContext } from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { context, Provider } from "../../../src/state/todo/provider";
import buildConnectorMock, { todos, newTodo } from "../../../src/service/connectorMock";

describe("Todo Provider", () => {
  let mock;

  beforeAll(() => {
    mock = buildConnectorMock();
  });

  it("load todos", async () => {
    const wrapper = ({ children }: ProviderProps<any>) => <Provider>{children}</Provider>;
    const { result, waitForNextUpdate } = renderHook(() => useContext(context), { wrapper });

    expect(result.current.loaded).toBeFalsy();

    await waitForNextUpdate();
    expect(result.current.list).toStrictEqual(todos);
    expect(result.current.loaded).toBeTruthy();
  });

  it("submit current todo", async () => {
    const wrapper = ({ children }: ProviderProps<any>) => <Provider>{children}</Provider>;
    const { result, waitForNextUpdate } = renderHook(() => useContext(context), { wrapper });

    act(() => result.current.submit && result.current.submit(newTodo.content));

    await waitForNextUpdate();

    expect(result.current.list).toStrictEqual([...todos, newTodo]);
  });
});
