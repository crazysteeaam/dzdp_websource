import './UserBook.scss'
import {useMatch} from "react-router-dom";
import {useEffect} from "react";

export const UserBook = () => {

    const match = useMatch('/userbook');

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 用户画像'
        }
    }, [match]);

    return (
        <>用户画像界面</>
    )
}