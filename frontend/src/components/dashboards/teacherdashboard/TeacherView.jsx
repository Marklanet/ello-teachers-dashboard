import React from "react";
import "./teacherview.css";
import Topbar from "../../common/topbar/Topbar";
import Center from "../../common/center/Center";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../../pages/home/Home";
import Books from "../../../pages/books/Books";
import ReadingList from "../../../pages/readinglist/ReadingList";
import Footer from "../../../components/common/footer/Footer";
import { ReadingListProvider } from "../../context/ReadingListContext";
import Scrolltop from "../../common/scrolltop/Scrolltop";

const TeacherView = () => {
  return (
    <Router>
      <Scrolltop />
      <ReadingListProvider>
        <div className="teacher-view">
          <Topbar />
          <Center />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/books" element={<Books />} />
            <Route exact path="/reading-list" element={<ReadingList />} />
          </Routes>
          <Footer />
        </div>
      </ReadingListProvider>
    </Router>
  );
};

export default TeacherView;
