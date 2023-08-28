import React, { useEffect, useState } from 'react'
import Header from '../components/groupComponent/header';
import Sidebar from '../components/groupComponent/sidebar';
import Tags from '../components/groupComponent/tags';
import SearchChannelCard from '../components/baseComponent/searchChannelCard';
import SearchVideoCard from '../components/baseComponent/searchVideoCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchByVideos } from '../redux/actions/video.action';

const SearchScreen = () => {

  const { query } = useParams();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleDataFromChild = (data) => {
    setSelectedCategory(data);
  };

  useEffect(() => {
    dispatch(getSearchByVideos(query));
  }, [query, dispatch])

  const { videos } = useSelector(state => state.searchVideo);

  if (videos === undefined || videos === null) {
    // Handle the loading state
    return <div>Loading...</div>;
  }
  console.log(videos,'video');
  return (
    <div className='searchScreen-section'>
      <Header searchInput={query}/>
      <main>
        <div className="main-wrapper">
          <Sidebar />
          <div className="main-video-wrapper">
            <Tags sendDataToParent={handleDataFromChild} Category={selectedCategory} />
            <div className="search-video-container">
              <div className="search-result-wrapper">
                {videos?.map((items, idx) => (
                  items?.id?.kind === "youtube#channel" ? <SearchChannelCard key={idx} data={ items } /> : <SearchVideoCard key={idx} data={ items }/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SearchScreen
