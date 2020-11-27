import React, { useState, Fragment } from 'react';
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

    const [currentCategory, setCurrentCategory] = useState(0)
    const [selectedMealId, setSelectedMealId] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [isSearch, setSearch] = useState(false)

    const { isLoading, error, data: categories } = useQuery(
        "categories",
        async () => {
            let result = await fetch(
                "https://www.themealdb.com/api/json/v1/1/categories.php"
            ).then(res => res.json())
            result = result.categories.map(item => {
                return {
                    key: item.idCategory,
                    text: item.strCategory,
                    value: item.idCategory,
                    image: item.strCategoryThumb,
                }
            })
            return result
        }
    )

    const { data: meals } = useQuery(
        ["meals", currentCategory, categories],
        async (key, currentCategory, data) => {
            let result = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${data[currentCategory].text}`
            ).then(res => res.json())

            return result.meals
        },
        {
            enabled: categories,
        }
    )

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
        <Container maxWidth="sm">
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
            <div className={classes.root}>
                <Accordion expanded={expanded === meal.idMeal} onChange={handleChange(meal.idMeal)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <img className="meal-photo" src={meal.strMealThumb}></img>
                        
                        <Typography component="h1" className={classes.secondaryHeading}> {meal.strMeal} </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="details">
                            <Typography>
                                Lista de ingredientes
                            </Typography>
                        </div>
                        <div className="details">
                            <Typography>
                                Modo de preparo
                        </Typography>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
                  )
                })
              ) : (
                <Fragment>
                  {meals &&
                    meals.map(meal => {
                      return (
            <div className={classes.root}>
                <Accordion expanded={expanded === meal.idMeal} onChange={handleChange(meal.idMeal)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <img className="meal-photo"  src={meal.strMealThumb}></img>
                        
                        <Typography component="h1" className={classes.secondaryHeading}> {meal.strMeal} </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="details">
                            <Typography>
                                Lista de ingredientes
                            </Typography>
                        </div>
                        <div className="details">
                            <Typography>
                                Modo de preparo
                        </Typography>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
                      )
                    })}
                </Fragment>
              )}
        </Container>
    );
}
