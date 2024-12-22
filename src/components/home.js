
import energy from '../assets/energy.jpg';
import {Helmet} from "react-helmet";



function Home() {
    return(
        <div className="card mt-5 shadow-lg bg-dark">
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="row g-0">
                <div className="col-4">
                <img src={energy} className="img-fluid rounded m-4 ms-5" alt="energy"/>
                </div>
                <div className='col-1'></div>
                <div className="col-6 ms-3 d-flex flex-column">
                    <div className="card-body text-center">
                        <h1 className="card-title my-5 text-light">Welcome to a renewable world</h1>
                        <h5 className="card-text mt-5 mb-4 text-light">Solar Energy</h5>
                        <p className="card-text"><small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique consectetur risus, id vehicula ex tincidunt nec. Donec pellentesque, arcu ut rhoncus ultrices, massa sapien maximus tortor, sagittis elementum massa eros eu dui. Maecenas placerat, est a lacinia sodales, velit turpis ultricies diam, eu pulvinar tortor metus ac.</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;