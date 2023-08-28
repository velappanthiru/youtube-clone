import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelDetailById, getChannelSubscriptionStatus } from '../../redux/actions/video.action';
import numeral from 'numeral';

const SearchChannelCard = ({ data }) => {

  const { snippet: { channelId } } = data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelDetailById(channelId))
    dispatch(getChannelSubscriptionStatus(channelId))
  }, [dispatch, channelId])

  const { snippet: channelSnippet, statistics: channelStatistics } = useSelector(state => state?.channelDetails?.channel);

  const subscriptionStatus = useSelector(state => state?.channelDetails?.subscriptionStatus);

  return (
    <div className='channel-card'>
       <div className="channel-logo-wrapper">
          <img src={channelSnippet?.thumbnails?.medium?.url} className='img-fluid' alt="logo" />
        </div>
      <div className="channel-content-wrapper">
        <div className="channel-content">
          <div className="channel-name-wrapper">
            <h3>{ channelSnippet?.title }</h3>
          </div>
          <div className="metaData">
            <span className='channel-yt-clone-user-id'>{ channelSnippet?.customUrl }</span>
            <span className='d-none d-sm-block'>•</span>
            <span className='channel-subscribers-count'>{ numeral(channelStatistics?.subscriberCount).format('0.a') } subscribers</span>
          </div>
          <p>{ channelSnippet?.description }</p>
        </div>
        <div className="subscription-button">
          <button className={`subscribe-btn ${subscriptionStatus ? 'subscribed' : 'subscribe'}`} >
            <span>{ subscriptionStatus ? 'Subscribed' : 'Subscribe'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchChannelCard
