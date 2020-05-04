import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import DragAndDrop from './drag&drop';
import TextField from '@material-ui/core/TextField';



const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    contain: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
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

class Post extends React.Component {
    constructor(props) {
        super();
        this.state = {
            image: " ",
            title: ' '

        }
        this.getImage = this.getImage.bind(this);

    }

    getImage(image) {
        this.setState({ image: image })
    }

    render() {
        const { classes } = this.props;
        const {title} = this.state;
        return (
            <div>
                <Container maxWidth='sm' className={classes.contain}>
                    <Paper  style={{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px'}}>
                        <div className={classes.contain} >
                            <Paper variant='outlined' style={{ width: "90%" }} >
                                <div>
                                    <DragAndDrop getImage={this.getImage} />
                                </div>
                                <form>
                                <TextField
          id="title"
          margin="normal"
          required
          label="Title"
          fullWidth
          autoComplete="title"
          variant="outlined"
        />
                                </form>
                            </Paper>
                        </div>
                    </Paper>

                </Container>
            </div>
        )
    }
}

export default withStyles(styles)(Post);