import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UsersPage from '../pages/UsersPage'
import Footer from '../core/Footer'

export default function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UsersPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}
