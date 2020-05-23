import React from "react";

export const BlogContext = React.createContext({
  blogThemes: [],
  users: [],
  toggleFavorite: () => {},
  addUser: () => {},
  removeUser: () => {},
});
