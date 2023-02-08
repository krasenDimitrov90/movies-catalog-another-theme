import React from "react";

const AddMoviePage = () => {

    return (
        <section id="add-movie" className="view-section">
            <form className="text-center border border-light p-5" action="#" method="">
                <h1>Add Movie</h1>
                <div className="form-group">
                    <label for="title">Movie Title</label>
                    <input id="title" type="text" className="form-control" placeholder="Title" name="title" value="" />
                </div>
                <div className="form-group">
                    <label for="description">Movie Description</label>
                    <textarea className="form-control" placeholder="Description" name="description"></textarea>
                </div>
                <div className="form-group">
                    <label for="imageUrl">Image url</label>
                    <input id="imageUrl" type="text" className="form-control" placeholder="Image Url" name="imageUrl"
                        value="" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </section>
    );
};

export default AddMoviePage;