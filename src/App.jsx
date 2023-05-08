import { useState } from 'react'
import './App.scss'
import {LeftBar} from "./components/Bar/LeftBar";
import {TopBar} from "./components/Bar/TopBar.jsx";
import {Analyze} from "./views/Analyze/Analyze.jsx";

function App() {

  return (
    <div className="App">
        <>
            <div className="topbar">
                <TopBar/>
            </div>
            <div className="bottomarea">
                <div className="leftbar"
                     style={{
                         marginTop:"20px",
                         boxSizing:"border-box"
                }}>
                    <LeftBar/>
                </div>
                <div className="mainroutearea">
                    <Analyze/>
                </div>
            </div>
        </>
    </div>
  )
}

export default App
