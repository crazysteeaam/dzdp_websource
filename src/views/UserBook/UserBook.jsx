import './UserBook.scss'
import {useMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {Space, Spin} from "antd";

export const UserBook = () => {

    const match = useMatch('/userbook');

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 用户画像'
        }
    }, [match]);

    const [Loading, setLoading] = useState(false)

    return (
        <>
            {
                Loading &&
                <div className="spin">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Spin tip="Loading" size="large">
                           <div className="content" />
                        </Spin>
                    </Space>
                </div>
            }
            <div className="userbook">
                用户画像界面
            </div>
        </>
    )
}