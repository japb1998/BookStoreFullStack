import React from 'react'
import { useNavigate } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import "./index.css";
export default function BookShell({BOOKS }) {
  var navigate = useNavigate();
  return (
    <div className="max-w-xl mt-[1rem] rounded mx-auto py-8 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen">
      <h2 className="text-6xl font-extrabold tracking-tight text-gray-900 ">
        Saved Books
      </h2>

      {BOOKS?.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {BOOKS.map((book) => (
            <BookCard
              key={book.bookId}
              saved={true}
              book={book}
            ></BookCard>
          ))}
        </div>
      ) : (
        <div className="mx-auto rounded-lg my-12 p-10 text-4xl max-w-screen-sm font-extrabold tracking-tight text-gray-900 bg-white flex flex-col  justify-center items-center drop-shadow-2xl">
          No Books in your shell ...{" "}
          <button
            className="rounded  text-gray-800 text-xl text-bold  bounce-nav"
            onClick={() => navigate("/")}
          >
            Let's find Some
          </button>
        </div>
      )}
    </div>
  );
}
