import { useLocation, Navigate } from 'react-router-dom';

export default function RequireAuth({ children }: { children: JSX.Element }) {
    let location = useLocation();
    let isLogin = localStorage.getItem("login");
    if (isLogin) {
        return children;
    } else {
        return <Navigate to="/login/signin" state={{ from: location }} replace />;
    }
}