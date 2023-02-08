import React from "react";

const MovieDetailsPage = () => {

    return (
        <section id="movie-example" className="view-section">
            <div className="container">
                <div className="row bg-light text-dark">
                    <h1>Movie title: Black Widow</h1>

                    <div className="col-md-8">
                        <img className="img-thumbnail" src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg"
                            alt="Movie" />
                    </div>
                    <div className="col-md-4 text-center">
                        <h3 className="my-3 ">Movie Description</h3>
                        <p>Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous
                            conspiracy
                            with ties to her past arises. Comes on the screens 2020.</p>
                        <a className="btn btn-danger" href="/">Delete</a>
                        <a className="btn btn-warning" href="/">Edit</a>
                        <a className="btn btn-primary" href="/">Like</a>
                        <span className="enrolled-span">Liked 1</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovieDetailsPage;