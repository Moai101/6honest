import React from 'react';
import firebase from 'firebase';
import env from "../../env.json"
import { actions } from "../../actions/action"
import store from "../../store"
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
  } from 'formik';






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
    initialValues:{
        email:string;
        password:string;
        confirmPass:string;

    }
}

  
export const db = firebase.firestore();


export class SignIn extends React.Component<Props,State> {
    constructor(props:Props){
        super(props)
        this.state ={

            initialValues:{
                email:"",
                password:"",
                confirmPass:""
            }
        }
    }

    post(){

      firebase.auth().signOut().then(()=>{
        console.log("ログアウトしました");
      })
      .catch( (error)=>{
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });


    }

    render(){
        return (

            <div>

<Formik
         initialValues={this.state.initialValues}
         onSubmit={(values, actions) => {


          firebase.auth().signInWithEmailAndPassword(values.email, values.password)
  .then((user) => {

    this.props.history.push('/')

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });


         }}
       >
         <Form>
           <label htmlFor="firstName">First Name</label>
           <Field name="email" placeholder="Email" />
           <label htmlFor="firstName">Pass</label>

           <Field type="password" name="password" placeholder="pass" />
           <button type="submit">sign in</button>
         </Form>
       </Formik>
       <button onClick={this.post}>out</button>
                
          </div>

        )
    }
}