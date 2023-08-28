import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const RecommendedVideos = ({ videos }) => {

  const navigate = useNavigate();

  const handleClick = (videoId) => {
    navigate(`/watch/${videoId}`)
  }

  return (
    <div className='recommended-video-section'>
      {
        videos?.map((item,idx) =>
          <div className="recommended-video-wrapper" key={idx} onClick={()=>handleClick(item?.id?.videoId)}>
            <div className="recommended-video-thumbnail">
              <img src={ item?.snippet?.thumbnails?.medium?.url } alt="thumbnail" />
              <div className="time-duration">
                <span></span>
              </div>
            </div>
            <div className="recommended-video-content">
              <h6>{ item?.snippet?.title }</h6>
              <div className="views-count-wrapper">
                <span>{ item?.snippet?.channelTitle }</span>
                <span>{ moment(item?.snippet?.publishedAt).fromNow() }</span>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default RecommendedVideos
