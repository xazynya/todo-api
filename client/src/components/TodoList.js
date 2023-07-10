import { useState, useEffect } from "react";
import axios from 'axios';
import TodoInput from "./TodoInput";
import TodoSearch from "./TodoSearch";
import TodoItem from "./TodoItem";
import { Container, Row ,Col } from "react-bootstrap";

const BASE_URL = "http://localhost:8080/api";

const TodoList = ({ urlnum }) => {
    /**
     * Todo List 認証出来ていないユーザーはアクセスできない
     */
    const token = localStorage.getItem("token");
    const [todos, setTodos] = useState(null);
    const authheader = {
        headers: { Authorization: `Bearer ${token}` },
        data: {},
    };

    useEffect(() => {
        // サーバー側で CORS 対策していないと取得できない。
        axios.get(`${BASE_URL}?user_id=${urlnum}`
            ,authheader).then((res) => setTodos(res.data))
        },[]
    );


    const onTodoSearch = async (searchText) =>{
        
        let search_string = "&searchtext="+searchText;
        const result = await axios.get(
            `${BASE_URL}?user_id=${urlnum}${search_string}`
            , authheader
            ).then((res) => setTodos(res.data))
    }

    const onItemCreate = async (newItem, newContent) =>{
        // ただのjson body が空になる。ので以下を使用
        const params = new URLSearchParams();
        params.append('user_id', 1);
        params.append('title', newItem);
        params.append('content', newContent);
        params.append('completed', false);

        // Send POST request;
        const result = await axios.post(BASE_URL, params, authheader);
        setTodos([...todos, 
            {title: newItem, content: newContent, completed: false, uuid: result.data.uuid}])
        // Update my front-end
    }


    const onTodoDelete = async (todo) => {
        // update frondt-end
        await axios.delete(`${BASE_URL}/${todo.uuid}`, authheader);
        const index = todos.findIndex((i) => i.uuid  === todo.uuid);
        setTodos([...todos.slice(0, index), ...todos.slice(index + 1 )]);

    }

    const onTodoUpdate = async (todo) => {
        // put の場合でもURLSearchParams 使う必要があるみたい。
        const params = new URLSearchParams();
        params.append('completed', todo.completed );

        await axios.put(
            `${BASE_URL}/${todo.uuid}`, 
            params, authheader
            );
    }

    const onTodoUpdateContent = async (title, content, uuid) => {

        const params = new URLSearchParams();
        params.append('title', title) ;
        params.append('content', content );

        await axios.put(
            `${BASE_URL}/${uuid}`, 
            params,
            authheader
            );
        
    }
    // 空の場合はLoading
    // useEffect が変数への格納を監視している。
    if (todos === null) return <div>Loading</div>;

    return (
           <Container>
                <Row>
                    <Col sm={4}>
                        <Row>
                            <Col>
                            New Task
                            <TodoInput onItemCreate={onItemCreate} urlnum={urlnum} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            Search Task
                            <TodoSearch onTodoSearch={onTodoSearch} urlnum={urlnum} />
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={8}>
                        Task List
                    <Container>
                        <Row>
                            <Col xs={1} className="border-bottom">check</Col>
                            <Col xs={1} className="border-bottom">dell</Col>
                            <Col className="border-bottom">Task</Col>
                        </Row>
                        {todos.map(( todo ) => (
                                <TodoItem 
                                    key={todo.uuid} 
                                    todo={todo} 
                                    onTodoDelete={onTodoDelete} 
                                    onTodoUpdate={onTodoUpdate}
                                    onTodoUpdateContent= {onTodoUpdateContent}
                                />
                            )
                        )}
                    </Container>
                    </Col>
                </Row>
            </Container>
    )
};

export default TodoList;