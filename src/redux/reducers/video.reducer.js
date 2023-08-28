import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUIRED, HOME_VIDEOS_SUCCESS, SELECTED_VIDEOS_SUCCESS, SELECTED_VIDEOS_REQUIRED, SELECTED_VIDEOS_FAIL, RELATED_VIDEO_REQUIRED, RELATED_VIDEO_SUCCESS, SEARCHED_VIDEO_REQUIRED, SEARCHED_VIDEO_SUCCESS, SEARCHED_VIDEO_FAIL, CHANNEL_VIDEOS_REQUIRED, CHANNEL_VIDEOS_SUCCESS, CHANNEL_DETAIL_FAIL } from "../actionType";

export const homeVideosReducer = (state = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: 'All'
},
  action) => {
  const { type, payload } = action;
  switch (type) {
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: state.activeCategory === payload.category ? [...state.videos,...payload.videos]:payload.videos,
        loading: false,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category
      };
    case HOME_VIDEOS_REQUIRED:
      return {
        ...state,
        loading: true
      };
    case HOME_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
}

export const selectedVideoReducer = (
  state = {
  loading: false,
  video: null
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case SELECTED_VIDEOS_REQUIRED:
      return {
        ...state,
        loading: true
      }

    case SELECTED_VIDEOS_SUCCESS:
      return {
        ...state,
        video: payload,
        loading: false
      }

    case SELECTED_VIDEOS_FAIL:
      return {
        ...state,
        video: null,
        loading: false,
        error: payload
      }

    default:
      return state;
  }
}

export const relatedVideoReducer = (
  state = {
  loading: false,
  videos: []
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case RELATED_VIDEO_REQUIRED:
      return {
        ...state,
        loading: true
      }

    case RELATED_VIDEO_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false
      }

    case SELECTED_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }

    default:
      return state;
  }
}

export const searchVideoReducer = (
  state = {
  loading: false,
  videos: []
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case SEARCHED_VIDEO_REQUIRED:
      return {
        ...state,
        loading: true
      }

    case SEARCHED_VIDEO_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false
      }

    case SEARCHED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }

    default:
      return state;
  }
}


export const channelVideoReducer = (
  state = {
  loading: false,
  videos: []
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case CHANNEL_VIDEOS_REQUIRED:
      return {
        ...state,
        loading: true
      }

    case CHANNEL_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false
      }

    case CHANNEL_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }

    default:
      return state;
  }
}
