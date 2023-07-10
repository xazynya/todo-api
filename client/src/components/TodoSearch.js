import React from "react";
import {Row, Col, Button, Form, FormControl} from "react-bootstrap";



const TodoSearch = ( { onTodoSearch , urlnum } ) => {

    
    const [searchText, setSearchText] = React.useState('');

    const onChangeText = (event) => {
        setSearchText(event.target.value);
    }

    const onSearch = (event) => {
        event.preventDefault();
        onTodoSearch(searchText);
        //setSearchText('');
    };

    return (

        <Form onSubmit={onSearch}>
            <FormControl
                name="user_id"
                value={urlnum}
                type="hidden" 
                placeholder="New Item" 
                />
            <FormControl
                name="title"
                value={searchText} 
                type="text"
                onChange={onChangeText} 
                placeholder="探す" 
                />
            <Button 
                type="submit" 
                variant="primary" >
                Search
            </Button>
        </Form>

    );

}

export default TodoSearch