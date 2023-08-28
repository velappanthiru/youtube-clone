import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { getPopularVideos } from "../../utils/fetchFromApi";
import moment from "moment";
import numeral from "numeral";
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video,flag = true }) => {
  const { id, snippet: { channelId, channelTitle, title, thumbnails: { medium }, publishedAt } } = video;

  const [views, setViews] = useState();
  const [duration, setDuration] = useState();
  const [channelDetails, setChannelDetails] = useState();

  const second = moment.duration(duration).asSeconds();
  const _duration = moment.utc(second * 1000).format("mm:ss");

  const _videoId = flag ? id?.videoId || id : video?.contentDetails?.videoId;

  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`)
  }

  const handleChannelClick = (e,id) => {
    e.stopPropagation();
    navigate(`/channel/${id}`)
  }

  useEffect(() => {
    const getVideoDetails = async () => {
      const { data: { items } } = await getPopularVideos('/videos', {
        params: {
          part: "contentDetails,statistics",
          id : _videoId
        }
      })
      setDuration(items[0]?.contentDetails?.duration);
      setViews(items[0]?.statistics?.viewCount);
    }
    getVideoDetails();

  }, [_videoId])

  useEffect(() => {
    // const getChannelIcon = async () => {
    //   const {data:{items}} = await getPopularVideos('/channels', {
    //     params: {
    //       part: "snippet",
    //       id : channelId
    //     }
    //   })
    //   setChannelIcon(items[0]?.snippet?.thumbnails?.default);
    // }
    // getChannelIcon();

    const getChannelIcon = async () => {
      const { data: { items } } = await getPopularVideos('/channels', {
        params: {
          part: "contentDetails,snippet,statistics",
          id : channelId
        }
      })
      setChannelDetails(items[0]);
    }
    getChannelIcon();
  },[channelId])


  return (
    <div className='yt-video-wrapper' onClick={handleVideoClick}>
      <div className="yt-video-thumbnail-wrapper">
        <img src={medium?.url} className='img-fluid' alt="thumbnail" />
        <div className="time-duration">
          <span>{ _duration }</span>
        </div>
      </div>
      <div className="yt-video-details-wrapper">
        { flag && <div className="yt-channel-icon" onClick={(e)=>handleChannelClick(e,channelDetails?.id)}>
          <Avatar alt={channelTitle} src={channelDetails?.snippet?.thumbnails?.default?.url} />
        </div>}
        <div className="yt-video-information">
          <h6>{ title }</h6>
          <div className="yt-channel-details">
            { flag && <p>{ `${channelTitle}` }</p>}
            <div className="video-details">
              <p>{numeral(views).format("0.a")} views</p>
              <p className='time'><span className='dot'></span>{ moment(publishedAt).fromNow() }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
