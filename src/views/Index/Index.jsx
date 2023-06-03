import './Index.scss'
import {useMatch} from "react-router-dom";
import {useEffect} from "react";


export const Index = () => {

    const match = useMatch('/index');

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 工作台'
        }
    }, [match]);

    return (
        <div className="index">
            <p>欢迎登录</p>
            大众点评数据分析系统！
        </div>
    )
}