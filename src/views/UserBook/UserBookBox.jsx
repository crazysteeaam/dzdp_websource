import './UserBookBox.scss'


export const UserBookBox = ({ avatarurl,book }) => {
    return (
        <>
            <div className="user-book-box">
                <div className="avatar">
                    <img src={avatarurl} alt=""/>
                </div>
                <div className="text">
                    {book}
                </div>
            </div>
        </>
    )
}