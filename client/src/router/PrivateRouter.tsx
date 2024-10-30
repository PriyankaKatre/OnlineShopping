import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../util/AuthUtils";

// let PrivateRoute = ({ element: Element, ...rest }: any) => {
//     console.log('Element', Element)
//     //console.log('...rest', ...rest)
//     return <Route {...rest} render={(props: any) => {
//         return !isLoggedIn() ? <Navigate to="/user/login"/> : <Element {...props}/>
//     }}/>
// };
function PrivateRoute({ children }: any) {
  return !isLoggedIn() ? <Navigate to="/user/login" /> : children;
}
export default PrivateRoute;
