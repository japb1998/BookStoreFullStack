import { useLazyQuery} from "@apollo/client";
import React, { useEffect, useState } from "react";
import BooksContainer from "../../components/BooksContainer/BooksContainer";
import { useStore } from "../../store/store";
import { GET_ME } from "../../utils/queries";
import { retreiveToken } from "../../utils/auth";
import './index.css'
export default function BookSearch() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setTerm] = useState('');
  const {dispatch,state} = useStore();
  const [getMe, { error, loading }] = useLazyQuery(GET_ME);
  function onSearch(e) {
    e.preventDefault();
    fetchFromGoogle(searchTerm)
  }
  
  async function fetchFromGoogle(term) {
    try {
      var json;
      var books;
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${term}`
      );
      json = await res.json();
      // console.log(json)
      books = json.items.map((item) => {
        const { volumeInfo } = item;
        return {
          image: volumeInfo?.imageLinks?.thumbnail,
          bookId: item.id,
          title: volumeInfo.title,
          description: volumeInfo.description,
          link:volumeInfo?.infoLink,
          authors:volumeInfo?.authors ? [...volumeInfo?.authors ] : []
        };
      });
      setBooks(books);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if(!state.user && !!retreiveToken()){
    getMe().then(({data}) => {
      var me = data?.getMe;
      console.log(me)
      dispatch({action:"login",payload:{...me}});
      console.log(state)
    });
    };
    fetchFromGoogle('Harry Potter');
  }, []);
  
  return (
    <>
      {state.user && state.user?.username ? <div className="w-fit"><div className="text-3xl  ml-[100px] mt-[50px] typed-out"><span className="text-red-800">Welcome</span>, {state.user?.username}</div></div> : ""}
      <div className="w-full flex justify-center mt-4 flex-col md:flex-row items-center">
        <h1 className=" mr-5 text-3xl font-extrabold">Search:</h1>
        <form onSubmit={onSearch} className="relative block w-1/2 min-w-72">
          <label>
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className="ease-in focus:scale-105 duration-150  placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for books..."
              type="text"
              value={searchTerm}
              onChange={(e) => setTerm(e.target.value)}
              name="search"
            />
          </label>
        </form>
      </div>
      <BooksContainer
        BOOKS={books}
      />
    </>
  );
}
