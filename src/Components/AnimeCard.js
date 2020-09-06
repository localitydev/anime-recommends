import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// MATERIAL ICONS
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

// IMPORTING Airtable functionality
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_APIKEY }).base( process.env.REACT_APP_AIRTABLE_BASE );

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    }
  },
  details: {
    flexBasis: '70%'
  },
  content: {
  },
  cover: {
    flexBasis: '30%'
  },
  coverImg: {
    width: 'auto',
    maxWidth: '100%'
  },
  controls: {
    alignItems: 'center',
    padding: theme.spacing(0,2,2),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  recommendProgress: {
    position: "relative",
    top: "6px",
    left: "10px",
  }
}));

export default function AnimeCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const timer = React.useRef();

  const addToRecommends = (anime) => {
    console.log("Add to recommendations.", anime);

    // LIST Records
    var records = base( process.env.REACT_APP_AIRTABLE_TABLE ).select({
      filterByFormula: `{mal_id} = ${anime.mal_id}`
    }).all( function(err, records){
      console.log("Records:", records);

      // If nothing was found, Add the record.
      if(records.length === 0){
        base( process.env.REACT_APP_AIRTABLE_TABLE ).create([
          {
            "fields": {
              "airing"     : anime.airing,
              "end_date"   : anime.end_date,
              "episodes"   : anime.episodes,
              "image_url"  : anime.image_url,
              "mal_id"     : anime.mal_id,
              "rated"      : anime.rated,
              "score"      : anime.score,
              "start_date" : anime.start_date,
              "synopsis"   : anime.synopsis,
              "title"      : anime.title,
              "type"       : anime.type,
              "url"        : anime.url
            }
          }
        ], function(err, records) {
          if (err) {
            console.error("Error adding anime to list", err);
            return;
          }
          records.forEach(function (record) {
            console.log("Record successfully added to the list:", record.getId());
          });
        });
      }
    } );
    // console.log("Records:", records);

    // Find this anime in AIRTABLE
    // base('MAL Recommends').find( anime.mal_id, function(err, record){
      
    //   /**
    //    * [IF an ERROR comes back from AIRTABLE add the anime to the list]
    //    */
    //   if (err) { 
        
    

    //     return;
    //   }

    //   // If there is no error, that means a record is found. No further action is necessary
    //   console.log('Retrieved:', record);
    // });

    // Change Button to loading
    setLoading(true);
    timer.current = setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      console.log(success);
      timer.current = setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }, 2000);
    



    // Check IF $mal_id is already recommended
      // IF false
        // Add Anime recommendation
        // return "Recommended";
      // ELSE Add name to recommends this Anime
        // return "Recommended";
  }

  return (
    <Card className={classes.root}>
      <div className={classes.cover}>
        <CardMedia
          className={classes.coverImg}
          component="img"
          image={props.anime.image_url}
          title=""
        />
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.anime.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Episodes: {props.anime.episodes}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Type: {props.anime.type}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Score: {props.anime.score}
          </Typography>
          <hr/>
          <Typography component="p">{props.anime.synopsis}</Typography>
          <Typography component="p"><a href={props.anime.url} target="_blank" rel="noopener noreferrer">Learn more</a></Typography>
          <hr />
        </CardContent>
        
        <div className={classes.controls}>
          {!props.isRecommended && 
            <Button variant="contained" disabled={loading} color="primary" onClick={(e) => {addToRecommends(props.anime)}}>
              Recommend Anime
            </Button>
          }
          {loading && <CircularProgress size={20} className={classes.recommendProgress} />}
          {success && <ThumbUpIcon />}
        </div>
      </div>
    </Card>
  );
}