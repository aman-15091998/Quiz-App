import { Link } from "react-router-dom"

export const Error=()=>{
    return (
        <div class="container text-center">
            <h1>404</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Link to="/">Go back to Homepage</Link>
        </div>
    )
}