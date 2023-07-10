import React from "react";
import { Form , FloatingLabel ,Button,InputGroup} from 'react-bootstrap';



const SignUpForm = ({ onSignUp }) => {

    const [email, setEmail] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userPass, setUserPass] = React.useState('');
    
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const onChangeUserName= (event) => {
        setUserName(event.target.value);
    }
    const onChangePassword= (event) => {
        setUserPass(event.target.value);
    }

    const onCreateUser =  (event) => {
        event.preventDefault();
        onSignUp(email, userName, userPass);
    };

    return (
        <>
        Sign Up
        <Form onSubmit={onCreateUser}>
                <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
                >
                <Form.Control 
                    type="email" 
                    placeholder="name@example.com" 
                    onChange={onChangeEmail} 
                    value={email}
                    />
                </FloatingLabel>
                <FloatingLabel 
                    controlId="floatingInput" 
                    label="UserName"
                    >
                <Form.Control 
                    type="text" 
                    placeholder="UserName" 
                    onChange={onChangeUserName} 
                    value={userName} 
                    />
                </FloatingLabel>
                <FloatingLabel 
                    controlId="floatingPassword" 
                    label="Password">
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    onChange={onChangePassword} 
                    value={userPass} />
                </FloatingLabel>

            <Button
                type="submit" 
                variant="primary" >
                Sign In
            </Button>
        </Form>
        <a href="./login">サインアップ後遷移しない場合はこちらをクリック</a>
      </>
    );

}

export default SignUpForm;