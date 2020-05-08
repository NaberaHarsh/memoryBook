import React, { PureComponenet } from 'react';
import jsPdf from "jspdf";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import DragAndDrop from './drag&drop';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';
import axios from 'axios';
import saveAs from 'file-saver';
// import * as firebase from 'firebase/app';


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

// var firebaseConfig = {
//     apiKey: "AIzaSyB99ZMQiexnzEjcTdgGug0ZfnOz968UYlc",
//     authDomain: "memory-book-ecf89.firebaseapp.com",
//     databaseURL: "https://memory-book-ecf89.firebaseio.com",
//     projectId: "memory-book-ecf89",
//     storageBucket: "memory-book-ecf89.appspot.com",
//     messagingSenderId: "473816955063",
//     appId: "1:473816955063:web:519e43801cd2acb5d0f532"
//   };
//   firebase.initializeApp(firebaseConfig);

class Post extends React.Component {
    constructor(props) {
        super();
        this.state = {
            image: " ",
            title:" ",
            description:" ",
            count:1,
            page:[{
                title:[],
                description:[]
            }]

        }
        this.getImage = this.getImage.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
this.generatePDF=this.generatePDF.bind(this);
    }

    

    getImage(image) {
        this.setState({ image: image })
    }
    handleChange = (e,index) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    addPage= e =>{
        this.setState({ count: this.state.count + 1 })
        e.preventDefault()
let pages= this.state.page.concat([this.state.count]);
this.setState({page:pages});
      }

    //   handleChange =  ( index , event)=> {
    //     const { name, value } = event.target

    //     let options = this.state.page;
    //     options[index] = value;
    //     this.setState({
    //         page: options
    //     })
    //     console.log(this.state.page)
    // }

    handleSubmit(){
        const {count,image,title,description,}=this.state;
        const userData={pageNo:count,image:image,title:title,description:description}
    
    axios.post("http://localhost:8080/content",userData)
    .then((res)=>{
        console.log(res);
        console.log("hello");
    })
    }

    // fileUploadFirebase(e){
    //     console.log(e.target.files[0])
    //     var storageRef = firebase.storage().ref();
        
    //     // Create a reference to 'images/mountains.jpg'
    //     var mountainImagesRef = storageRef.child('images/mountains.jpg');
     
    //     mountainImagesRef.put(e.target.files[0]).then(function(snapshot) {
    //       console.log('Uploaded a blob or file!');
    //     });
    //    }

    generatePDF=()=>{
        const {count,image,title,description,}=this.state;
        const userData={pageNo:count,image:image,title:title,description:description}
    
        axios.post('http://localhost:8080/createpdf',userData)
        .then(()=> axios.get('http://localhost:8080/fetchpdf',{responseType:'blob' }))
        .then((res)=>{
            const pdfBlob=new Blob([res.data], { type:'applicatio/pdf' });
            // const fileURL = URL.createObjectURL(pdfBlob);
            // window.open(fileURL);
            saveAs(pdfBlob, 'memoryBook.pdf');
        })

    }

    render() {
        const { classes } = this.props;
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
                                    <DragAndDrop getImage={this.getImage}  />
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
        //   value={title}
          onChange={(e)=>this.handleChange(e,index)}
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
        //   value={description}
          multiline={true}
          rows={3}
          onChange={(e)=>this.handleChange(e,index)}

        />
        

                                </form>
                            </Paper>
                        </div>
                        </span>
                        ))}
                        <br></br>
                        <Grid container spacing={0}>
                            <Grid md={6} lg={6} sm={6} xs={6}>
                            <div style={{textAlign:"center"}}>
                        <Button variant='contained' color='primary'
                                    onClick={(e)=>{this.addPage(e) ; this.handleSubmit(e)}}
                                    style={{ fontSize: "12px", width: '80%' }}                  >
                                    Save and Add new page</Button>
                                    {/* <br/> */}
                                    </div>
                            </Grid>
                            <Grid md={6} lg={6} sm={6} xs={6}>
                            <div style={{textAlign:"center"}}>
                                    <Button variant='contained' color='primary'
                                    onClick={this.handleSubmit}
                                    style={{ fontSize: "12px", width: '80%' }}                  >
                                    Final Submit</Button>
                                    </div> 
                            </Grid>
                        </Grid>
                        <div style={{textAlign:"center"}}>
                                    <Button variant='contained' color='primary'
                                    onClick={this.generatePDF}
                                    style={{ fontSize: "12px", width: '80%' }}                  >
                                    generate PDF</Button>
                                    </div>                         
                    </Paper>

                </Container>
                <CopyrightIcon /><span style={{verticalAlign:"super"}}>harshnabera</span>
            </div>
        )
    }
}

export default withStyles(styles)(Post);