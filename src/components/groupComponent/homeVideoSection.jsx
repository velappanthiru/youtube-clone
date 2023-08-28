import React, { useEffect } from 'react'
import VideoCard from '../baseComponent/videoCard';
import { useDispatch, useSelector } from 'react-redux';
import { getVideosByCategory, popularVideos } from '../../redux/actions/video.action';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from '../skeleton/SkeletonVideo';

const HomeVideoSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(popularVideos());
  },[dispatch])

  const { videos, activeCategory, loading } = useSelector(state => state.homeVideos);
  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(popularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  }

  if (videos === undefined || videos === null) {
    // Handle the loading state
    return <div>Loading...</div>;
  }

  return (
    <div className='video-section-wrapper'>
      {
        !loading ?
          <InfiniteScroll
            dataLength={videos.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
          >
            {videos?.map((videos,idx) => (<VideoCard key={idx} video={videos}/>))}

          </InfiniteScroll>
          : <div className="skeleton-load-wrapper">

            {[...new Array(20)].map((item, idx) => <div>
              <SkeletonVideo key={idx}/>
            </div>)}
          </div>
      }
    </div>
  )
}

export default HomeVideoSection;
