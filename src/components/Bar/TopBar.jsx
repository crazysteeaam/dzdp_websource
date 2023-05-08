import './TopBar.scss'

export const TopBar = () => {

    return (
        <>
            <div className="topbar">
                <div className="leftarea">
                    <div className="logo">
                        <img src="/vite.svg" alt="logo" />
                    </div>
                    <div className="title">大众点评数据分析系统</div>
                </div>
                <div className="rightarea">
                    <img src="/src/static/topbarright.png" alt=""/>
                </div>
            </div>


        </>
    )
}