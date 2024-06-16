import React, { useContext } from "react";
import { ReadingListContext } from "../../components/context/ReadingListContext";
import searchicon from "../../assets/icons/searchicon.svg";
import "./readinglist.css";
import Swal from "sweetalert2";
const ReadingList = () => {
  const { readingList, setReadingList } = useContext(ReadingListContext);
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 1000,
    iconColor: "var(--dark-color)",
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const removeFromReadingList = (bookToRemove) => {
    setReadingList((prevList) =>
      prevList.filter((book) => book !== bookToRemove)
    );
    Toast.fire({
      icon: "success",
      title: `${bookToRemove.title} removed from your reading list.`,
    });
  };

  return (
    <div className="reading-list">
      {readingList.length === 0 ? (
        <div className="empty-list">
          <h2 className="dark-text-gradient">Empty Reading List</h2>

          <img src={searchicon} alt="Search Icon" className="empty-img" />
          <p>Oops! no books added</p>
        </div>
      ) : (
        <div>
          <h2 className="dark-text-gradient">Reading List</h2>
          <ul>
            {readingList.map((book, index) => (
              <li key={index} className="book-item">
                <img
                  src={book.coverPhotoURL}
                  alt={book.title}
                  className="book-image"
                />
                <div className="book-details">
                  <span className="book-title">{book.title}</span>
                  <div className="buttons">
                    <span className="book-author">{book.author}</span>
                    <button
                      onClick={() => removeFromReadingList(book)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReadingList;
