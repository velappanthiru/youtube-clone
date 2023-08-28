import React, { useState } from 'react'
import { sideBarData } from '../../static/sidebar-data';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/auth.action';

const Sidebar = () => {
  const currentYear = new Date().getFullYear();
  const [active, setActive] = useState('Home');

  const handleActiveFun = (item) => {
    setActive(item);
  }
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logOut());
  }

  return (
    <div className='sidebar'>
      <div className="sidebar-menu-wrapper">
        <div className="menu-items-wrapper">
          {sideBarData.Top.map((items,i) => {
            return  <div className={`menu-item ${active === items?.name ? 'active' : ''}`} key={i} onClick={()=>handleActiveFun(items?.name)}>
              { items?.icon }
              <p>{ items?.name }</p>
            </div>
          })}
        </div>
      </div>

      <div className="sidebar-menu-wrapper">
        <div className="menu-items-wrapper">
          {sideBarData.Middle.map((items,i) => {
            return  <div className={`menu-item ${active === items?.name ? 'active' : ''}`} key={i} onClick={()=>handleActiveFun(items?.name)}>
              { items?.icon }
              <p>{ items?.name }</p>
            </div>
          })}
        </div>
      </div>

      <div className="sidebar-menu-wrapper">
        <div className="menu-header">
          <h5>Explore</h5>
        </div>
        <div className="menu-items-wrapper">
          {sideBarData.End.map((items,i) => {
            return  <div className={`menu-item ${active === items?.name ? 'active' : ''}`} key={i} onClick={()=>handleActiveFun(items?.name)}>
              { items?.icon }
              <p>{ items?.name }</p>
            </div>
          })}
        </div>
      </div>

      <div className="sidebar-menu-wrapper">
        <div className="menu-header">
          <h5>More from Youtube</h5>
        </div>
        <div className="menu-items-wrapper">
          <div className="menu-item">
            <YouTubeIcon style={{color:"#ff0000"}} />
            <p>Youtube Premium</p>
          </div>
          <div className="menu-item">
            <YouTubeIcon style={{color:"#ff0000"}} />
            <p>Youtube Music</p>
          </div>
          <div className="menu-item">
            <YouTubeIcon style={{color:"#ff0000"}} />
            <p>Youtube Kids</p>
          </div>
        </div>
      </div>
      <div className="sidebar-menu-wrapper">
        <div className="menu-items-wrapper">
          <div className="menu-item">
            <SettingsOutlinedIcon />
            <p>Settings</p>
          </div>
          <div className="menu-item">
            <FlagOutlinedIcon />
            <p>Report History</p>
          </div>
          <div className="menu-item">
            <HelpOutlineOutlinedIcon />
            <p>Help</p>
          </div>
          <div className="menu-item">
            <FeedbackOutlinedIcon />
            <p>Send feedback</p>
          </div>
          <div className="menu-item" onClick={handleClick}>
            <LogoutIcon />
            <p>Log Out</p>
          </div>
        </div>
      </div>
      <div className="copyright-wrapper">
        <p>About Press Copyright Contact us Creator Advertise Developers</p>
        <p>Terms PrivacyPolicy & Safety How YouTube worksTest new features</p>
        <p className="copyright-text">© {currentYear} Google LLC</p>
      </div>
    </div>
  )
}

export default Sidebar;
