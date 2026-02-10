import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UsersPage from '../pages/UsersPage'

export default function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UsersPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
