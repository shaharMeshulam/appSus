export function MailStar({ isStared, onStarToggle }) {
    return (
        <React.Fragment>
            {!isStared && <span className="btn material-icons-outlined" onClick={onStarToggle}>
                star_outline
            </span>}
            {isStared && <span className="btn material-icons-outlined" onClick={onStarToggle}>
                star
            </span>}
        </React.Fragment>
    )
}