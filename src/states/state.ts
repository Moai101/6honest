import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actions } from '../actions/action';

export interface state {
  name: string;
  email: string;
}

const initialState: state = {
  name: '',
  email: ''
};

export const reducer = reducerWithInitialState(initialState)
  .case(actions.updateName, (state, name) => {
    return Object.assign({}, state, { name });
  })
  .case(actions.updateEmail, (state, email) => {
    return Object.assign({}, state, { email });
  });