import React, { PureComponenet } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import DragAndDrop from './drag&drop';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
    paper: {
        marginBottom: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width:"100%"
    

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
        alignItems: "center"

    }
})


class Front extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:this.props.uid,
            image: "",
            title: "Memory Book",
            name: "",
            pageNo:1,
            open:false,
            errors:{image:'',name:""}
        }
        this.getImage = this.getImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getImageName = this.getImageName.bind(this);
        
    }

    handleOpen(){
        this.setState({open:true});
    }
    handleClose(){
        this.setState({open:false});
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
        let errors= {image:'', description:''};
        const { image,pageNo, title, imgData,name,uid} = this.state;
        const userData = {uid:this.props.uid ,pageNo:pageNo, image: image, title: title,name:name, imgData: imgData}

        if(!image)
        {errors.image= "Image is required"}
        if(!name){
            errors.name="Name is required"
        }

        this.setState({errors});
        if(image){
        if(name){
        axios.post("/content", userData)
            .then((res) => {
                console.log(res);
                  this.handleOpen();            
            })
            
        }}
    }

    render() {
        const { classes } = this.props;
const {errors} = this.state;
const {image, name}=this.state;
        return (
            <div>
            <br />
            <br />
            <br />
            <Container component="main" maxWidth='sm' className={classes.contain1}>
                <h2 style={{ paddingTop: 0, textAlign: "center" }}>Front Page</h2>
                <Paper style={{ paddingBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>

                    <div className={classes.contain} >
                        <Paper variant='outlined' style={{ width: "90%" }} >
                            <div>
                                <DragAndDrop getImage={this.getImage} getImageName={this.getImageName} />
                                {errors.image != '' && <span style={{color: "red"}}>{this.state.errors.image}</span>}
                                <span style={{fontSize:'12px'}}>(Insert your photo in potrait mode only)</span>
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
                                    {errors.name != '' && <span style={{color: "red"}}>{this.state.errors.name}</span>}


                            </form>
                        </Paper>
                    </div>
                    <div style={{ textAlign: "center", paddingTop: '10px' }}>
                    {/* <Link to="/content" style={{ textDecoration: 'none', color: 'black' }}> */}
                        <Button variant='contained' color='primary'
                            onClick={this.handleSubmit}
                            style={{ fontSize: "12px", width: '90%' }}                  >
                            Submit</Button>
                            {/* </Link> */}
                    </div>

                </Paper>

            </Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <CopyrightIcon /><span style={{verticalAlign:"super"}}>harshnabera</span>
            <Dialog onClose={this.handleClose} className={classes.root} aria-labelledby="customized-dialog-title" open={this.state.open}>
<DialogContent>Submitted successfully</DialogContent>
<DialogActions style={{textAlign:'center'}}>
  <Link to="/content" style={{ textDecoration: 'none', color: 'black' }}>
    <Button  color='primary'>Okay</Button>
    </Link>
</DialogActions>
            </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(Front);
