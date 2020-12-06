import React from 'react';
import firebase from 'firebase';
import env from "../../env.json"
import { actions } from "../../actions/action"
import store from "../../store"
import { Chip, Paper, TextField, Button } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
  } from 'formik';
import { Test } from "./elements/css/style"



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
    whenList:string[];
    whereList:string[];
    whoList:string[];
    whatList:string[];
    whyList:string[];
    howList:string[];
    resultList:string[];
    isWhen:boolean;
    isWhere:boolean;
    isWho:boolean;
    isWhat:boolean;
    isWhy:boolean;
    isHow:boolean;
    chipData:string[]
    initialValues:{
        when:string;
        where:string;
        who:string;
        what:string;
        why:string;
        how:string;
        result:string

    }


  }

  interface ChipData {
    label: string;
  }
export const db = firebase.firestore();


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
    isWhen:true,
    isWhere:true,
    isWho:true,
    isWhat:true,
    isWhy:true,
    isHow:true,
    chipData:[
      'Angular','Polymer', 'React', 'Vue.js'
    ],
      initialValues:{
        when:"",
        where:"",
        who:"",
        what:"",
        why:"",
        how:"",
        result:""
    }

    }
  }

   async post(){
    var user = firebase.auth().currentUser;
    var uid = user?.uid
       const result = await db.collection("5w1h").add({
            when:"いつ",
            where:"どこで",
            who:"だれが",
            what:"何を",
            why:"なぜ",
            how:"どうやって",
            result:"",
            uid:uid

        })
    store.dispatch(actions.updateEmail("test"))

    }

    addText(){

      alert("test")
    }

    hanleOnChangeWhen(){
      this.setState({
        isWhen:!this.state.isWhen
      })
    }

    handleDelete(data:string){
      console.log(this.state.chipData)
var res = this.state.chipData.filter(function(a) {
  return a !== data;
});
console.log(res)
this.setState({chipData:res})

    };

    render(){

        return (

            <div>
                <Formik
         initialValues={this.state.initialValues}
         onSubmit={(values, actions) => {



         }}
       >
         <Form>
           {
      (()=>{
        if(this.state.isWhen === true){
          return (

          <div>
                    <h1>When</h1>:
                    <Test>
                    <TextField
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          rowsMax={4}
        />
        <Button 
        onClick={this.addText}
        variant="contained" 
        color="primary">
  Primary
</Button>
                    </Test>
                    <div>
      {this.state.chipData.map((data) => {


        return (
          <Test>
                        <Chip
              label={data}
              onDelete={() => this.handleDelete(data)}
            />
          </Test>

        );
      })}
       </div>

    <div>
    <Field type="text" name="when" placeholder="pass" />
    <button onClick={this.hanleOnChangeWhen.bind(this)}>test</button>
    </div>
          </div>
          )
        }else{
          return (
            <div>
                         <label htmlFor="When">When</label>:

                        <div>未入力です。</div>
          <button onClick={this.hanleOnChangeWhen.bind(this)}>test</button>

            </div>
          


            )
        }
      })()
             }
        
           <div>
           <button type="submit">sign in</button>

           </div>
         </Form>
       </Formik>

                
          </div>

        )
    }
}