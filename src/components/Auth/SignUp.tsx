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

}

interface State {
    initialValues:{
        email:string;
        password:string;
        confirmPass:string;

    }
}

  
export const db = firebase.firestore();


export class SignUp extends React.Component<Props,State> {
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

post(params: {
    email: string;
    password: string;}){
     firebase.auth().createUserWithEmailAndPassword(params.email, params.password).then(function(res){
         console.log(res.user?.uid)
     })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });

    // store.dispatch(actions.updateEmail("test"))

    }

    render(){
        return (

            <div>

<Formik
         initialValues={this.state.initialValues}
         onSubmit={(values, actions) => {
             if(values.password === values.confirmPass){
                let params = {
                    email:values.email,
                    password:values.password
                }
                this.post(params)

             }else{
                 alert("test")
             }

         }}
       >
         <Form>
           <label htmlFor="firstName">First Name</label>
           <Field name="email" placeholder="Email" />
           <label htmlFor="firstName">Pass</label>

           <Field type="password" name="password" placeholder="pass" />
           <label htmlFor="firstName">confirmPass</label>

           <Field name="confirmPass" placeholder="confirm" />

           <button type="submit">Submit</button>
         </Form>
       </Formik>
                
          </div>

        )
    }
}