import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

// MATERIAL ICONS
import AddToQueueOutlinedIcon from '@material-ui/icons/AddToQueueOutlined';

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
}));

const addToRecommends = (anime) => {
  console.log("Add to recommendations.", anime);

  // Check IF $mal_id is already recommended
    // IF false
      // Add Anime recommendation with name of person who recommended
    // ELSE Add name to recommends this Anime
}

export default function AnimeCard(props) {
  const classes = useStyles();
  const theme = useTheme();

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
          <IconButton aria-label="Add to recommendations" onClick={(e) => {addToRecommends(props.anime)}}>
            <AddToQueueOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}