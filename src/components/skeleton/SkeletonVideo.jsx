import React from 'react'
import ContentLoader from 'react-content-loader'

const SkeletonVideo = () => {
  return (
    <div className="w-100">
      <ContentLoader viewBox="0 0 300 330" width="100%" height="100%">
        <rect x="0" y="0" rx="12" ry="12" width="100%" height="180" />
        <rect x="50" y="200" rx="5" ry="5" width="75%" height="20" />
        <rect x="50" y="230" rx="5" ry="5" width="65%" height="20" />
        <circle  cx="20" cy="225" r="20" />
      </ContentLoader>

    </div>

  )
}

export default SkeletonVideo;
