import React from "react";

export const BlogContext = React.createContext({
  blogThemes: [],
  user: "",
  userFilterCategory: "",
  userSortType: "",
  manualFilter: "",
  toggleFavorite: () => {},
  userFilter: () => {},
  sortBy: () => {},
  realTimeFilter: () => {},
});
