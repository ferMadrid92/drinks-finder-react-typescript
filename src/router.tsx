import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"

const IndexPage = lazy(() => import('./views/IndexPage'))
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))
const GenerateAI = lazy(() => import('./views/GenerateAI'))

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />} >
                <Route path='/' element={
                  <Suspense fallback="Loading...">
                    <IndexPage/>
                  </Suspense>
                } index />
                <Route path='/favorites' element={
                  <Suspense fallback="Loading...">
                    <FavoritesPage/>
                  </Suspense>
                } />
                <Route path='/generate' element={
                  <Suspense fallback="Loading...">
                    <GenerateAI/>
                  </Suspense>
                } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
