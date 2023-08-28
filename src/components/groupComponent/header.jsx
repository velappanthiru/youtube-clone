import React, { useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = ({ searchInput }) => {
  const [search, setSearch] = useState(searchInput ? searchInput : '');

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search/${search}`)
  }

  const profile = JSON.parse(sessionStorage.getItem('ytc-user'));

  return (
    <header>
      <nav className="navbar">
        <div className="container-fluid">
          <Link to="/" className="logo-wrapper">
            <MenuIcon style={{ cursor: 'pointer', color: '#000' }} />
            <h6 className='mb-0'>N a Y</h6>
            <YouTubeIcon style={{color:'#f00', fontSize:40}} />
          </Link>
          <div className="global-search__wrapper">
            <input type="text" name="search" id="global_search" onChange={e => setSearch(e.target.value)} placeholder="Search" value={search}/>
            <div className="global-search__icon" onClick={handleClick}>
              <SearchOutlinedIcon />
            </div>
          </div>
          <div className="profile-wrapper">
            <div className="icons">
              <VideoCallOutlinedIcon style={{fontSize:26}} />
            </div>
            <div className="icons">
              <Badge badgeContent={0} color="primary">
                <NotificationsNoneOutlinedIcon style={{fontSize:26}} />
              </Badge>
            </div>
            <Avatar sx={{ bgcolor: deepPurple[500], width: 40, height: 40 }}
             src={profile?.photoURL}
            ></Avatar>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
