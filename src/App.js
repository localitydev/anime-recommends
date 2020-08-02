import React from 'react';
import { useState } from 'react';

// Material Design components
import { 
    Container,
    Grid,
    Paper
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";


// Custom Components
import Header from "./Components/Header";
import AnimeCard from "./Components/AnimeCard";

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
                            <Grid item xs={12} md={6}>
                                <AnimeCard anime={anime} />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </div>
    );
}
