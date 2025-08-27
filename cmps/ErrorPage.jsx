const {Link} = ReactRouterDOM

export function ErrorPage(){


    return(
        <div>
                <h1>Oops... Page Not Found</h1>
                <h3>Error <span className="red">404</span> </h3>
                <button><Link to="/">Back home</Link></button>
        </div>
    )
}