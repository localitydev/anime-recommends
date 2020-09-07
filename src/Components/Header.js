import React from 'react';
import { useState } from 'react';

// AXIOS AJAX
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

// IMPORTING Airtable functionality
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_APIKEY }).base( process.env.REACT_APP_AIRTABLE_BASE );

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    marginBottom: 20
  },
  headerProg: {
    color:"white"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1.4, 1, 0, 1),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  submit: {
    padding: theme.spacing(1, 2),
    color: "#fff",
    backgroundColor: "#BADA55",
    float: "right",
  },
  show: {
    display: "block"
  },
  hide: {
    display: "none"
  }
}));

const StyledProgress = withStyles({
  colorPrimary: {
    color: "#BADA55"
  }
})(CircularProgress);

export default function Header(props) {
  const classes = useStyles();

  // Hook state for search TEXT
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);

  // Search function for submitting.
  // When searching for an anime. Set isRecommended to false
  const onSearch = () => {
    // console.log("Begin Searching...");
    setSearching(true);
    props.isViewingRecommendations(false);

    // console.log("Searching for:", searchText);

    // Query GET Jikan API for anime search
    axios.get("https://api.jikan.moe/v3/search/anime?q="+searchText)
      .then(function (response){
        // console.log("Response from API:", response);
        props.setAnimes(response.data.results);       // [setAnime] to the Data Results from Jikan API
      })
      .catch(function (error){
        // console.log("An error has occured.", error);  // IF there is an ERROR, tell me about it.
      })
      .finally(function(){
        // console.log("Getting Anime search completed."); // If there is anything I need to do once the AJAX call is completed
        setSearching(false);
      });
  }

  // On Input change set Search Text Variable
  const onInputText = (event) => {
    // console.log("onCHANGE - Text Input value:", event.target.value);
    setSearchText(event.target.value);
  }

  // View saved recommendations
  // When viewing recommendations set isRecommended to true
  const listRecommendations = function(){
    // SET isRecommended to true
    props.isViewingRecommendations(true);

    // GET RECOMMENDATIONS FROM AIRTABLE
    base(process.env.REACT_APP_AIRTABLE_TABLE).select({
      view: "Grid view"
    }).all(function( err, records ){
      // if(err){console.log("Error:", err); return;}
      // console.log("Recommendation's List:", records);
      const animes = records.map(record => {return record.fields});
      props.setAnimes(animes);

    });
  }


// Returning HEADER component
  return (
    <AppBar className={classes.header} position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          VeenaViera - Recommend Animes
        </Typography>

        <Button color="inherit" onClick={(e) => {listRecommendations()}}>
          View Recommendations
        </Button>

        <StyledProgress className={ searching ? classes.show : classes.hide } />
        <div className={classes.search}>
          <InputBase
            placeholder="Search animes..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => onInputText(e)}
            onKeyDown={(e) => e.keyCode === 13 && e.target.value.length > 2 ? onSearch() : null }
          />
          <Button variant="contained" className={classes.submit} onClick={(e) => {onSearch()}}>GO</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}