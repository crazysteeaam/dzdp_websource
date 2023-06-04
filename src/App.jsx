import {useState} from 'react'
import './App.scss'
import {LeftBar} from "./components/Bar/LeftBar";
import {TopBar} from "./components/Bar/TopBar.jsx";
import {Analyze} from "./views/Analyze/Analyze.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserBook} from "./views/UserBook/UserBook.jsx";
import {Marketing} from "./views/Marketing/Marketing.jsx";
import {Compare} from "./views/Compare/Compare.jsx";
import {Index} from "./views/Index/Index.jsx";
import {Again} from "./views/Compare/Again/Again.jsx"
import {Raredata} from "./views/Raredata/Raredata.jsx";
import {Topdishes} from "./views/Analyze/Topdishes/Topdishes.jsx";
import {Commentlevel} from "./views/Analyze/Commentlevel/Commentlevel.jsx";
import {Marketshare} from "./views/Compare/Marketshare/Marketshare.jsx";
import {Apriori} from "./views/UserBook/Apriori/Apriori.jsx";

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
                                <Route exact path="/" element={<Index/>}/>
                                <Route exact path="/index" element={<Index/>}/>
                                <Route exact path="/analyze" element={<Analyze/>}/>
                                <Route exact path="/analyze/commentlevel" element={<Commentlevel/>}/>
                                <Route exact path="/analyze/topdishes" element={<Topdishes/>}/>
                                <Route exact path="/userbook" element={<UserBook/>}/>
                                <Route exact path="/userbook/apriori" element={<Apriori/>}/>
                                <Route exact path="/marketing" element={<Marketing/>}/>
                                <Route exact path="/compare" element={<Compare/>}/>
                                <Route exact path="/compare/again" element={<Again/>}/>
                                <Route exact path="/compare/marketshare" element={<Marketshare/>}/>
                                <Route exact path="/raredata" element={<Raredata/>}/>
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </>
        </div>
    )
}

export default App
