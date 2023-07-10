import React from "react";
import { Form 
        , FloatingLabel 
        ,Button 
        ,Container
        ,Row
        ,Col
    } from 'react-bootstrap';

const LoginForm = ({ onLogin }) => {

    const [email, setEmail] = React.useState('');
    const [userPass, setUserPass] = React.useState('');

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const onChangePassword= (event) => {
        setUserPass(event.target.value);
    }

    const onLoginUser =  (event) => {
        event.preventDefault();
        onLogin(email, userPass);
    };

    return (
        <>
            <Container>
                <Row>
                    <Col>Login</Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={onLoginUser}>
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
                                Login
                            </Button>
                        </Form>
                        <br />
                        <a href="/signup">SiginUp</a>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginForm;

