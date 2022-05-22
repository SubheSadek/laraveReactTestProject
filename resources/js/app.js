require('./bootstrap');
import React from 'react'
import ReactDom from 'react-dom'
import Routes from './routes'

export default function App(){
    return (
        <Routes></Routes>
    );
}

ReactDom.render(<App/>,document.getElementById('root'))
