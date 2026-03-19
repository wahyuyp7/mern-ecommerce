import { Navigate, Outlet } from "react-router-dom"

const AdminRoute = () => {
  const userInfo = localStorage.getItem("userInfo")

  if (!userInfo) {
    return <Navigate to="/admin/login" />
  }

  const user = JSON.parse(userInfo)

  if (!user.isAdmin) {
    return <Navigate to="/admin/login" />
  }

  return <Outlet />
}

export default AdminRoute
