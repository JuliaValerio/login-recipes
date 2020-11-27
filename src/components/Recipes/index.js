import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from "react-query"
import { Container, Accordion, AccordionDetails, AccordionSummary, Typography, Input, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './style.css'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '10px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(10),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(20),
        color: theme.palette.text.secondary,
    },
}));

export default function Recipes() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [searchTerm, setSearchTerm] = useState("")
    const [isSearch, setSearch] = useState(false)

    const { data: searchResults } = useQuery(
        ["searchMeals", isSearch, searchTerm],
        async (key, isSearch, searchTerm) => {
            if (isSearch) {
                let result = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
                ).then(res => res.json())
                console.log("result", result)
                return result.meals
            } else {
                return []
            }
        }
    )

    const onSearch = () => {
        setSearch(true)
    }

    const onSearchChange = e => {
        setSearchTerm(e.target.value)
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container className="container" maxWidth="sm">
            <div className="search">
                <Input
                    className="search-input"
                    size="large"
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Search Meal"
                />
                <Button onClick={onSearch} secondary>
                    Search
            </Button>
            </div>

            {searchTerm && isSearch ? (
                searchResults &&
                searchResults.map(meal => {
                    return (
                        <div key={meal.idMeal} className={classes.root}>
                            <Accordion expanded={expanded === meal.idMeal} onChange={handleChange(meal.idMeal)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <img className="meal-photo" src={meal.strMealThumb} alt="Food"></img>

                                    <Typography component="h1" className={classes.secondaryHeading}> {meal.strMeal} </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="details">
                                        <Typography className="title">
                                        Ingredients: 
                                        </Typography>
                                        <ul>
                                            <li>{meal.strMeasure1}  {meal.strIngredient1}</li>
                                            <li>{meal.strMeasure2}  {meal.strIngredient2}</li>
                                            <li>{meal.strMeasure3}  {meal.strIngredient3}</li>
                                            <li>{meal.strMeasure4}  {meal.strIngredient4}</li>
                                            <li>{meal.strMeasure5}  {meal.strIngredient5}</li>
                                            <li>{meal.strMeasure6}  {meal.strIngredient6}</li>
                                            <li>{meal.strMeasure7}  {meal.strIngredient7}</li>
                                            <li>{meal.strMeasure8}  {meal.strIngredient8}</li>
                                            <li>{meal.strMeasure9}  {meal.strIngredient9}</li>
                                            <li>{meal.strMeasure10}  {meal.strIngredient10}</li>
                                            <li>{meal.strMeasure11}  {meal.strIngredient11}</li>
                                            <li>{meal.strMeasure12}  {meal.strIngredient12}</li>
                                            <li>{meal.strMeasure13}  {meal.strIngredient13}</li>
                                            <li>{meal.strMeasure14}  {meal.strIngredient14}</li>
                                            <li>{meal.strMeasure15}  {meal.strIngredient15}</li>
                                            <li>{meal.strMeasure16}  {meal.strIngredient16}</li>
                                            <li>{meal.strMeasure17}  {meal.strIngredient17}</li>
                                            <li>{meal.strMeasure18}  {meal.strIngredient18}</li>
                                            <li>{meal.strMeasure19}  {meal.strIngredient19}</li>
                                            <li>{meal.strMeasure20}  {meal.strIngredient20}</li>
                                        </ul>
                                    </div>
                                    <div className="details">
                                    <Typography className="title">
                                    Preparation instructions: 
                                        </Typography>
                                        {meal.strInstructions}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    )
                })
            ) : (
                    <Typography>
                        Do research to get started !
                    </Typography>
                )}
        </Container>
    );
}
