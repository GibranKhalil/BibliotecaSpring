import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NormalPage } from "./interface/partials/normalPage"
import { HomePage } from "./pages/home"
import { DiscoverPage } from "./pages/discover"
import { MyBooksPage } from "./pages/myBooks"

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NormalPage />}>
                    <Route index element={<HomePage />} />
                    <Route path="/discover" element={<DiscoverPage />} />
                    <Route path="/books" element={<MyBooksPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}