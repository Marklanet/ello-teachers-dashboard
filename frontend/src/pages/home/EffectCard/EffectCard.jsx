import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GraphQLClient, gql } from "graphql-request";
import "swiper/css";
import Swal from "sweetalert2";
import "swiper/css/effect-cards";
import "./effectcard.css";
import { EffectCards } from "swiper/modules";
import { ReadingListContext } from "../../../components/context/ReadingListContext";

const EffectCard = () => {
  const [books, setBooks] = useState([]);
  const { readingList, setReadingList } = useContext(ReadingListContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) {
    console.error("VITE_BACKEND_URL is not defined");
  }
  const client = new GraphQLClient(backendUrl);

  useEffect(() => {
    const fetchBooks = async () => {
      const query = gql`
        query Books {
          books {
            author
            coverPhotoURL
            title
          }
        }
      `;
      try {
        const data = await client.request(query);
        // Select 10 random books
        const shuffledBooks = data.books.sort(() => 0.5 - Math.random());
        setBooks(shuffledBooks.slice(0, 10));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    iconColor: "var(--middle-color)",
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const addToReadingList = (book) => {
    // Check if the book already exists in readingList
    const exists = readingList.some((item) => item.title === book.title);

    if (exists) {
      Swal.fire({
        title: "Oops...",
        text: `${book.title} is already in your reading list!`,
        icon: "info",
        confirmButtonText: "OK",
        iconColor: "#335C6E",
        confirmButtonColor: "#335C6E",
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
    <div className="effect-card">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        loop={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {books.map((book, index) => (
          <SwiperSlide key={index}>
            <div className="box">
              <div className="bottom">
                <button onClick={() => addToReadingList(book)}>
                  Add to List
                </button>
              </div>
              <img
                src={book.coverPhotoURL}
                alt={`Slide ${index + 1}`}
                onClick={() => addToReadingList(book)}
              />
            </div>
            <span>{book.title}</span>
          </SwiperSlide>
        ))}
      </Swiper>
      <span className="tap dark-text-gradient">Tap to Add to Reading List</span>
    </div>
  );
};

export default EffectCard;
