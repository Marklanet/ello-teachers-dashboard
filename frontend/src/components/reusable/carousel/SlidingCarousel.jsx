import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Scrollbar } from "swiper/modules";
import { GraphQLClient, gql } from "graphql-request";
import Swal from "sweetalert2";
import "swiper/css";
import "./slidingcarousel.css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { ReadingListContext } from "../../context/ReadingListContext";

const SlidingCarousel = () => {
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
        // Select 12 random books
        const shuffledBooks = data.books.sort(() => 0.5 - Math.random());
        setBooks(shuffledBooks.slice(0, 12));
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
    <section className="sliding-carousel">
      <div className="sliding">
        <Swiper
          direction={"horizontal"}
          slidesPerView={4}
          spaceBetween={25}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Navigation, Autoplay, Scrollbar]}
          className="mySwiper"
          autoplay={{ delay: 2000 }}
        >
          {books.map((book, index) => (
            <SwiperSlide key={index}>
              <div className="box">
                <img src={book.coverPhotoURL} alt={`Slide ${index + 1}`} />
                <div className="bottom">
                  <span>{book.title}</span>
                  <button onClick={() => addToReadingList(book)}>
                    Add to List
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Additional Swiper for smaller screens */}
      <div className="mobile-sliding">
        {books.map((book, index) => (
          <SwiperSlide key={index}>
            <div className="box">
              <img src={book.coverPhotoURL} alt={`Slide ${index + 1}`} />
              <div className="bottom">
                <span>{book.title}</span>
                <button onClick={() => addToReadingList(book)}>
                  Add to List
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </div>
    </section>
  );
};

export default SlidingCarousel;
