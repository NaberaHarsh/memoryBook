import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuItem from "@material-ui/core/MenuItem";
import PagesIcon from '@material-ui/icons/Pages';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Divider from "@material-ui/core/Divider";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CopyrightIcon from '@material-ui/icons/Copyright';
import HomeIcon from '@material-ui/icons/Home';


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 400,
    flexShrink: 0
  },
  drawerPaper: {
    width: 400
  },
  
  
});

class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      anchorEl: null,
      mobileMoreAnchorEl: null,

    }
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { mobileMoreAnchorEl } = this.state;

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const classes = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" >
          <Toolbar >
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon onClick={() => { this.showDrawer() }} variant="outline-light" />
            </IconButton>
            <Typography variant="h6" className={classes.title} style={{flex:1}}>
              Memory Book
          </Typography>
            <div style={{ alignItems: "right" }} >
              <Button edge="end" color="inherit" onClick={this.props.login} >{this.props.display}</Button>
            </div>
            {this.props.display == 'LOGIN'
            ? ""
            :
            <IconButton edge="end"  color="inherit" aria-label="menu">
              <PowerSettingsNewIcon onClick={this.props.logout} />
            </IconButton>
  }
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          classes={{
            paper: classes.drawerPaper
          }} anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.visible}
          onClose={this.onClose}
        >
          <MenuItem>
            <span style={{ textAlign: "center", paddingLeft: "20px", paddingRight: '20px', fontSize: "20px", backgroundColor: 'primary' }}> Memory Dashboard</span>
          </MenuItem>
          <Divider />

          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>

          <MenuItem style={{ paddingTop: '20px' }} onClick={this.onClose}>
              <HomeIcon />

              <span style={{ fontSize: "18px", paddingLeft: '20px' }}>Home </span>

            </MenuItem>
            </Link>

          <Link to="/frontPage" style={{ textDecoration: 'none', color: 'black' }}>

            <MenuItem  onClick={this.onClose}>
              <PagesIcon />

              <span style={{ fontSize: "18px", paddingLeft: '20px' }}>Front Page</span>

            </MenuItem>
          </Link>

          <Link to="/content" style={{ textDecoration: 'none', color: 'black' }}>
            <MenuItem onClick={this.onClose} >
              <MenuBookIcon />
              <span style={{ fontSize: "18px", paddingLeft: '20px' }}>Contents</span>
            </MenuItem>
          </Link>
          <div style={{flex: 1,  flexDirection: 'column',justifyContent: 'space-between'}}></div>
          <Divider />
          <MenuItem >
              <CopyrightIcon />
              <span style={{ fontSize: "18px", paddingLeft: '0px' }}>harshnabera</span>
            </MenuItem>

        </SwipeableDrawer>

      </div>
    );
  }
}

export default withStyles(styles)(Appbar);