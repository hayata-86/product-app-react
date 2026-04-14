import { arrayMove } from "@dnd-kit/sortable";

export function productsReducer(state, action) {
  switch (action.type) {
    case "add": {
      const newProduct = {
        id: crypto.randomUUID(),
        name: action.payload.name,
        completed: false,
      };

      return [...state, newProduct];
    }

    case "update": {
      return state.map((product) =>
        product.id === action.payload.id
          ? { ...product, name: action.payload.name }
          : product
      );
    }

    case "delete": {
      return state.filter((product) => product.id !== action.payload.id);
    }

    case "toggle": {
      return state.map((product) =>
        product.id === action.payload.id
          ? { ...product, completed: !product.completed }
          : product
      );
    }

    case "clearCompleted": {
      return state.filter((product) => !product.completed);
    }

    case "reorder": {
      const { activeId, overId } = action.payload;

      const oldIndex = state.findIndex((product) => product.id === activeId);
      const newIndex = state.findIndex((product) => product.id === overId);

      if (oldIndex === -1 || newIndex === -1) {
        return state;
      }

      return arrayMove(state, oldIndex, newIndex);
    }

    default:
      return state;
  }
}