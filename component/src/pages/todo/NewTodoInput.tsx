import React, { useContext, useState, KeyboardEvent } from "react";
import styled, { DefaultTheme, ThemeProps } from "styled-components";
import { context } from "../../state/todo/provider";
import Strings from "../../strings";
import { ENTER_KEY } from "../../utils/constants";
import { ColorType } from "../../theme/theme.types";

interface BaseNewTodoInputProps {
  submit: (e: string) => void; // () => void
}

export const BaseNewTodoInput: React.FC<BaseNewTodoInputProps> = ({ submit }) => {
  const [current, setCurrent] = useState<string>("");

  const detectSubmitKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ENTER_KEY) {
      submit(current);
      (event.target as HTMLInputElement).value = "";
    }
  };

  return (
    <InputStyled
      className="new-todo"
      placeholder={Strings.t("pages.todo.newTodoInput.inputPlaceholder")}
      onKeyDown={detectSubmitKey}
      onChange={(event: { target: { value: string } }) => setCurrent(event.target.value)}
      autoFocus={true}
      $color={"primary"}
    />
  );
};

const InputStyled = styled("input")<ThemeProps<DefaultTheme> & { $color: ColorType }>`
  width: 100%;
  border: 2px solid ${(props) => props.theme.colors[props.$color]};
  padding: 0.5rem;
  margin-bottom: 1.5rem;
`;

const NewTodoInput: React.FC = () => {
  const { submit } = useContext(context);

  return <BaseNewTodoInput submit={submit} />;
};

export default NewTodoInput;
