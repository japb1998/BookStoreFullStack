import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { useStore } from '../../store/store';
import { SAVE_BOOK, GET_ME, REMOVE_BOOK } from "../../utils/queries";
import './index.css'
export default function BookCard({ book,saved,removeBook }) {
  const {dispatch,state} = useStore();
  //refetch queries after we add a book, so we can update the cache
  const [saveBookMutation] = useMutation(SAVE_BOOK,{
    onCompleted:({data})=>{
      dispatch({action:'saveBook',payload:{...book}})
    },
    onError:(error)=>{
      console.error({error})
    }
  });
  const [colapsed,setColapsed] = useState(true)
  const [deleteBookMutation] = useMutation(REMOVE_BOOK,{
    onCompleted:({data})=>{
      dispatch({action:'deleteBook',payload:book.bookId})
    },
     onError:(error)=>{
      console.error({error})
    }
  });

  function handleSave () {
   saveBookMutation({
     variables: {
       input:{...book}
     }
   });
  }
  function handleRemove() {
    deleteBookMutation({
      variables: {
        id: book.bookId,
      },
    });
  }
    return (
      <div className="max-w-sm h-[25rem] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 relative">
        <div className="overflow-hidden w-full bg-gray-200 h-[110px] p-[5px]">
          {book?.image && (
            <img
              className="rounded-full h-[100px] w-[100px]"
              src={book.image}
              alt=""
            />
          )}
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white max-h-[4rem] h-[4rem] overflow-scroll">
            {book?.title || "N/A"}
          </h5>
            
          {book?.description && colapsed && book?.description.length  > 70 ? (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {book?.description.substring(0, 70)}
              <span className="text-blue-400" onClick={()=>{setColapsed(!colapsed)}}>...Read more</span>
            </p>
          ) : (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 h-[8rem] overflow-scroll extended p-4" >
              {book?.description}
            </p>
          )}
          {!!state.user && <button
            onClick={saved ? handleRemove : handleSave}
            className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600  absolute bottom-[10px] left-[10px]`}> 
          
        
            {saved && (
              <span className="flex h-3 w-3 top-0 -mt-1 -ml-1 left-0 absolute">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            )}
            {saved ? "delete" : "Save Book"}
            <svg
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          }
        </div>
      </div>
    );
}
