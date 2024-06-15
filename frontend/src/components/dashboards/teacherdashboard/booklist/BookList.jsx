import React, { useContext } from "react";
import "./booklist.css";
import searchicon from "../../../../assets/icons/searchicon.svg";
import Swal from "sweetalert2";
import { ReadingListContext } from "../../../context/ReadingListContext";

const BookList = ({ searchClick, books }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    iconColor: "var(--middle-color)",
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const { readingList, setReadingList } = useContext(ReadingListContext);
  const addToReadingList = (book) => {
    // Check if the book already exists in readingList
    const exists = readingList.some((item) => item.title === book.title);

    if (exists) {
      Swal.fire({
        title: "Oops...",
        titleColor: "var(--middle-color)",
        text: `${book.title} is already in your reading list!`,
        icon: "info",
        iconColor: "var(--middle-color)",
        confirmButtonText: "OK",
        confirmButtonColor: "var(--dark-color)",
      });
    } else {
      setReadingList((prevList) => [...prevList, book]);
      Toast.fire({
        icon: "success",
        title: `${book.title} added to your reading list.`,
      });
    }
  };

  return (
    <div className="book-list">
      {books.length === 0 ? (
        searchClick ? (
          <div className="no-results">
            <img src={searchicon} alt="Search Icon" />
            <p>No Matching Results</p>
          </div>
        ) : (
          <p></p>
        )
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <img src={book.coverPhotoURL} alt="Book Cover" />
              <div className="book-info">
                <span className="book-title">{book.title}</span>
                <span className="book-author">by {book.author}</span>
              </div>
              <button onClick={() => addToReadingList(book)}>
                Add to List
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
