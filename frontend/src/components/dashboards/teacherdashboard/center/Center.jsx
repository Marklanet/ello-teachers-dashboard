import React, { useState, useContext, useEffect } from "react";
import "./center.css";
import BookList from "../booklist/BookList";
import Sidebar from "../../../common/sidebar/Sidebar";
import { ReadingListContext } from "../../../context/ReadingListContext";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { GraphQLClient, gql } from "graphql-request";
import DateTime from "../../../reusable/datetime/DateTime";

const Center = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { setReadingList } = useContext(ReadingListContext);
  const [searchClick, setSearchClick] = useState(false);

  const client = new GraphQLClient("http://localhost:4000/");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = gql`
      query Books {
        books {
          author
          coverPhotoURL
          readingLevel
          title
        }
      }
    `;
    try {
      const data = await client.request(query);
      const filteredBooks = data.books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredBooks);
      setSearchClick(true);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setSearchClick(false);
    }
  }, [searchTerm]);

  const addToReadingList = (book) => {
    setReadingList((prevList) => [...prevList, book]);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="center">
      <div className="left">
        <div className="top">
          <h2>
            Welcome to <span className="light-text-gradient">Ello !</span>
          </h2>
          <span>Read With Confidence</span>
        </div>
        <div className="bottom">
          <DateTime />
        </div>
      </div>
      <div className="middle">
        <form onSubmit={handleSearch} className="search-bar">
          <div className="search-input-wrapper">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for books..."
              className="search-input"
            />
            {searchTerm && (
              <CloseIcon className="clear-icon" onClick={clearSearch} />
            )}
          </div>
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
        <div className="result-holder">
          <BookList
            searchClick={searchClick}
            books={searchResults}
            onAddToReadingList={addToReadingList}
          />
        </div>
      </div>
      <div className="right-sidebar">
        <Sidebar />
      </div>
    </div>
  );
};

export default Center;
