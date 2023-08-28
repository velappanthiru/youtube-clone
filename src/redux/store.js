import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/auth.reducer';
import { channelVideoReducer, homeVideosReducer } from './reducers/video.reducer';
import { selectedVideoReducer,relatedVideoReducer, searchVideoReducer } from './reducers/video.reducer';
import { channelDetailsReducer } from './reducers/channel.reducer';
import { commentListReducer } from './reducers/comment.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideo: relatedVideoReducer,
  searchVideo: searchVideoReducer,
  channelVideo: channelVideoReducer
})
const store = createStore(rootReducer,{},composeWithDevTools(applyMiddleware(thunk)));

export default store;
