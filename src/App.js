import React from 'react';

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

    return (
        <div>
            <Header  />

            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <AnimeCard url="https://cdn.myanimelist.net/images/anime/13/17405.jpg?s=59241469eb470604a792add6fbe7cce6"/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <AnimeCard url="https://cdn.myanimelist.net/images/anime/5/17407.jpg?s=2bf24a22a339223dcadb1cdfc3307b61"/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <AnimeCard url="https://cdn.myanimelist.net/images/anime/10/67631.jpg?s=d84468711f6c7b6c122e4822fb4ab805" />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
