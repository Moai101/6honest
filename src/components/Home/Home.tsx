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

  interface Props {

    history:string[]
  
  }

  interface State {
    when:string[];
    where:string[];
    who:string[];
    what:string[];
    why:string[];
    how:string[];
    result:string[];


  }
export const db = firebase.firestore();


export class Home extends React.Component<Props,State>{

  constructor(props:Props){
    super(props)
    this.state = {
      when:[],
      where:[],
      who:[],
      what:[],
      why:[],
      how:[],
      result:[]

    }
  }

  post(){

    this.props.history.push('/new')



    }

    addText(){

    }


    render(){
        return (

            <div>
                <button onClick={this.post.bind(this)}>post</button>
          </div>

        )
    }
}