import React from 'react';
import { useState } from 'react';

// Material Design components
import { 
  Grid
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// Custom Components
import Header from "./Components/Header";
import AnimeCard from "./Components/AnimeCard";

/**
 * Card with Collapse functionality
 * - Test quality of life functionality after core functionality if built
 */
// import AnimeCollapseCard from "./Components/AnimeCollapseCard";

// Styles
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
  }
}));

export default function App() {
  const classes = useStyles();

  const [animes, setAnimes] = useState([]);
  const [viewingRecommendations, setViewingRecommendations] = useState(false);

  return (
    <div>
      <Header setAnimes={setAnimes} isViewingRecommendations={setViewingRecommendations}  />

      <div>
        <Grid container spacing={3}>
          {animes.map( (anime, key) =>{
            return(
              <Grid key={key} item xs={12} md={6}>
                <AnimeCard anime={anime} showRecommendButton={!viewingRecommendations} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </div>
  );
}
