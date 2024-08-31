import React from 'react';

const Contact = () => {
    return (
        <main className="section is-flex is-align-items-center is-justify-content-center">
            <div className="box" style={{ maxWidth: "80vw" }}>
                {/* Title of the contact page */}
                <h1 className="title is-2 has-text-centered">Contact</h1>
                <div className="has-text-centered mb-5">
                    {/* Introduction paragraph about the developers */}
                    <p className="mb-5">Diet Delight was developed by three aspiring Software Developers.</p>
                </div>
                <div className="columns is-centered has-text-centered">
                    {/* Column for John Fuentes */}
                    <div className="column is-one-third-desktop is-full-mobile mb-5" >
                        <h3>John Fuentes</h3>
                        <a href="https://github.com/jmcaluyafuentes" className="button is-warning mt-5" target="_blank" rel="noopener noreferrer">
                            Github
                        </a>
                    </div>
                    {/* Column for Hy Nguyen */}
                    <div className="column is-one-third is-full-mobile mb-5">
                        <h3>Hy Nguyen</h3>
                        <a href="https://github.com/hynguyenduc" className="button is-warning mt-5" target="_blank" rel="noopener noreferrer">
                            Github
                        </a>
                    </div>
                    {/* Column for Branden Chiem */}
                    <div className="column is-one-third is-full-mobile mb-5">
                        <h3>Branden Chiem</h3>
                        <a href="https://github.com/duskpeyl" className="button is-warning mt-5" target="_blank" rel="noopener noreferrer">
                            Github
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;