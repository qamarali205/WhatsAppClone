import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setFieldToNull } from '../../Redux/Empty/Action';
import { LOGIN, REGISTER, REQ_USER } from '../../Redux/Auth/ActionType';
import { useNavigate } from 'react-router-dom';

const DropDown=()=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };
const handleLogout=()=>{
    localStorage.removeItem("token");
    dispatch(setFieldToNull(REGISTER));
    dispatch(setFieldToNull(LOGIN));
    dispatch(setFieldToNull(REQ_USER));
    handleClose();
    navigate("/login")
    console.log("logout --------------- ")
}
  return (
    <div>
        <BsThreeDotsVertical className='cursor-pointer' onClick={handleClick} aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}/>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default DropDown;