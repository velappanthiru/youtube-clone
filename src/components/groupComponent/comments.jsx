import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { MdSort } from "react-icons/md";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BiLike,BiDislike } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { getCommentVideoById, addCommentByYtClone } from '../../redux/actions/comment.action';
import moment from 'moment';
import numeral from 'numeral';

const Comments = ({ videoId }) => {

  const [addComment, setAddComment] = useState(false);

  const [comment, setComment] = useState('');

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  const dispatch = useDispatch();


  const enableAddCommentButtons = (popupStatus) => {
    if (popupStatus === 'open') {
      setAddComment(true);
    } else {
      setAddComment(false);
    }
  }

  const enableAddCommentButton = (event) => {
    setComment(event.target.value);
  }

  const addCommentHandle = () => {
    if (comment.length === 0) {
      return;
    }
    dispatch(addCommentByYtClone(videoId,comment))
  }


  useEffect(() => {
    dispatch(getCommentVideoById(videoId));
  }, [dispatch, videoId])

  const comments = useSelector(state => state.commentList.comments);

  const _comments = comments?.map(comment => comment?.snippet?.topLevelComment?.snippet);

  return (
    <div className='yt-video-comments-section'>
      <div className="yt-video-comments-header">
        <p className='no_of_comments'>7 Comments</p>
        <div className="sortBy">
          <MdSort />
          <span>Sort by</span>
        </div>
      </div>
      <div className="yt-add-comment-wrapper">
        <Avatar sx={{ width: 40, height: 40 }} {...stringAvatar('Kent Dodds')} />
        <div className="comment-input-wrapper">
          <input type="text" name='comment' id='comment' onClick={()=>enableAddCommentButtons('open')} onChange={enableAddCommentButton} className='comment-input' placeholder='Add a comment...' />
          {
            addComment && <div className="comment-button-wrapper">
              <button onClick={()=>enableAddCommentButtons('close')}>Cancel</button>
              <button className={`${comment.length > 0 ? 'enabled' : 'disabled'}`} onClick={addCommentHandle}>Comment</button>
            </div>
          }
        </div>
      </div>
      <div className="comments-wrapper">
        {
          _comments?.map((item, idx) => (
            <div className="yt-clone-users-comment" key={idx}>
              <div className="yt-clone-users-thumbnail">
                <Avatar alt={ item?.authorDisplayName } src={item?.authorProfileImageUrl} />
              </div>
              <div className="comment-main-wrapper">
                <div className="yt-clone-users-main-cmd-wrapper">
                  <div className="author-name-wrapper">
                    <h6>{ item?.authorDisplayName }</h6>
                    <span className='commented-date'>{ moment(item?.publishedAt).fromNow() }</span>
                  </div>
                  <p>
                    { item?.textDisplay }
                  </p>
                  <div className="comment-action-wrapper">
                    <div className="like-wrapper">
                      <div className="like">
                        <BiLike />
                        <span>{ numeral(item?.likeCount).format('0.a') }</span>
                      </div>
                      <div className="like">
                        <BiDislike />
                        <span></span>
                      </div>
                    </div>
                    <button className="btn-reply">Reply</button>
                  </div>
                </div>
                <div className="yt-clone-three-dot-icon">
                  <PiDotsThreeVerticalBold />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Comments
