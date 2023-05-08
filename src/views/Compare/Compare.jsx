import './Compare.scss'
import {Space, Spin} from "antd";
import {useMatch} from "react-router-dom";
import {useEffect, useState} from "react";

export const Compare = () => {

    const match = useMatch('/compare');

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 竞争态势'
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
                    <div className="compare">
                        对比界面
                    </div>
                </>
            )
}