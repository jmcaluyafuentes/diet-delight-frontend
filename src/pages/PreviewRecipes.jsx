import React from 'react';
import Footer from '../components/Footer.jsx';

const PreviewRecipes = ({ recipes }) => {
    if (recipes.length === 0) {
        return (
        <>
          <div className="container"><p className="has-text-centered">No recipes found.</p></div>
          <div className="mt-6 pt-6">
            <Footer />
          </div>
        </>
        );
    }

    return (
      <>
        <div className="container">
          <div className="columns is-multiline">
              {recipes.map(recipe => (
                  <div key={recipe.id} className="column is-one-third">
                      <div className="recipe card">
                          <div className="card-image">
                              <figure className="image">
                                  <img src={recipe.image} alt={recipe.title} />
                              </figure>
                          </div>
                          <div className="card-content">
                              <div className="media">
                                  <div className="media-content">
                                      <p className="title is-4">{recipe.title}</p>
                                  </div>
                              </div>
                              <div className="content">
                                  {recipe.description}
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
          
        </div>
        <div className="mt-6 pt-6">
            <Footer />
        </div>
      </>
    );
};

export default PreviewRecipes;
