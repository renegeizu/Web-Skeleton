import { Actions, Types } from "./actions";
import { TodoStateType } from "./provider";

const reducer = (state: TodoStateType, action: Actions): TodoStateType => {
  switch (action.type) {
    case Types.Load: {
      return {
        ...state,
        list: [
          ...action.data.data.map((item) => {
            return { content: item.content, id: item.id };
          }),
        ],
        loaded: true,
      };
    }
    case Types.Add: {
      const data = action.data.data;
      return {
        ...state,
        list: [...state.list, { content: data.content, id: data.id }],
        loaded: true,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default reducer;
