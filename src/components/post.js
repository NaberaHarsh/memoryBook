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
import DeleteIcon from '@material-ui/icons/Delete';
import Appbar from './Appbar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';


// import * as firebase from 'firebase/app';


const styles = theme => ({
    paper: {
        marginBottom: theme.spacing(2),
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
    form:{
        width: "100%",
        marginTop: theme.spacing(0),

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

    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
})



class Post extends React.Component {
    constructor(props) {
        super();
        this.state = {
            // uid:this.props.uid,
            imgData:" ",
            image: " ",
            title:" ",
            description:" ",
            open:false,
            preview:false,
            display:false,
            count:2,
            page:[{
                title:[],
                description:[]
            }],
            productData:[],
            errors:{image:'',title:'',description:''},

        }
        this.getImage = this.getImage.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
this.generatePDF=this.generatePDF.bind(this);
this.handleOpen=this.handleOpen.bind(this);
this.getImageName=this.getImageName.bind(this);
this.handleDelete=this.handleDelete.bind(this);
this.deletePage=this.deletePage.bind(this);
this.open=this.open.bind(this);
this.close=this.close.bind(this);
this.openProgress=this.openProgress.bind(this);
    }

    openProgress = () => {
        this.setState({display: ! this.state.display});
      };
    

    handleOpen() {
        this.openProgress();
        axios.get('/getContent/?uid='+this.props.uid).then(response => {  
            console.log(response.data);  
            this.setState({  
              productData: response.data  
            });  
            this.setState({ open: true })
          });

        
    }

    handleClose = () => {
        this.setState({ open: false })
        this.setState({display:false});
    };
    open = () => {
        this.setState({ preview:true })

    };
    close = () => {
        this.setState({ preview: false })

    };

    getImage(image) {
        this.setState({ image: image })
    }
    getImageName(name) {
        this.setState({ imgData: name })
        console.log(this.state.imgData)
    }

    handleChange = (e,index) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    addPage= e =>{
        const {count,image,title,description,imgData}=this.state;
        let errors={image:'',title:'',description:''};
        const userData={uid:this.props.uid,pageNo:count,image:image,title:title,description:description,imgData:imgData}

        if(!image)
        {errors.image= "Image is required"}
        if(!title){
            errors.title="Title is required"
        }
        if(!description){
            errors.description="Description is required"
        }
            this.setState({errors});

        if(image){
        if(title){
        if(description){
            e.preventDefault()

            axios.post("/content",userData)
            .then((res)=>{
            })
        this.setState({ count: this.state.count + 1 })
let pages= this.state.page.concat([this.state.count]);
this.setState({page:pages});
      }}}
    }

    

    handleSubmit(){
        let errors={image:'',title:'',description:''};
        const {count,image,title,description,imgData}=this.state;
        const userData={uid:this.props.uid,pageNo:count,image:image,title:title,description:description,imgData:imgData}

        if(!image)
        {errors.image= "Image is required"}
        if(!title){
            errors.title="Title is required"
        }
        if(!description){
            errors.description="Description is required"
        }
            this.setState({errors});

        if(image){
        if(title){
        if(description){
    axios.post("/content",userData)
    .then((res)=>{
        this.open();
    })
}}}
    }

   
    
    generatePDF=()=>{
var imgData;
        
        
        const input = document.getElementById('pdfdiv');  
        html2canvas(input)  
          .then((canvas) => {  
            const pdf = new jsPdf('p', 'mm', 'a4')  
            var img = new Image();
            
            var splitTitle;
            {this.state.productData.map((p)=>{
                return(
<div >
    {imgData=p.imgData}
    
{p.name ? 
<>
{pdf.setFontSize(36)}
{pdf.text(p.title,pdf.internal.pageSize.getWidth()/2,20,{align:"center"})}
{pdf.addImage(imgData,55,40,100,150,{align:"center"},)}
{pdf.setFontSize(24)}
{pdf.text(`This book belongs to ${p.name}`,pdf.internal.pageSize.getWidth()/2,210,{align:"center"})}
</>
: 
<>
{pdf.setFontSize(24)}
{pdf.text(p.title,pdf.internal.pageSize.getWidth()/2,15,{align:"center"})}
{pdf.addImage(imgData,55,30,100,70,{align:"center"},)}
{splitTitle = pdf.splitTextToSize(p.description,200)}
{pdf.setFontSize(14)}
{pdf.text(splitTitle,15,120,{maxWidth: 180, align:"justify"})}
</>
}
{pdf.addPage()}
</div>

  )   
            })}  
            pdf.save("MemoryBook.pdf");  
          });

    }

    handleDelete(i){
        let x=this.state.page;
        
        x.splice(i,1)
        this.setState({x:i, count:this.state.count - 1, title:' ', description:' ',image:' '});
    }

    deletePage(p){
        let x=this.state.productData;
console.log(x[p]._id);
        axios.delete('/deletePage/'+x[p]._id)
        .then((res)=>{
            console.log(res.data)
        })
        x.splice(p,1);
        this.setState({
            productData:x
        })
    }

    render() {
        const { classes } = this.props;
        const {errors} = this.state;
        const { image ,title,description } = this.state;
        return (
            <div>
                <br />
            <br />
            <br />
                <Container component="main" maxWidth='sm' className={classes.contain1}>
                    <h2 style={{paddingTop:0 , textAlign:'center'}} >Create your memory book here</h2>
                    <Paper  style={{ paddingBottom: '20px', paddingLeft: '10px', paddingRight: '10px'}}>
                        {this.state.page.map((option,index)=>(
                            <span key={index}>
                        <div className={classes.contain} >
                            <Paper  variant='outlined' style={{ width: "90%" }} >
                                <div>
                                    <DragAndDrop getImage={this.getImage} getImageName={this.getImageName}  />
                                    {errors.image !== '' && <span style={{color: "red"}}>{this.state.errors.image}</span>}
                                    <span style={{fontSize:'12px'}}>(Insert your photo in landscape mode only)</span>
                                </div>
                                <form
                                className={classes.form}
                                >
                                    
                                <TextField
          id="title"
          margin="normal"
          required={true}
          label="Title"
          fullWidth
          autoComplete="title"
          variant="outlined"
          name="title"
        //   value={title}
          onChange={(e)=>this.handleChange(e,index)}
        />
         {errors.title !== '' && <span style={{color: "red"}}>{this.state.errors.title}</span>}
        <TextField
          id="description"
          margin="normal"
          required={true}
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
        {errors.description !== '' && <span style={{color: "red"}}>{this.state.errors.description}</span>}
        

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
                                    onClick={(e)=>{this.addPage(e) }}
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
                
               <footer> <CopyrightIcon /><span style={{verticalAlign:"super"}}>harshnabera</span></footer>

               
                <Dialog onClose={this.close} className={classes.root} aria-labelledby="customized-dialog-title" open={this.state.preview}>
<DialogContent>Submitted successfully</DialogContent>
<DialogActions style={{textAlign:'center'}}>
    <Button onClick={this.close} color='primary'>Okay</Button>
</DialogActions>
            </Dialog>
            <Backdrop className={classes.backdrop} open={this.state.display} onClick={this.handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
                <Dialog onClose={this.handleClose} className={classes.root} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Your memory book
                    </DialogTitle>
                    <DialogContent dividers>
                    <div id="pdfdiv">
                        {this.state.productData ?
                        this.state.productData.map((p,i)=>{
                            return(
                                <Paper className={classes.paper} elevation={4}>
                            <h1>{p.title}</h1>
                            <img src={p.imgData} maxWidth="200px" height="200px"></img>
                            {p.name ?
                             <p style={{ textAlign:'center'}}>{`This book belongs to ${p.name}`}</p>
                            :
                            <p style={{paddingLeft:'20px', paddingRight:'20px', textAlign:'justify'}}>{p.description}</p>
    
                            }
                             <DeleteIcon onClick={()=> this.deletePage(i)}/>

                        </Paper>
                        )
                        })
                        : 
                        <Paper className={classes.paper} elevation={4}>
                            <h4>No Pages created yet</h4>
                        </Paper>
                            }
                    
                    
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