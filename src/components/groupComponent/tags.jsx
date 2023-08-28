import React from 'react'

const Tags = ({sendDataToParent, Category}) => {

  const video_categories = [
    "All",
    "Thalapathy",
    "Tamil Cinema",
    "Madan Gowri",
    "Music",
    "Education",
    "Entertainment",
    "Sports",
    "Gaming",
    "Technology",
    "Travel",
    "Food",
    "Fashion",
    "Health",
    "DIY",
    "Comedy",
    "Animals",
    "News",
    "Science",
    "Movies",
    "TV Shows",
    "Documentaries",
    "Fitness",
    "Cooking",
    "Vlogs",
    "Art",
    "Beauty",
    "History",
    "Business",
    "Reviews",
    "Politics",
    "Family",
    "Lifestyle",
    "Adventure",
    "Photography",
    "Crafts",
    "Cars",
    "Motivation",
    "Spirituality",
    "Nature",
    "Dance",
    "Challenge",
    "Pranks",
    "Productivity",
    "Fashion",
    "Inspiration",
    "Tech Reviews",
    "Exploration",
    "Interviews",
    "Travel Guides",
    "Gardening",
    "Parenting",
    "Finance",
    "Science Fiction",
    "Horror",
    "Romance",
    "Thriller",
    "Fantasy",
    "Western",
    "Anime",
    "Cartoons",
    "Web Series",
    "Tutorials",
    "How-to",
    "Unboxing",
    "Music Covers",
    "Guitar Lessons",
    "Singing Lessons"
  ];

  const sendDataToParentComponent = (data) => {
    sendDataToParent(data);
  };

  return (
    <div className="tags-container">
      {video_categories.map((x,idx) => {
        return <div key={idx} className={`badge cursor-pointer ${Category === x ? 'active' : ''}`} onClick={()=>sendDataToParentComponent(x)}>
          <span>{ x }</span>
        </div>

      })}
    </div>
  )
}

export default Tags;
