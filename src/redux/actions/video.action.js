import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUIRED, HOME_VIDEOS_SUCCESS, SELECTED_VIDEOS_REQUIRED, SELECTED_VIDEOS_SUCCESS, SELECTED_VIDEOS_FAIL, CHANNEL_DETAIL_REQUIRED, CHANNEL_DETAIL_SUCCESS, CHANNEL_DETAIL_FAIL, CHANNEL_SUBSCRIPTION_STATUS, RELATED_VIDEO_REQUIRED, RELATED_VIDEO_SUCCESS, RELATED_VIDEO_FAIL, SEARCHED_VIDEO_REQUIRED, SEARCHED_VIDEO_SUCCESS, SEARCHED_VIDEO_FAIL, CHANNEL_VIDEOS_SUCCESS, CHANNEL_VIDEOS_REQUIRED, CHANNEL_VIDEOS_FAIL } from "../actionType";
import { getPopularVideos } from "../../utils/fetchFromApi";

export const popularVideos = () => async (dispatch,getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUIRED,
    })
    console.log(getState()?.homeVideos?.nextPageToken);
    const { data } = await getPopularVideos('/videos', {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: getState()?.homeVideos?.nextPageToken,
      }
    })
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data?.items,
        nextPageToken: data?.nextPageToken,
        category: "All"
      }
    })
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message
    })
  }
}

export const getVideosByCategory = (keyword) => async (dispatch,getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUIRED,
    })
    const { data } = await getPopularVideos('/search', {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: getState()?.homeVideos?.nextPageToken,
        q: keyword,
        type: 'video'
      }
    })
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data?.items,
        nextPageToken: data?.nextPageToken,
        category: keyword
      }
    })
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message
    })
  }
}

export const getVideoDetailById = (id) => async dispatch => {
  try {
    dispatch({
      type: SELECTED_VIDEOS_REQUIRED,
    })

    const { data } = await getPopularVideos('/videos', {
      params: {
        part: 'snippet,statistics',
        id: id
      }
    })

    dispatch({
      type: SELECTED_VIDEOS_SUCCESS,
      payload: data.items[0]
    })
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SELECTED_VIDEOS_FAIL,
      payload: error.message
    })
  }
}

export const getChannelDetailById = id => async dispatch => {
  try {
    dispatch({
      type: CHANNEL_DETAIL_REQUIRED,
    })

    const { data } = await getPopularVideos('/channels', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id
      }
    })

    dispatch({
      type: CHANNEL_DETAIL_SUCCESS,
      payload: data.items[0]
    })
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: CHANNEL_DETAIL_FAIL,
      payload: error.message
    })
  }
}

export const getChannelSubscriptionStatus = id => async (dispatch,getState) => {
  try {
    dispatch({
      type: CHANNEL_DETAIL_REQUIRED,
    })

    const { data } = await getPopularVideos('/subscriptions', {
      params: {
        part: 'snippet',
        forChannelId: id,
        mine: true
      },
      headers: {
        Authorization:`Bearer ${getState().auth.accessToken}`
      }
    })

    dispatch({
      type: CHANNEL_SUBSCRIPTION_STATUS,
      payload: data.items.length !== 0
    })
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

export const getRelatedVideos = id => async (dispatch) => {
  try {
     dispatch({
        type: RELATED_VIDEO_REQUIRED,
     })

     const { data } = await getPopularVideos('/search', {
        params: {
          part: "snippet",
          channelId:id,
          maxResults: 30,
          type: 'video',
        },
     })
     dispatch({
        type: RELATED_VIDEO_SUCCESS,
        payload: data.items,
     })
  } catch (error) {
     console.log(error.response.data.message)
     dispatch({
        type: RELATED_VIDEO_FAIL,
        payload: error.response.data.message,
     })
  }
}

export const getSearchByVideos = (keyword) => async (dispatch) => {
  console.log(keyword,'keyword');
  try {
    dispatch({
      type: SEARCHED_VIDEO_REQUIRED,
    })
    const { data } = await getPopularVideos('/search', {
      params: {
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: 'video,channel'
      }
    })
    dispatch({
      type: SEARCHED_VIDEO_SUCCESS,
      payload: data?.items
    })
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SEARCHED_VIDEO_FAIL,
      payload: error.message
    })
  }
}


export const getChannelVideos = id => async (dispatch) => {
  try {
     dispatch({
        type: CHANNEL_VIDEOS_REQUIRED,
     })

    const { data: { items } } = await getPopularVideos('/channels', {
      params: {
        part: "contentDetails",
        id:id
      },
    })
    const uploadVideoId = items[0]?.contentDetails?.relatedPlaylists?.uploads;

    const { data } = await getPopularVideos('/playlistItems', {
      params: {
        part: "contentDetails,snippet",
        playlistId: uploadVideoId,
        maxResults: 30
      },
    })

     dispatch({
        type: CHANNEL_VIDEOS_SUCCESS,
        payload: data.items,
     })
  } catch (error) {
     console.log(error.response.data.message)
     dispatch({
        type: CHANNEL_VIDEOS_FAIL,
        payload: error.response.data.message,
     })
  }
}
