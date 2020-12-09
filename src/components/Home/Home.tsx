import React from 'react';
import firebase from 'firebase';
import env from "../../env.json"
import { actions } from "../../actions/action"
import store from "../../store"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';



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
    result:any;


  }
export const db = firebase.firestore();


export class Home extends React.Component<Props,State>{

  constructor(props:Props){
    super(props)
    this.state = {
      result:[]

    }
  }

  goToEdit(path:string){

    store.dispatch(actions.getPathParams(path))


    this.props.history.push('/edit')

  }

  async getData(){

    const uid = "6dlFUbzpfzgH8MyGJ8d2KtQjLpM2"
    const result = this.state.result
    db.collection("5w1h").where("uid", "==",uid).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            const test= {
              id:doc.id,
              data:doc.data()
            }
            result.push(test)
         
        });
    })
    .then(() =>{
      this.setState({result:result})
      console.log(result)
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }

  componentDidMount = async () => {
     this.getData();
}

  post(){

    this.props.history.push('/new')



    }

    addText(){

    }


    render(){
        return (

            <div>
              <div>
              {this.state.result.map((data:any) => {
    return (
      <div>
        <Card>
      <CardContent>
        <Typography  color="textSecondary" gutterBottom>
         {data.id}
        </Typography>
        <Typography variant="h5" component="h2">
         {data.data.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
        size="small"
        onClick={this.goToEdit.bind(this,data.id)}
        >Edit</Button>
      </CardActions>
    </Card>
      </div>
    )
  })}
              </div>

              <Fab 
              onClick={this.post.bind(this)}
              color="secondary" 
              aria-label="edit">
        <EditIcon />
      </Fab>
           
          </div>

        )
    }
}