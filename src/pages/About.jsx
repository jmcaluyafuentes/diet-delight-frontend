import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <main className="section is-flex is-align-item-center is-justify-content-center">
            <div className="box" style={{ maxWidth: "80vw" }}>
                {/* Page title */}
                <h1 className="title is-2 has-text-centered">About</h1>
                <div className="has-text-centered">
                    {/* Description of the app and its purpose */}
                    <p className="mb-5">At Fit Life Gym, we believe that fitness is more than just about the workouts — it is also about nourishing your body with the right foods.</p>
                    <p className="mb-5">That is why we have developed a personalized meal planning tool tailored to help our members achieve their fitness objectives, from building muscle or endurance to shedding weight.</p>
                    <p className="mb-5">Whether you are looking for high-protein meals to support muscle gain or low-carb options for weight loss, our app has you covered.</p>
                </div>
                <div className="columns is-centered has-text-centered">
                    {/* Section for Print Recipes feature */}
                    <div className="column is-one-half-desktop is-full-mobile mb-5">
                        <p>Additionally, our Print Recipes feature allows you to select and print recipes in PDF format, making meal planning and grocery shopping hassle-free.</p>
                        {/* Button to navigate to the search page */}
                        <Link to="/search" className="button is-warning mt-5">
                            Search Recipes
                        </Link>
                    </div>
                    {/* Section for Featured Recipes */}
                    <div className="column is-one-half-desktop is-full-mobile mb-5">
                        <p>We also offer a curated list of Featured Recipes, so you can explore and try out new meals that complement your fitness journey.</p>
                        <p className="mb-5 is-hidden-mobile is-hidden-desktop"></p>
                        {/* Button to navigate to home page in featured recipes section */}
                        <Link to="/" className="button is-warning mt-5" onClick={() => {
                            const element = document.getElementById("featuredrecipes");
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}>
                            Featured Recipes
                        </Link>
                    </div>
                </div>
                {/* Closing statement */}
                <div>
                    <p className="has-text-centered">With these tools, Fit Life Gym is committed to supporting your health and fitness, both inside and outside the gym.</p>
                </div>
            </div>
        </main>
    );
};

export default About;