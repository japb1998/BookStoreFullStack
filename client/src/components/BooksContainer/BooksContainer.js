import React from 'react';
import { useStore } from '../../store/store';
import BookCard from '../BookCard/BookCard'
import './index.css'

export default function BooksContainer({ BOOKS }) {
    const {state,dispatch} = useStore();
    function isSaved(bookId){
       return state?.user?.savedBooks.find(book => book.bookId == bookId) !== undefined
    }
    
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 ">
          Book Results
        </h2>

        {BOOKS?.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {BOOKS.map((book) => (
              <BookCard
                key={book.bookId}
                saved={isSaved(book.bookId)}
                book={book}
              ></BookCard>
            ))}
          </div>
        ) : (
          <p className=" mt-6 text-4xl font-extrabold tracking-tight text-gray-900">
            Loading ...{" "}
          </p>
        )}
      </div>
    );
}
