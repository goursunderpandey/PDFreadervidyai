import React from "react";
import Navbar from './Nvabar';
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Navbar />

            <div className="container mt-5">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to PDF Reader and Extractor</h1>
                    <p className="lead">Explore the capabilities of our PDF tool.</p>
                    <hr className="my-4" />
                    <p>Upload your PDF and get started!</p>
                    <NavLink to="/uploadpdf" className="btn btn-primary btn-lg" role="button">Upload PDF</NavLink>
                </div>
            </div>
        </>
    );
}

export default Home;
