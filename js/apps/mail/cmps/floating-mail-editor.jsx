import { MailEditor } from "./mail-editor.jsx";

export function FloatingMailEditor({ onCloseEditor, mail }) {
    return (
        <div className="floating-mail-editor flex direction-column">
            <div className="floating-mail-editor-header flex justify-between">
                <h4>New mail</h4>
                <span className="btn material-icons-outlined" onClick={onCloseEditor}>
                    close
                </span>
            </div>
            <MailEditor onMailSent={onCloseEditor} mail={mail}/>
        </div>
    )
}