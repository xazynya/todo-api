import {React , useState } from "react";
import {Row, Col, Button, Form, Accordion ,Modal } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';


const TodoItem = ({ todo, onTodoDelete, onTodoUpdate, onTodoUpdateContent }) => {

    const [completed, setCompleted] = useState(todo.completed);

    /** オリジナル */
    const [default_title , setDefaultTitle] = useState(todo.title);
    const [default_content , setDefaultContent] = useState(todo.content);

    /** 編集用変数 */
    const [title, updateTitle] = useState(default_title);
    const [content, updateContent] = useState(default_content);

    const onDelete = ()=>{
        onTodoDelete(todo);
    }
    const toggleCompletion = () => {
        /**
         * front-end の変数の設定
         * todo.completedの値にフロントで反転させたcompletedを入れる
         */
        onTodoUpdate({...todo, completed: !completed});
        setCompleted(!completed);
    }
    /**
     * モーダルウィンド展開、編集画面表示
     */
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeTitle = (event) => {
        updateTitle(event.target.value);
    }
    const onChangeContent = (event) => {
        updateContent(event.target.value);
    }

    /** Update     */
    const updateTodoItem = (event) => {
        event.preventDefault();
        onTodoUpdateContent(title, content, todo.uuid);

        // set TodoItem
        setDefaultTitle(title);
        setDefaultContent(content);
        
        //modal close
        handleClose();
    };

    /** Clear */
    const clearTodoItem = () => {
        // clear TodoItem
        updateTitle(todo.title);
        updateContent(todo.content);
       
        //modal close
        handleClose();
    }
    
    return (
        <>
            <Row>
                <Col xs={1}>
                    <Form>
                        <Form.Check
                        type="switch" 
                        checked={completed} 
                        className="disablecheck"
                        id="custom-switch"
                        onChange={toggleCompletion}
                        />
                    </Form>
                </Col>

                <Col>
                <Accordion>
                    <Accordion.Item eventKey={todo.todo_id}>
                        <Accordion.Header>
                        <Row>
                            <Col className={completed ? 'completed': "" } >
                                        {default_title}
                            </Col>
                        </Row>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col className={completed ? 'completed': "" } >
                                    {default_content}
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                </Col>
                <Col xs={1}>
                <Button variant="link" >
                        <FaEdit onClick={handleShow} />
                </Button>
                </Col>
                <Col xs={1}>
                <Button variant="link" onClick={onDelete}>
                        <i className="fa fa-remove text-danger deletebutton" />
                </Button>
                </Col>
            </Row>
            <Modal show={show} onHide={clearTodoItem}>
            <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Todo Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={onChangeTitle}
                    autoFocus
                />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Todo Body</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={5} 
                    value={content}
                    onChange={onChangeContent}
                    />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={clearTodoItem}>
                Close
            </Button>
            <Button variant="primary" onClick={updateTodoItem}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default TodoItem;