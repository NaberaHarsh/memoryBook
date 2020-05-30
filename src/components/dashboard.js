import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Dashboard extends React.Component {
    constructor(props) {
        super();

    }
    render() {
        return (
<div>
    <br/>
    <br/>
    <br/>
    <br/>
    <Container >
        <Paper elevation="4" style={{paddingLeft:'10px',paddingRight:'10px',paddingTop:'5px',paddingBottom:'5px'}}>
            <div>
            <h1 style={{textAlign:"center"}}>Welcome to Memory Book App</h1>
            <p><b>-></b> Here you can create your own memory book.</p>
            <p><b>-></b> All you need is some good photos of your trips, parties, functions etc.</p>
            </div>
            <div>
                <h2 style={{textAlign:'center'}}>Steps to create Memory book</h2>
                <p><b>1.</b> Login using your gmail account(must allow popups).</p>
                <p><b>2.</b> Click on get started button on the home page to start creating your memory book.</p>
                <p><b>3.</b> You will be directed to front page, where you can create front page of your memory book.</p>
                <p><b>4.</b> You should insert your single photo here with your name. <b>Photo must be in potrait format only.</b> </p>
                <p><b>5.</b> On submitting you will be directed to the contents page.</p>
                <p><b>6.</b> Create the contents of your memory book here by providing title of the event, its photograph and a detailed description. <b>Photo must be in Landscape format only.</b></p>
                <p><b>7.</b> You can easily add new page and create your book.</p>
                <p><b>8.</b> Once done, submit the content and click on preview button to view your book.</p>
                <p><b>9.</b> From here you can download your memory book.</p>
                <p><b>10.</b> Get it printed and read it whenever you want to smile..</p>
            </div>
           
        </Paper>
    </Container>
    <br></br>
    <div style={{textAlign:"center"}}>
    <Link to="/frontpage" style={{ textDecoration: 'none', color: 'black' }}>

                <Button variant="contained" color="primary">Get Started</Button>
            </Link>
            </div>
            <br/>
            <CopyrightIcon /><span style={{verticalAlign:"super"}}>harshnabera</span>

</div>
            )
    }
}

export default Dashboard;