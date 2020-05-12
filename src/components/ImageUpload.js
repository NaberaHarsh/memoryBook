import React from "react";
import Dropzone from "react-dropzone";
import { withStyles } from "@material-ui/core/styles";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { Button } from '@material-ui/core';
import axios from 'axios';
// import * as firebase from 'firebase/app';




const styles = theme => ({
    paper1: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    paper2: {
        marginTop: theme.spacing(-2),
        marginBottom: theme.spacing(-1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    root: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 120,
        width: 560


    }
})


// for profile picture
class ImageUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photo:" ",
            warningMsg: "",
            image: props.files
        }
        this.deleteImage = this.deleteImage.bind(this);

    }
    

    onDrop = (accepted, rejected) => {
        if (Object.keys(rejected).length !== 0) {
            const message = "Please submit valid file type";
            this.setState({ warningMsg: message });
        } else {
            this.props.addFile(accepted);
            this.setState({ warningMsg: "" });
            console.log(accepted[0]);

            console.log(accepted[0])
    let fd = new FormData()
  fd.append("file",accepted[0])
   axios.post('http://localhost:8080/profile',fd,{headers:{
    'Content-Type': "application/json"
  }}).then((res)=>{
    this.setState({
      photo:res.data
    })
    console.log(res.data);
    // this.props.getImage(res.data)
  })
            
            // this.props.firebaseImage(accepted);
            this.props.getImage(accepted[0].preview);
          
            var blob=new Blob([accepted [0].name],{type:'text/html'});
            var reader = new FileReader();
            reader.onDrop = function () {
                var b64 = reader.result.replace(/^data:.+;base64,/, '');
                console.log(b64); 
            }
            // this.props.getBlob(b64);

            var blobPromise = new Promise((resolve, reject) => {
                const reader = new window.FileReader();
                reader.readAsDataURL(accepted[0]);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    resolve(base64data);
                };
            });
            blobPromise.then(value => {
                // console.log(value);
            });
        }
    };
    deleteImage() {
        this.setState({ image: null })
        console.log(this.state.image)
    }


    render() {
        const { classes } = this.props;

        const { files } = this.props;
        const thumbsContainer = {
            width: "100%",
            marginTop: '0px',
            marginBottom: '0px',
            height: '100%'
        };

        const thumbs = files.map(file => (
            <img style={thumbsContainer} src={file.preview} alt="profile" />
        ));
        // console.log(thumbs);

        const render =
            Object.keys(files).length !== 0 ?
                <div style={{ textAlign: 'right' }}>
                    {files.map(file => <aside>{thumbs}</aside>)}
                </div>
                : (
                    <div className={classes.root} >
                        <AddAPhotoIcon style={{ color: '#B5B9B7', fontSize: '32px' }} />
                        {/* <input type="file" id="file" ref="fileUploader"  accept="image/*" style={{ display: "none" }} /> */}
                        <br />
                        <div style={{ color: '#B5B9B7', textAlign: "center", fontSize: "18px" }}>Drag your photo here
                                <br />
                                or<br></br></div>
                        <Button variant="contained" color="primary" style={{ fontSize: '10px' }}>select from your computer</Button>
                    </div>
                );


        return (
            <div style={{ border: 'dashed #C3C9C6 2px' }}>
                <p>{this.state.warningMsg}</p>
                <Dropzone
                    className={Object.keys(files).length !== 0 ? classes.paper2 : classes.paper1}
                    multiple={false}
                    accept="image/*"
                    // accept="video/*"
                    onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}

                >
                    {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                        // for drag and drop warning statement
                        if (isDragReject) return "Please submit a valid file";
                        return render;
                    }}
                </Dropzone>
            </div>
        );
    }
}

export default withStyles(styles)(ImageUpload);
