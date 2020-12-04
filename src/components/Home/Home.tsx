import React from 'react';
import firebase from 'firebase';
import env from "../../env.json"
import { actions } from "../../actions/action"
import store from "../../store"

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
export const db = firebase.firestore();


export class Home extends React.Component {

   async post(){
    //    const result = await db.collection("members").add({
    //         test:"test"
    //     })
    //     console.log(result)
    store.dispatch(actions.updateEmail("test"))

    }

    render(){
        return (

            <div>
                <button onClick={this.post}>post</button>
          </div>

        )
    }
}