import React, { useEffect, useState } from 'react';
import Header from '../components/groupComponent/header';
import Sidebar from '../components/groupComponent/sidebar';
import banner from '../images/banner.jpeg';
import { PiCaretRightLight } from 'react-icons/pi';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelSubscriptionStatus, getChannelVideos } from '../redux/actions/video.action';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/baseComponent/videoCard';
import { getPopularVideos } from '../utils/fetchFromApi';
import numeral from 'numeral';


const ChannelScreen = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [channelDetails, setChannelDetails] = useState();

  useEffect(() => {
    dispatch(getChannelVideos(id))

    const getChannelIcon = async () => {
      const {data:{items}} = await getPopularVideos('/channels', {
        params: {
          part: "contentDetails,snippet,statistics",
          id : id
        }
      })
      setChannelDetails(items[0]);
    }
    getChannelIcon();

    dispatch(getChannelSubscriptionStatus(id))

  }, [dispatch, id])

  const { videos } = useSelector(state => state.channelVideo);

  const subscriptionStatus = useSelector(state => state?.channelDetails?.subscriptionStatus);

  return (
    <div className='channel-section-wrapper'>
      <Header />
      <div className="main-channel-wrapper">
        <Sidebar />
        <div className="main-channel-video-wrapper">
          <div className="yt-channel-banner-wrapper">
            <img src={ channelDetails?.snippet?.thumbnails?.high?.url } alt="banner" />
          </div>


          <div className="yt-clone-channel-page-details-wrapper">
            <div className="yt-channel-profile-wrapper">
              <div className="yt-channel-profile">
                <img src={ channelDetails?.snippet?.thumbnails?.medium?.url } alt="logo" />
              </div>
              <div className="yt-channel-content-wrapper">
                <div className="yt-clone-channel-details-header">
                  <div className="channel-name-wrapper">
                    <div className="channel-logo">
                      <img src={ banner } alt="banner" />
                    </div>
                    <div className="channel-name-content">
                      <h5>{channelDetails?.snippet?.title}</h5>
                      {subscriptionStatus ?  <Chip label="Subscribed" size='small' color="success"/> : <Chip label="Subscribe" size='small' color="error"/>}


                    </div>
                  </div>
                  <div className="channel-details">
                    <span>{ channelDetails?.snippet?.customUrl }</span>
                    <span>{ numeral(channelDetails?.statistics?.subscriberCount).format("0.a") } subscribers</span>
                    <span>{ numeral(channelDetails?.statistics?.videoCount).format("0.0a") } videos</span>
                  </div>
                </div>
                <div className="description-wrapper">
                  <p>{ channelDetails?.snippet?.description }</p>
                  <PiCaretRightLight />
                </div>
              </div>
            </div>
          </div>

          <div className="channel-videos-tab">
            <div className="video-wrapper">
              {videos?.map((videos, idx) => (<VideoCard key={idx} video={videos} flag={ false } />))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChannelScreen
