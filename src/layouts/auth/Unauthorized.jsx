import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Unauthorized</h1>
            <p>You do not have access to this page.</p>
            <button 
                onClick={() => goBack()} 
                className="btn btn-primary   d-md-inline-block mb-2"
                >
                <i className="fa-solid fa-arrow-left mr-1" />
                Go Back
                </button>
        </div>
    );
};

export default Unauthorized;