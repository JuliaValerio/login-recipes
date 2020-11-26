import React from 'react'
import { Toolbar, AppBar, Button, Typography, Avatar, CircularProgress } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'
import Recipes from '../Recipes'
import "./style.css"

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.primary.main,
	},

	submit: {
		margin: theme.spacing.unit,
		transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
		background:
		  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		  'linear-gradient(to right, #74ebd5, #ACB6E5 )',
		'&:hover': {
		  transform: 'scale(1.1)',}
	},
});

function Dashboard(props) {
	const { classes } = props

	if (!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
	}

	// const [quote, setQuote] = useState('')

	// useEffect(() => {
	// 	firebase.getCurrentUserQuote().then(setQuote)
	// })

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={classes.nav}> 
					<Avatar className={classes.avatar}>
						<VerifiedUserOutlined />
					</Avatar>
					<Typography className={classes.title} component="h1" variant="h4">
						Hello {firebase.getCurrentUsername()}
					</Typography>
					<Button
						size="large"
						type="submit"
						variant="contained"
						color="secondary"
						onClick={logout}
						className={classes.submit}>
						Logout
          		</Button>
				</Toolbar>
			</AppBar>
			<div className="container-list">
			<Typography component="h1" variant="h3">
			<FontAwesomeIcon icon={faCoffee} /> Recipes 
			</Typography>
			</div>
			<div>
			{<Recipes /> ? <Recipes /> : <CircularProgress size={35} />}
			</div>
		</div>
	);
	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(Dashboard))