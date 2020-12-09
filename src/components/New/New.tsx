import React from 'react';
import firebase from 'firebase';
import env from "../../env.json"
import { actions } from "../../actions/action"
import store from "../../store"
import { Chip, 
  TextField, 
  Button, 
  InputLabel,
  MenuItem,
  FormControl,
  Select

 } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
  } from 'formik';
import { 
  Box, 
  BoxContainer,
  Margin
 } from "./elements/css/style"



const config = {
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId
  };


  if (!firebase.apps.length) {
    
    firebase.initializeApp(config);


  }

  interface Props {

    history:string[]
  
  }


  interface State {
    text:string;
    title:string;
    whenList:string[];
    whereList:string[];
    whoList:string[];
    whatList:string[];
    whyList:string[];
    howList:string[];
    resultList:string[];
    whenNumber:number,
    whereNumber:number,
    whoNumber:number,
    whatNumber:number,
    whyNumber:number,
    howNumber:number,
    resultNumber:number;
    open: boolean,
    w:string;
    memo:string;
    people:{
      when:string,
      where:string,
      who:string,
      what:string,
      why:string,
      how:string,
      result:string
    }[]


  }

  interface ChipData {
    label: string;
  }
export const db = firebase.firestore();


const formControl = {
  minWidth: 120,
}



export class New extends React.Component<Props,State>{



  constructor(props:Props){
    super(props)
    this.state = {
    whenList:[],
    whereList:[],
    whoList:[],
    whatList:[],
    whyList:[],
    howList:[],
    resultList:[],
    text:"",
    title:"",
    whenNumber:0,
    whereNumber:0,
    whoNumber:0,
    whatNumber:0,
    whyNumber:0,
    howNumber:0,
    resultNumber:0,
    open: false,
    w:"",
    memo:"",
    people:[]

    }
  }

   async post(){
    var user = firebase.auth().currentUser;
    var uid = user?.uid
       const result = await db.collection("5w1h").add({
            title:this.state.title,
            when:this.state.whenList,
            where:this.state.whereList,
            who:this.state.whoList,
            what:this.state.whatList,
            why:this.state.whyList,
            how:this.state.howList,
            result:this.state.resultList,
            memo:this.state.memo,
            uid:uid

        })
        console.log(result)

    }

    handleClose(){
      this.setState({open:false})

    }

    handleOpen() {
      this.setState({open:true})
    }
    

    addText(){

      switch(this.state.w){
        case 'when':
          this.state.whenList.push(this.state.text)
          this.setState({whenList:this.state.whenList})
          this.setState({whenNumber:this.state.whenList.length-1})
          this.setState({text:""})
          break;
        case 'where':
          this.state.whereList.push(this.state.text)
          this.setState({whereList:this.state.whereList})
          this.setState({whereNumber:this.state.whereList.length-1})
          this.setState({text:""})
          break;
          case 'who':
            this.state.whoList.push(this.state.text)
            this.setState({whoList:this.state.whoList})
            this.setState({whoNumber:this.state.whoList.length-1})
            this.setState({text:""})
            break;
          case 'what':
              this.state.whatList.push(this.state.text)
              this.setState({whatList:this.state.whatList})
              this.setState({whatNumber:this.state.whatList.length-1})
              this.setState({text:""})
              break;
          case 'why':
                this.state.whyList.push(this.state.text)
                this.setState({whyList:this.state.whyList})
                this.setState({whyNumber:this.state.whyList.length-1})
                this.setState({text:""})
                break;
          case 'how':
                  this.state.howList.push(this.state.text)
                  this.setState({howList:this.state.howList})
                  this.setState({howNumber:this.state.howList.length-1})
                  this.setState({text:""})
                  break;
         case 'result':
                    this.state.resultList.push(this.state.text)
                    this.setState({resultList:this.state.resultList})
                    this.setState({resultNumber:this.state.resultList.length-1})
                    this.setState({text:""})
                    break;
         case '':
           alert("select")

      }



    }

    handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      this.setState({w:event.target.value as string});
    };

    handleW = (params:{w:string,data:string}) => {

      switch(params.w){
        case 'when':
          this.setState({whenNumber:this.state.whenList.indexOf(params.data)})
          break;
          case 'where':
            this.setState({whereNumber:this.state.whereList.indexOf(params.data)})
            break;
          case 'who':
              this.setState({whoNumber:this.state.whoList.indexOf(params.data)})
              break;
          case 'what':
                this.setState({whatNumber:this.state.whatList.indexOf(params.data)})
                break;
          case 'why':
                  this.setState({whyNumber:this.state.whyList.indexOf(params.data)})
                  break;
          case "how":
              this.setState({howNumber:this.state.howList.indexOf(params.data)})
              break;
          case "result":
            this.setState({resultNumber:this.state.resultList.indexOf(params.data)})
            break;
            

      }




    }

    handleDelete(params:{w:string,data:string}){

      switch(params.w){
        case 'when':
          var res = this.state.whenList.filter(function(a) {
            return a !== params.data;
          });
            this.setState({whenList:res})
          break;
          case 'where':
            var res = this.state.whereList.filter(function(a) {
              return a !== params.data;
            });
              this.setState({whereList:res})
            break;
          case 'who':
            var res = this.state.whoList.filter(function(a) {
              return a !== params.data;
            });
              this.setState({whoList:res})
              break;
          case 'what':
            var res = this.state.whatList.filter(function(a) {
              return a !== params.data;
            });
              this.setState({whatList:res})
                break;
          case 'why':
            var res = this.state.whyList.filter(function(a) {
              return a !== params.data;
            });
              this.setState({whyList:res})
                  break;
          case "how":
            var res = this.state.howList.filter(function(a) {
              return a !== params.data;
            });
              this.setState({howList:res})
              break;
          case "result":
            var res = this.state.resultList.filter(function(a) {
              return a !== params.data;
            });
              this.setState({resultList:res})
            break;
            

      }


  };

    render(){

        return (

            <div>
              <Margin>


<div>
<TextField
          id="standard-multiline-flexible"
          label="Enter title"
          value={this.state.title} 
          onChange={event => {
            const { value } = event.target;
            this.setState({ title: value });
          }}
          rowsMax={4}
        />
</div>


          <div>
                    <TextField
          id="standard-multiline-flexible"
          label="Enter text"
          multiline
          value={this.state.text} 
          onChange={event => {
            const { value } = event.target;
            this.setState({ text: value });
          }}
          rowsMax={4}
        />
            <FormControl
            style={formControl}
            >
        <InputLabel id="demo-controlled-open-select-label">select</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          onOpen={this.handleOpen.bind(this)}
          value={this.state.w}
          onChange={this.handleChange}
        >
          <MenuItem value={"when"}>When</MenuItem>
          <MenuItem value={"where"}>Where</MenuItem>
          <MenuItem value={"who"}>Who</MenuItem>
          <MenuItem value={"what"}>What</MenuItem>
          <MenuItem value={"why"}>Why</MenuItem>
          <MenuItem value={"how"}>How</MenuItem>
          <MenuItem value={"result"}>Result</MenuItem>
        </Select>
      </FormControl>
        <Button 
        onClick={this.addText.bind(this)}
        variant="contained" 
        color="primary">
  Primary
</Button>
                    <BoxContainer>
                      <Box>
                      <h3>When:{this.state.whenList[this.state.whenNumber]}</h3>
                      </Box>
                      <Box>
                      {this.state.whenList.map((data) => {
        return (
                        <Chip
              label={data}
              onClick={() => this.handleW({w:"when",data:data})}
              onDelete={() => this.handleDelete({w:'when',data:data})}
            />

        );
      })}
                      </Box>
       </BoxContainer>
       <BoxContainer>
       <Box>
       <h3>Where:{this.state.whereList[this.state.whereNumber]}</h3>
       </Box>
       <Box>
       {this.state.whereList.map((data) => {
        return (
                        <Chip
              label={data}
              onClick={() => this.handleW({w:"where",data:data})}
              onDelete={() => this.handleDelete({w:'where',data:data})}
            />

        );
      })}
       </Box>

       </BoxContainer>
       <BoxContainer>
       <Box>
       <h3>Who:{this.state.whoList[this.state.whoNumber]}</h3>
       </Box>
       <Box>
       {this.state.whoList.map((data) => {
        return (
                        <Chip
              label={data}
              onClick={() => this.handleW({w:"who",data:data})}
              onDelete={() => this.handleDelete({w:'who',data:data})}
            />

        );
      })}

       </Box>
       </BoxContainer>
       <BoxContainer>
       <Box>
       <h3>What:{this.state.whatList[this.state.whatNumber]}</h3>
       </Box>
       <Box>
       {this.state.whatList.map((data) => {
        return (
                        <Chip
              label={data}
              onClick={() => this.handleW({w:"what",data:data})}
              onDelete={() => this.handleDelete({w:'what',data:data})}
            />

        );
      })}
       </Box>

      
       </BoxContainer>
       <BoxContainer>
       <Box>
       <h3>Why:{this.state.whyList[this.state.whyNumber]}</h3>
       </Box>
       <Box>
       {this.state.whyList.map((data) => {
        return (
                        <Chip
              label={data}
              onClick={() => this.handleW({w:"why",data:data})}
              onDelete={() => this.handleDelete({w:'why',data:data})}
            />

        );
      })}
       </Box>

      
       </BoxContainer>
       <BoxContainer>
       <Box>
       <h3>How:{this.state.howList[this.state.howNumber]}</h3>
       </Box>
       <Box>
       {this.state.howList.map((data) => {
        return (
                        <Chip
              label={data}
              onClick={() => this.handleW({w:"how",data:data})}
              onDelete={() => this.handleDelete({w:'how',data:data})}
            />

        );
      })}
       </Box>
    
      
       </BoxContainer>
       <BoxContainer>
         <Box>
         <h3>Result:{this.state.resultList[this.state.resultNumber]}</h3>
         </Box>
         <Box>
         {this.state.resultList.map((data) => {
        return (
                        <Chip
              label={data}
              onClick={() => this.handleW({w:"result",data:data})}
              onDelete={() => this.handleDelete({w:'result',data:data})}
            />

        );
      })}
         </Box>


    
       </BoxContainer>
          </div>
          
                            <TextField
          id="standard-multiline-flexible"
          label="Enter memo"
          multiline
          value={this.state.memo} 
          onChange={event => {
            const { value } = event.target;
            this.setState({ memo: value });
          }}
        />
        
           <div>
             <Button
             onClick={this.post.bind(this)}
             >post</Button>

           </div>

           </Margin>

          </div>

        )
    }
}