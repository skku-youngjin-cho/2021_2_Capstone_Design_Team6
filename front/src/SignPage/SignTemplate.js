import React from 'react';
import Signin from './Signin.js';
import Signup from './Signup.js';
import { Route, Redirect } from 'react-router-dom';
import Mainpage from '../pages/MainPage';

const SignTemplate = () => {
    const username = localStorage.getItem('username');
    if(!username){
        return(
            <>
                <Route exact path="/" component={Signin} />
                <Route path="/signup" component={Signup} />
            </>
        )
    }

//개인 홈 화면 사용시 /username, 공통 홈 화면 사용시 path는 홈으로, component는 홈페이지 Template
    return(
        <>
            <Redirect to={"/" + username}/>
            <Route path = "/:username" component={Mainpage} />
        </>
    )
}

export default SignTemplate;