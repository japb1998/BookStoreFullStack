import React,{useReducer} from "react";

const initialState = {
    user:null
}
const StoreContext = React.createContext();

function storeReducer(state,{action,payload=null}){
    switch(action){
        case 'saveBook':
            return {...state,user:{savedBooks:[...state.user.savedBooks,payload]}}
        case 'deleteBook':
            var newSaved = state.user.savedBooks.filter(book => book.bookId !== payload)
            return  {...state,user:{savedBooks:[...newSaved]}}
        case 'login':
            return  {...state,user:{...payload}}
        case 'logout':
            return {...state,...initialState}
    }
}

export  function StoreProvider({children}){
    const [state,dispatch] = useReducer(storeReducer,{...initialState});

    return <StoreContext.Provider value={{state,dispatch}}>{children}</StoreContext.Provider>
}

export function useStore() {
    const context = React.useContext(StoreContext)
    if (context === undefined) {
      throw new Error('StoreContext must be used within a StoreProvider')
    }
    return context
  }