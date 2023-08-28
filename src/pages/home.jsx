import React, { useState } from 'react'

import Header from '../components/groupComponent/header';
import Sidebar from '../components/groupComponent/sidebar';
import Tags from '../components/groupComponent/tags';
import HomeVideoSection from '../components/groupComponent/homeVideoSection';
import { useDispatch } from 'react-redux';
import { getVideosByCategory, popularVideos } from '../redux/actions/video.action';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dispatch = useDispatch();

  const handleDataFromChild = (data) => {
    setSelectedCategory(data);
    if (data === "All") {
      dispatch(popularVideos());
    } else {
      dispatch(getVideosByCategory(data));
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className="main-wrapper">
          <Sidebar />
          <div className="main-video-wrapper">
            <Tags sendDataToParent = { handleDataFromChild } Category={selectedCategory}/>
            <div className="video-suggestions-wrapper">
              <HomeVideoSection  />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home;
