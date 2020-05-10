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
import html2canvas from 'html2canvas';  
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// import * as firebase from 'firebase/app';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width:400

    },
    contain1: {
        marginTop: theme.spacing(0),
        display: "flex",
        flexDirection: "column",
        alignItems: "initial",
        width:500
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
            open:false,
            count:1,
            page:[{
                title:[],
                description:[]
            }],
            productData:[]

        }
        this.getImage = this.getImage.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
this.generatePDF=this.generatePDF.bind(this);
this.handleOpen=this.handleOpen.bind(this);
    }

    handleOpen() {
        axios.get('http://localhost:8080/getContent').then(response => {  
            console.log(response.data);  
            this.setState({  
              productData: response.data  
            });  
            this.setState({ open: true })
          });
        
    }

    handleClose = () => {
        this.setState({ open: false })
        // this.props.forTab(this.props.unit)

    };

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

   
    
    generatePDF=()=>{
        var div=document.querySelector("#pdfdiv")
        const pdf = new jsPdf('p', 'mm', 'a4')  
var imageData;
        var img = new Image();
            img.addEventListener('load', function() {
                
                pdf.addImage(img, 'png', 10, 50);
            });
            img.src = '../../public/logo192.png';

        const input = document.getElementById('pdfdiv');  
        html2canvas(input)  
          .then((canvas) => {  
            const pdf = new jsPdf('p', 'mm', 'a4')  
            var img = new Image();

            {this.state.productData.map((p)=>{
                return(
<div >

{pdf.text(p.title,pdf.internal.pageSize.getWidth()/2,10,{align:"center"})}
{pdf.text(p.description,10,100,{align:"justify"})}

{pdf.addPage()}
</div>

  )
                
                
                
            })}
            
            

            var width = pdf.internal.pageSize.width;    
            var height = pdf.internal.pageSize.height;
            var options = {
                 pagesplit: true
            };
            var h1=50;
            var aspectwidth1= (height-h1)*(9/16);
            const imgData = canvas.toDataURL('image/png');  
            var position = 0;  
              
            pdf.addImage(imgData, 'JPEG', 10, h1, aspectwidth1, (height-h1));  
            pdf.save("download.pdf");  
          });

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
                                 Add new page</Button>
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
                        <div style={{textAlign:"center", paddingTop:'10px'}}>
                                    <Button variant='contained' color='primary'
                                    onClick={this.handleOpen}
                                    style={{ fontSize: "12px", width: '90%' }}                  >
                                    Preview</Button>
                                    </div>                         
                    </Paper>

                </Container>
                
                <CopyrightIcon /><span style={{verticalAlign:"super"}}>harshnabera</span>
                <Dialog onClose={this.handleClose} className={classes.root} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Your memory book
                    </DialogTitle>
                    <DialogContent dividers>
                    <div id="pdfdiv">
                        
                    {this.state.productData.map((p)=>{
                        return(
                            <Paper className={classes.paper}>
                        <h1>{p.title}</h1>
                        <img src={p.image} maxWidth="200px" height="200px"></img>
                    <p style={{paddingLeft:'20px', paddingRight:'20px', textAlign:'justify'}}>{p.description}</p>
                    <fotter>{p.pageNo}</fotter>
                    </Paper>
                    )
                    })}
                    
                </div>
                    </DialogContent>
                    <DialogActions>
                        <Grid container spacing={0}>
                        <Grid md={6} lg={6} sm={6} xs={6}>
                        <Button variant='contained' color='primary'
                                    onClick={this.generatePDF}
                                    style={{ fontSize: "12px", width: '90%' }}                  >
                                    Download PDF</Button>
                                    </Grid>
                                    <Grid md={6} lg={6} sm={6} xs={6}>
                        <Button variant='contained' color='primary'
                                    onClick={this.handleClose}
                                    style={{ fontSize: "12px", width: '90%' }}                  >
                                    Close</Button>
                                    </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default withStyles(styles)(Post);