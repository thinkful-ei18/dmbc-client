import React , {Component} from 'react';
import {Link, Route, } from 'react-router-dom';
import DaySpreads from './daySpreads';

//scale this out once single day view is done, keep lifecycle components though -m
class TempMultiView extends Component{

  componentDidMount(){
  
  }
  render(){
    return(
      <div>
        <p style={{'display':'block'}}>foobar</p>
        {/* this link is temporary scope up!  */}
        <Link to='/DaySpreads'>
          {/* this is a temp block with temp styles not final */}
          <div
            style={{'width':'300px','height':'300px','border':'1px solid red','text-align':'center'}}
          >
            <h2>MONDAY</h2>
            <p>TEMP DAY OBJECT</p>

          </div>
        </Link>


        {/* <DaySpreads /> */}
      </div>
    )
  }
};


export default TempMultiView;


/*
<Link to='/mock'>Mockups</Link>
<Route path="/login" component={Login} />
*/
