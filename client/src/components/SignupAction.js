import React from "react";
import axios from 'axios';
import SignUpForm from "./SignUpForm";
import { Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/signup";

const SignupAction = () => {

    const [res, setRes] = React.useState("");
    
    const navigate = useNavigate();

    const onSignUp = async(email, userName, userPass) => {
        setRes('');
        // ただのjson body が空になる。ので以下を使用
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('username', userName);
        params.append('password', userPass);
        // Send POST request;
        const result = await axios.post(BASE_URL, params)
        .then(response => {
            if (response.status === "OK") {
                /** 遷移 */
                navigate("/login");
            }
            setRes(response.data);
        })
    }

    /* res に値が入ったら */
    return (
        <>
        <div>
        {res.status === "NG" &&
            <Alert key="warning" variant="warning">
                This is a warning alert—check it out!
            </Alert>
        }
        </div>
        <SignUpForm onSignUp={onSignUp} res={res} />
        </>
    );

}

export default SignupAction;