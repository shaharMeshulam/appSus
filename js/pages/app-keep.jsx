import { KeepApp } from '../apps/keep/pages/note-index.jsx'
import { NoteDetails } from '../apps/keep/pages/note-details.jsx'

const { Route, Switch } = ReactRouterDOM

export function AppKeep() {
    return (
        <main className="app-keep flex direction-column">
            <Switch>
                <Route path="/keep/:noteId" component={NoteDetails} />
                <Route path="/keep/" component={KeepApp} />
            </Switch>
        </main>
    )
}