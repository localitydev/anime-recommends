import React from 'react';
import { useState } from 'react';
import Globals from "./Classes/Globals";

// Material Design components
import { 
    Grid
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// Custom Components
import Header from "./Components/Header";
import AnimeCard from "./Components/AnimeCard";


// AirTable - Free minimal databasing
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_APIKEY }).base( process.env.REACT_APP_AIRTABLE_BASE );   // Break-off these inputs to a globals file.

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

    return (
        <div>
            <Header animeList={setAnimes}  />

            <div>
                <Grid container spacing={3}>
                    {animes.map( (anime, key) =>{
                        return(
                            <Grid key={key} item xs={12} md={6}>
                                <AnimeCard anime={anime} />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </div>
    );
}
