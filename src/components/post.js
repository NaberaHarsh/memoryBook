import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import DragAndDrop from './drag&drop';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    contain1: {
        marginTop: theme.spacing(0),
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
            title: [],
            description:[],
            count:1,
            page:[{
                title:[],
                description:[]
            }]

        }
        this.getImage = this.getImage.bind(this);

    }


    getImage(image) {
        this.setState({ image: image })
    }
    // handleChange = e => {
    //     const { name, value } = e.target
    //     this.setState({
    //         [name]: value
    //     })
    // }
    addPage= e =>{
        this.setState({ count: this.state.count + 1 })
        e.preventDefault()
let pages= this.state.page.concat([this.state.count]);
this.setState({page:pages});
      }

      handleChange =  ( index , event)=> {
        const { name, value } = event.target

        let options = this.state.page;
        options[index] = value;
        this.setState({
            page: options
        })
        console.log(this.state.page)
    }

    render() {
        const { classes } = this.props;
        const {title, description} = this.state;
        return (
            <div>

                <Container maxWidth='sm' className={classes.contain1}>
                    <h2 style={{paddingTop:0}}>Create your own memory book here</h2>
                    <Paper  style={{ paddingBottom: '20px', paddingLeft: '10px', paddingRight: '10px'}}>
                        {this.state.page.map((option,index)=>(
                            <span key={index}>
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
          name="title"
          value={title[index]}
          onChange={(event)=>this.handleChange(index,event)}
        />
        <TextField
          id="description"
          margin="normal"
          required
          label="Description"
          fullWidth
          autoComplete="description"
          variant="outlined"
          name="description"
          value={description[index]}
          multiline={true}
          rows={3}
          onChange={(event)=>this.handleChange(index,event)}

        />
        

                                </form>
                            </Paper>
                        </div>
                        </span>
                        ))}
                        <br></br>
                        <div style={{textAlign:"center"}}>
                        <Button variant='contained' color='primary'
                                    onClick={this.addPage}
                                    style={{ fontSize: "12px", width: '90%' }}                  >
                                    Add Page</Button>
                                    </div>
                    </Paper>

                </Container>
                <CopyrightIcon /><span style={{verticalAlign:"super"}}>harshnabera</span>
            </div>
        )
    }
}

export default withStyles(styles)(Post);