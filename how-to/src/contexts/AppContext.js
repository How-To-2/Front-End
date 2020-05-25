import { createContext } from 'react';
export const AppContext = createContext({
    articles: [],
    loggedInUser: null
});