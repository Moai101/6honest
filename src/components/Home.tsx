import React from 'react';
import firebase from 'firebase';
import env from "../../env.json"

const config = {
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId
  };

const firebaseApp = firebase.initializeApp(config);
export const firestore = firebaseApp.firestore();


export class Home extends React.Component {

    post(){
        alert("test")
    }

    render(){
        return (

            <div>
                <button onClick={this.post}>post</button>
          </div>

        )
    }
}