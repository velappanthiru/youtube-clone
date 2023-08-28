import React, { useEffect } from 'react'
import Header from '../components/groupComponent/header';
import VideoMeta from '../components/baseComponent/videoMeta';
import ReactPlayer from 'react-player/lazy'
import RecommendedVideos from '../components/groupComponent/recommendedVideos';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoDetailById, getRelatedVideos } from '../redux/actions/video.action';

const WatchScreen = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoDetailById(id))
    // dispatch(getRelatedVideos(id))
  }, [dispatch, id])

  const { video } = useSelector(state => state.selectVideo);

  const channelId = video?.snippet?.channelId;

  useEffect(() => {
    dispatch(getRelatedVideos(channelId))
  }, [dispatch,channelId])

  const { videos } = useSelector(state => state.relatedVideo);

  if (video === undefined || video === null) {
    // Handle the loading state
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Header />
      <div className="watch-screen-wrapper">
        <div className="watchScreen-primary-section">
          <div className="yt-video-wrapper">
            <div className="yt-clone-video-player">
              <ReactPlayer
                url={`https://www.youtube.com/embed/${id}?mute=1&playlist=${id}`}
                className='react-player'
                width='100%'
                height='100%'
                playing={true}
                controls={true}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 }
                  }
                }}
              />
            </div>
            <VideoMeta video={video} videoId={ id } />
          </div>
        </div>
        <div className="watchScreen-secondary-section">
          <RecommendedVideos videos={videos}/>
        </div>
      </div>
    </section>
  )
}

export default WatchScreen
