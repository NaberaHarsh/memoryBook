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
import saveAs from 'file-saver'

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

    generatePDF=()=>{
        const {count,image,title,description,}=this.state;
        const userData={count,image,title,description}
    
        axios.post('/create-pdf',userData)
        .then(()=> axios.get('/fetch-pdf',{responseType:'blob' }))
        .catch((err)=>{
            console.log("error has come");
        })
        .then((res)=>{
            const pdfBlob=new Blob([res.data], { type:'applicatio/pdf' });
            saveAs(pdfBlob, 'memoryBook.pdf');
        })

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