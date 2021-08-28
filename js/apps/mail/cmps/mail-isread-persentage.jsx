export function MailIsreadPersentage({isReadPersentage}) {
    return (
        <div className="is-read-persentage flex">
            <div className="read-persentage" style={{ flexBasis: isReadPersentage + '%' }} title="Read"></div>
            <div className="unread-persentage" title="Not read"></div>
        </div>
    )
}