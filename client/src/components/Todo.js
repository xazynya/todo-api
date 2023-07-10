import React from 'react';
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import Header from "./Header";

const Todo = ( { urlnum } ) => {
    console.log(urlnum);
    return (
        <>
        <Header  urlnum={urlnum} />
        <TodoList urlnum={urlnum} />
        </>
    );
}
export default Todo;