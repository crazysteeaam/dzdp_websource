import './UserBookBox.scss'


export const UserBookBox = ({avatarurl, book}) => {
    console.log(book)

    return (
        <>
            <div className="user-book-box">
                <div className="avatar">
                    <img src={avatarurl} alt=""/>
                </div>
                <div className="text">
                    {/*book是个列表，循环遍历book的内容，每个一行*/}
                    {book.map((item, index) => {
                        return (
                            <div key={index}
                                 style={{fontSize: "12px", textAlign: "center", width: "80%", margin: "0 auto"}}>
                                <span>{item}</span>
                            </div>
                        )

                    })
                    }
                </div>
            </div>
        </>
    )
}