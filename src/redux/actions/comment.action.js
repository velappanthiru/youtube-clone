import { getPopularVideos } from "../../utils/fetchFromApi";
import { COMMENT_LIST_FAIL, COMMENT_LIST_REQUIRED, COMMENT_LIST_SUCCESS, CREATE_COMMENT_FAIL, CREATE_COMMENT_SUCCESS } from "../actionType";

export const getCommentVideoById = id => async dispatch => {
  try {
    dispatch({
      type: COMMENT_LIST_REQUIRED,
    })

    const { data } = await getPopularVideos('/commentThreads', {
      params: {
        part: 'snippet',
        maxResults: 100,
        videoId: id
      }
    })

    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data.items,
    })
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload: error.message
    })
  }
}


export const addCommentByYtClone = (id,text) => async (dispatch,getState) => {
  try {

    const accessToken = getState().auth.accessToken;
    console.log('accessToken',accessToken);
    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    }

    await getPopularVideos.post('/commentThreads',obj, {
      params: {
        part: 'snippet',
      },
      headers: {
        Authorization:`Bearer ${accessToken}`
      },
    })

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    })
    setTimeout(() => {
      dispatch(getCommentVideoById(id))
    }, 3000);
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.message
    })
  }
}
