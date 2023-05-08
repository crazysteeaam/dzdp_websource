import {useState} from 'react'
import './App.scss'
import {LeftBar} from "./components/Bar/LeftBar";
import {TopBar} from "./components/Bar/TopBar.jsx";
import {Analyze} from "./views/Analyze/Analyze.jsx";
import {BrowserRouter, HashRouter, Link, Route, Router, Routes} from "react-router-dom";
import {UserBook} from "./views/UserBook/UserBook.jsx";
import {Marketing} from "./views/Marketing/Marketing.jsx";
import {Compare} from "./views/Compare/Compare.jsx";

function App() {

    return (
        <div className="App">
            <>
                <BrowserRouter>
                    <div className="topbar">
                        <TopBar/>
                    </div>
                    <div className="bottomarea">
                        <div className="leftbar"
                             style={{
                                 marginTop: "20px",
                                 boxSizing: "border-box"
                             }}>
                            <LeftBar/>
                        </div>
                        <div className="mainroutearea">
                            <Routes>
                                <Route exact path="" element={<Analyze/>}/>
                                <Route exact path="/analyze" element={<Analyze/>}/>
                                <Route exact path="/userbook" element={<UserBook/>}/>
                                <Route exact path="/marketing" element={<Marketing/>}/>
                                <Route exact path="/compare" element={<Compare/>}/>
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </>
        </div>
    )
}

export default App
