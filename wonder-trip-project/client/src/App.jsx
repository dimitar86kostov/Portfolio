import { Routes, Route } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./Layout";

import TripsList from "./components/tripsList/TripsList"
import Home from "./components/home/Home"
import Details from "./components/details/Details"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import CreateTrip from "./components/createTrip/CreateTrip"
import Logout from "./components/logout/Logout"
import Edit from "./components/edit/Edit"
import Delete from "./components/delete/Delete"
import NotFound from "./components/404/NotFound"
import EditComment from "./components/details/comments/editComment/EditComment"
import ErrorBoundary from './components/ErrorBoundary'
import PrivateGuard from "./common/PrivateGuard"

function App() {


  return (

    <AuthContextProvider >

      <ToastContainer position="top-right" autoClose={3000} />

      <ErrorBoundary>
        <Routes>

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<TripsList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateGuard />} >
              <Route path="/create" element={<CreateTrip />} />
              <Route path="/catalog/:tripId/edit" element={<Edit />} />
              <Route path="/catalog/:tripId/delete" element={<Delete />} />
              <Route path="/logout" element={<Logout />} />
            </Route>

            <Route path="/catalog/:tripId/*" element={<Details />} />
            <Route path=":tripId/comment/:commentId/edit" element={<EditComment />} />

            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
      </ErrorBoundary>

    </AuthContextProvider >

  )
}

export default App
