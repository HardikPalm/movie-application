// EmptyPage.js
import React from 'react';

const EmptyPage = () => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h2 className="text-white mb-4">Your movie list is empty</h2>
        <button className="btn btn-addmovie">Add a new movie</button>
      </div>
    </div>
  );
};

export default EmptyPage;
