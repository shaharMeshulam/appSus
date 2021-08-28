import { KeepApp } from '../apps/keep/pages/note-index.jsx'

const { Route } = ReactRouterDOM

export function AppKeep() {
    return (
        <main className="app-keep flex direction-column">
            <Route path="/keep/" component={KeepApp} />
        </main>
    )
}