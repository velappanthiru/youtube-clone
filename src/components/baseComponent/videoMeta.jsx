import React, { useState, useEffect } from 'react'
import { BiLike, BiDislike } from 'react-icons/bi';
import { PiShareFat } from 'react-icons/pi';
import { BsThreeDots } from 'react-icons/bs';
import { GoVideo } from 'react-icons/go';
import { PiUserSquareThin } from 'react-icons/pi';
import numeral from 'numeral';
import moment from 'moment';
import Comments from '../groupComponent/comments';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelDetailById } from '../../redux/actions/video.action';
import { getChannelSubscriptionStatus } from '../../redux/actions/video.action';
import { useNavigate } from 'react-router-dom';

const VideoMeta = ({ video: { snippet, statistics }, id,videoId }) => {

  const { title, description, channelId, publishedAt } = snippet;
  const { likeCount, viewCount } = statistics;

  const [more, setMore] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  useEffect(() => {
    dispatch(getChannelDetailById(channelId))
    dispatch(getChannelSubscriptionStatus(channelId))
  }, [dispatch, channelId]);

  const { snippet: channelSnippet, statistics: channelStatistics } = useSelector(state => state?.channelDetails?.channel);

  const subscriptionStatus = useSelector(state => state?.channelDetails?.subscriptionStatus);

  const handleChannelClick = () => {
    navigate(`/channel/${channelId}`)
  }

  const expandDescription = () => {
    if (more) {
      setMore(false);
    } else {
      setMore(true);
    }
  }

  return (
    <div className='video-description'>
      <h1>{ title }</h1>
      <div className="channel-info-wrapper">
        <div className="owner-wrapper">
          <div className="channel-wrapper">
            <div className="channel-logo" onClick={handleChannelClick}>
              <img src={channelSnippet?.thumbnails?.medium?.url} alt="icon" />
            </div>
            <div className="channel-name-wrapper">
              <div className='channel-name' onClick={handleChannelClick}>
                <h6>{ channelSnippet?.title }</h6>
              </div>
              <span>{ numeral(channelStatistics?.subscriberCount).format('0.a') } subscribers</span>
            </div>
          </div>
          <button className={`subscribe-btn ${subscriptionStatus ? 'subscribed' : 'subscribe'}`} >
            <span>{ subscriptionStatus ? 'Subscribed' : 'Subscribe'}</span>
          </button>
        </div>
        <div className="action-button-wrapper">
          <div className="inner-action-button-wrapper">
            <div className="like-btn-wrapper">
              <div className="btn-like like-wrapper">
                <BiLike />
                <span>{ numeral(likeCount).format('0.a') }</span>
              </div>
              <div className="line"></div>
              <div className="btn-like dis-like-wrapper">
                <BiDislike />
                <span>{''}</span>
              </div>
            </div>
            <div className="btn-action">
              <PiShareFat />
              <span>Share</span>
            </div>
            <div className="more-btn">
              <BsThreeDots />
            </div>
          </div>
        </div>
      </div>
      <div className="video-desc">
        <div className="video-info">
          <span>{numeral(viewCount).format('0.a')} Views</span>
          <span>{ moment(publishedAt).fromNow() }</span>
        </div>
        <div className="desc-wrapper">
          <p className={`${!more ? "lineBreak" : ''}`}>{ description }</p><span onClick={expandDescription}>{ more ? 'Show Less' :
          'Show More'}</span>
        </div>

      </div>
      {
        more &&
        <div className="channel-details-wrapper">
          <div className="channel-name-wrapper" onClick={handleChannelClick}>
            <div className="channel-logo">
              <img src={channelSnippet?.thumbnails?.medium?.url} alt="logo" />
            </div>
            <div className="channel-name">
              <p className="name">{ channelSnippet?.title }</p>
              <p className='subscribers_count'>{ numeral(channelStatistics?.subscriberCount).format('0.a') } Subscribers</p>
            </div>
          </div>
          <div className="action-button-wrapper" onClick={handleChannelClick}>
            <button>
              <GoVideo />
              <span>Video</span>
            </button>
            <button>
              <PiUserSquareThin />
              <span>About</span>
            </button>
          </div>
        </div>
      }

      {
        windowWidth > 1199 && <Comments videoId={ videoId } />
      }
    </div>
  )
}

export default VideoMeta;
