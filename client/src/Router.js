import React from 'react'; //Reactを読み込んでいる

//画面遷移で使用する{ BrowserRouter, Route, Switch }を'react-router-dom'から読み込んでいる
import { Routes ,Route ,useLocation } from "react-router-dom";
import SignupAction from './components/SignupAction'; //作成したpage1.jsを読み込んでいる
import Todo from './components/Todo'; //作成したpage1.jsを読み込んでいる
import LoginFormAction from './components/LoginFormAction'; //作成したpage1.jsを読み込んでいる
import Index from './components/Index'; 
import Validate from './validate';


const Router = () => {

    /**
     * Todo のためのパラメーター取得項目
     */
    let location = useLocation();
    let urlnum = location.pathname.replace("/","");
    let todonum = "/0";
    if (Validate.isNum(urlnum)) {
        todonum = `/${urlnum}`;
    }
    return (
        <>
            <Routes>
                <Route path="/" element={<Index />} /> 
                <Route path="/login" element={<LoginFormAction />} /> 
                <Route path="/signup" element={<SignupAction />} />
                <Route path={todonum} element={<Todo urlnum={urlnum} />}  /> 
            </Routes>
        </>
    );
}

export default Router;