import React from "react";
import { Button , Form , InputGroup, FormControl } from 'react-bootstrap';



const TodoInput = ({ onItemCreate , urlnum }) =>{

    const [newItem, setNewItem] = React.useState('');
    const [newContent, setNewContent] = React.useState('');
    const onChangetitle = (event) => {
        setNewItem(event.target.value);
    }
    const onChangeContent = (event) => {
        setNewContent(event.target.value);
    }
    const onCreate = (event) => {
        event.preventDefault();
        onItemCreate(newItem, newContent);
        setNewItem('');
    };


    return (
        <>
        <Form onSubmit={onCreate}>
            <InputGroup>
            <FormControl
                name="user_id"
                value={urlnum}
                type="hidden" 
                placeholder="New Item" 
            />
            <FormControl
                name="title"
                value={newItem} 
                onChange={onChangetitle} 
                type="text" 
                placeholder="New Item" 
            />
            </InputGroup>
            <FormControl
                name="content"
                value={newContent} 
                onChange={onChangeContent} 
                type="text" 
                placeholder="詳細など" 
            />
            <Button 
                type="submit" 
                variant="primary" 
                desabled={!newItem.length}
            >
                Add
            </Button>
        </Form>
        </>
    );
}

export default TodoInput;