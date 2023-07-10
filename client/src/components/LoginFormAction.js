import React from "react";
import LoginForm from "./LoginForm";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/login";

const LoginFormAction = () => {

    const [res, setRes] = React.useState("");
    const [loginStates, setLoginStates] = React.useState("");
    const navigate = useNavigate();

    const onLogin = async(email, userPass) => {
        // 一度ローカルストレージを空にする
        localStorage.removeItem("token");
        setRes('');
        // ただのjson body が空になる。ので以下を使用
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', userPass);

        // Send POST request;
        const result = await axios.post(BASE_URL, params)
        .then(response => {

            if (response.data.isSuccess && response.data.token) {
                let user_id = response.data.user_id;
                localStorage.setItem("token", response.data.token);
                setLoginStates(true);
                navigate(`/${user_id}`);
            } else {
                console.log("Failure Login...");
                setLoginStates(false);
            }
        })
    };

    return (
        <>
        <LoginForm onLogin={onLogin} res={res} />
        </>
    )


}
export default LoginFormAction;
