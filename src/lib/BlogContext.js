import React from "react";

export const BlogContext = React.createContext({
  blogThemes: [],
  user: '',
  toggleFavorite: () => {},
  userFilter: () => {},
  sortBy: () => {},
  realTimeFilter: () => {},
});
