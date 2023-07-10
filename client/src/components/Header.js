import React from "react";
import axios from 'axios';
import { Navbar, Container,Button} from "react-bootstrap";
import Icon from "./logo.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




const BASE_URL = "http://localhost:8080/api/user";

const Header = ({ urlnum }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [username, setUserName] = useState("");
    const token = localStorage.getItem("token");
    const authheader = {
        headers: { Authorization: `Bearer ${token}` },
        data: {},
    };
    useEffect(() => {

        // サーバー側で CORS 対策していないと取得できない。
        axios.get(`${BASE_URL}?user_id=${urlnum}`
            ,authheader).then((res) =>  {
                setUser(res.data)
                setUserName(res.data[0].username);
                })
            
        },[]
        
    )
    const logOut = () => {
        console.log("ログアウトします");
        localStorage.removeItem("token");
        navigate("/login");
    }


    return (
        <Navbar className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="#home">
            <img
              alt=""
              src={Icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            React Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              ログイン中: {username}&nbsp;&nbsp;
            </Navbar.Text>
            <Button onClick={logOut}>
              ログアウト
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );

}

export default Header;