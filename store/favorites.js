import React, { createContext, useContext, useMemo, useReducer } from "react";

const FavoritesContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "toggle": {
      const next = new Set(state);
      if (next.has(action.id)) next.delete(action.id);
      else next.add(action.id);
      return next;
    }
    case "reset":
      return new Set();
    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [set, dispatch] = useReducer(reducer, new Set());

  const value = useMemo(
    () => ({
      isFav: (id) => set.has(id),
      toggle: (id) => dispatch({ type: "toggle", id }),
      reset: () => dispatch({ type: "reset" }),
      count: set.size,
      all: [...set],
    }),
    [set]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
