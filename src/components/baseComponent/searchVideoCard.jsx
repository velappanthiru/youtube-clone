import React, { useState, useEffect } from 'react';
import { getPopularVideos } from '../../utils/fetchFromApi';
import moment from "moment";
import numeral from "numeral";
import { useNavigate } from 'react-router-dom';

const SearchVideoCard = ({ data }) => {
  console.log(data,'data');
  const { id: { videoId },snippet: { channelId, channelTitle, description, title, thumbnails: { medium }, publishedAt } } = data;

  const [views, setViews] = useState();

  const [duration, setDuration] = useState();

  const second = moment.duration(duration).asSeconds();
  const _duration = moment.utc(second * 1000).format("mm:ss");

  const [channelInfo, setChannelInfo] = useState();

  const navigate = useNavigate();

  const handleVideoClick = (id) => {
    navigate(`/watch/${id}`)
  }


  useEffect(() => {
    const getVideoDetails = async () => {
      const { data: { items } } = await getPopularVideos('/videos', {
        params: {
          part: "contentDetails,statistics",
          id : videoId
        }
      })
      setDuration(items[0]?.contentDetails?.duration);
      setViews(items[0]?.statistics?.viewCount);
    }
    getVideoDetails();
  }, [videoId])

  useEffect(() => {
    const getChannelDetailByVideo = async () => {
      const { data: { items } } = await getPopularVideos('/channels', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id:channelId
        }
      })
      setChannelInfo(items?.[0]);
    }
    getChannelDetailByVideo();
  }, [channelId])


  return (
    <div className="search-video-wrapper" onClick={()=>handleVideoClick(videoId)}>
      <div className="search-video-thumbnail">
        <img src={ medium?.url } alt="thumbnail" />
        <div className="time-duration">
          <span>{ _duration }</span>
        </div>
      </div>
      <div className="search-video-content">
        <div>
          <h6>{ title }</h6>
          <div className="views-count-wrapper">
            <span>{ numeral(views).format("0.a") } views</span>
            <span>• { moment(publishedAt).fromNow() }</span>
          </div>
        </div>
        <div className="channel-info-wrapper">
          <div className="chl-icon">
            <img src={ channelInfo?.snippet?.thumbnails?.medium?.url } alt="logo" />
          </div>
          <p>{ channelTitle }</p>
        </div>
        <p className="desc">
          { description }
        </p>
      </div>
    </div>
  )
}

export default SearchVideoCard
