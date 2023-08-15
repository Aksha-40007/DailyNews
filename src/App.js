import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Newscomp from './components/Newscomp';
import {
  BrowserRouter as Router,
  Routes,
  Route} from "react-router-dom"

export default class App extends Component {
  pagesize=5;
  render() {
    return (
    <Router>
      
      <Navbar/> 
      <div>
        <Routes> 
            <Route exact path='/'  element={<Newscomp key='general' pagesize={this.pagesize} country='in' category='general'/>}/>
            <Route exact path='/business'  element={<Newscomp key='business' pagesize={this.pagesize} country='in' category='business'/>}/>
            <Route exact path='/entertainment'  element={<Newscomp key='entertainment' pagesize={this.pagesize} country='in' category='entertainment'/>}/>
            <Route exact path='/general'  element={<Newscomp key='general' pagesize={this.pagesize} country='in' category='general'/>}/>
            <Route exact path='/health'  element={<Newscomp key='health' pagesize={this.pagesize} country='in' category='health'/>}/>
            <Route exact path='/science'  element={<Newscomp key='science' pagesize={this.pagesize} country='in' category='science'/>}/>
            <Route exact path='/sports'  element={<Newscomp key='sports' pagesize={this.pagesize} country='in' category='sports'/>}/>
            <Route exact path='/technology'  element={<Newscomp key='technology' pagesize={this.pagesize} country='in' category='technology'/>}/>

        </Routes>
      </div>
      </Router>
    )
  }
}
