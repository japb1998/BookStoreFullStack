
import { Fragment } from 'react';
import './App.css';
import BooksContainer from './components/BooksContainer/BooksContainer';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookSearch from './pages/BookSearch/BookSearch';
import SavedBooks from './pages/SavedBooks/SavedBooks';
import Login from './components/Login/Login';
import Register from './components/Register/Register'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
function App() {
  return (

<BrowserRouter>

<NavBar/>

<Routes>
<Route path='/'  element={<BookSearch/>}/>
<Route  element={<ProtectedRoute/>}>
<Route path='saved'  element={<SavedBooks/>}/>
</Route>
<Route path='login'  element={<Login/>}/>
<Route path='register'  element={<Register/>}/>
</Routes>

</BrowserRouter>
  );
}

export default App;
