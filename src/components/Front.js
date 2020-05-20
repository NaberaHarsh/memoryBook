import React, { PureComponenet } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import DragAndDrop from './drag&drop';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';
import axios from 'axios';


const styles = theme => ({
    paper: {
        marginBottom: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 400

    },
    contain1: {
        marginTop: theme.spacing(0),
        display: "flex",
        flexDirection: "column",
        alignItems: "initial",
        width: 500
    },
    contain: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    showImage: {
        marginBottom: theme.spacing(0),
        width: "100%",
        height: '100%'
    },
    image: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",


    },
    inputRoot: {
        fontSize: 14
    },
    labelRoot: {
        fontSize: 14,

    },

    root: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "initial"

    }
})


class Front extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            title: "Memory Book",
            name: "",
        }
        this.getImage = this.getImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getImageName = this.getImageName.bind(this);

    }

    getImage(image) {
        this.setState({ image: image })
    }
    getImageName(name) {
        this.setState({ imgData: name })
        console.log(this.state.imgData)
    }
    handleChange = (e, index) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit() {
        const { image, title, imgData,name } = this.state;
        const userData = { image: image, title: title,name:name, imgData: imgData }

        axios.post("http://localhost:8080/content", userData)
            .then((res) => {
                console.log(res);
            })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
            <br />
            <br />
            <br />
            <Container maxWidth='sm' className={classes.contain1}>
                <h2 style={{ paddingTop: 0, textAlign: "center" }}>Front Page</h2>
                <Paper style={{ paddingBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>

                    <div className={classes.contain} >
                        <Paper variant='outlined' style={{ width: "90%" }} >
                            <div>
                                <DragAndDrop getImage={this.getImage} getImageName={this.getImageName} />
                            </div>
                            <form>


                                <TextField
                                    id="name"
                                    margin="normal"
                                    required
                                    label="Name"
                                    fullWidth
                                    autoComplete="name"
                                    variant="outlined"
                                    name="name"
                                    placeholder="Enter your name"
                                    //   value={description}
                                    onChange={(e) => this.handleChange(e)}

                                />


                            </form>
                        </Paper>
                    </div>
                    <div style={{ textAlign: "center", paddingTop: '10px' }}>
                        <Button variant='contained' color='primary'
                            onClick={this.handleSubmit}
                            style={{ fontSize: "12px", width: '90%' }}                  >
                            Submit</Button>
                    </div>

                </Paper>

            </Container>
            </div>
        )
    }
}
export default withStyles(styles)(Front);
