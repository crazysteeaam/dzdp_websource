import './Marketing.scss'
import {Space, Spin} from "antd";
import {useMatch} from "react-router-dom";
import {useEffect, useState} from "react";

export const Marketing = () => {

    const match = useMatch('/marketing');

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 精准营销'
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
                <div className="marketing">
                    精准营销界面
                </div>

        </>
    )
}