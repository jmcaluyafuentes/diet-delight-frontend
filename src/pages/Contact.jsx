import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {

    return (
        <main className="section is-flex is-align-item-center is-justify-content-center">
            <div className="box" style={{maxWidth: "50vw"}}>
                <h1 className="title is-2 has-text-centered">Contact </h1>
                <div className="has-text-centered">

                    <p className="mb-5">Diet Delight was created by 3 aspiring Software Developers</p> 
                </div>
                <div className="is-flex has-text-centered mt-5 mb-5">
                    <div className="ml-5 mr-5">
                        <h3>John Fuentes</h3>
                        <Link to="https://github.com/jmcaluyafuentes" className="button is-warning mt-5">
                        Github
                        </Link>
                    </div>
                    <div className="ml-5 mr-5">
                        <h3>Branden Chiem</h3>
                        <Link to="https://github.com/duskpeyl" className="button is-warning mt-5">
                        Github
                        </Link>
                    </div>
                    <div className="ml-5 mr-5">
                        <h3>Hy Nguyen</h3>
                        <Link to="https://github.com/hynguyenduc" className="button is-warning mt-5">
                        Github
                        </Link>
                    </div>
                </div>


            </div> 
        </main>
    );
};

export default Contact;