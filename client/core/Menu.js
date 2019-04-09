import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import {Link, withRouter} from 'react-router-dom'

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#bef67a'}
  else
    return {color: '#ffffff'}
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return {color: '#bef67a'}
  else
    return {color: '#ffffff'}
}
const Menu = withRouter(({history}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography type="h6" color="inherit">
      پروژه تست PINOVA  
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon/>
          </IconButton>
        </Link>
      </div>
    </Toolbar>
  </AppBar>
))

export default Menu
