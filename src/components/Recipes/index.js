import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './style.css'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="sm">
            <div className={classes.root}>
                <Accordion expanded={expanded === '1'} onChange={handleChange('1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>Imagem receita</Typography>
                        <Typography component="h1" className={classes.secondaryHeading}>Nome Receita</Typography>
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
                <Accordion expanded={expanded === '2'} onChange={handleChange('2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>Imagem receita</Typography>
                        <Typography component="h1" className={classes.secondaryHeading}>Nome Receita</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography m={10}>
                            Lista de ingredientes
          </Typography>
                        <Typography m={10}>
                            Modo de preparo
          </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === '3'} onChange={handleChange('3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>Imagem receita</Typography>
                        <Typography component="h1" className={classes.secondaryHeading}>Nome Receita</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography m={10}>
                            Lista de ingredientes
          </Typography>
                        <Typography m={10}>
                            Modo de preparo
          </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Container>
    );
}
