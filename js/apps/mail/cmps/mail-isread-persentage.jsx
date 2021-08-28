export function MailIsreadPersentage({isReadPersentage}) {
    console.log('isReadPersentage', isReadPersentage)
    return (
        <div className="is-read-persentage flex">
            <div className="read-persentage" style={{ flexBasis: isReadPersentage + '%' }}></div>
            <div className="unread-persentage"></div>
        </div>
    )
}