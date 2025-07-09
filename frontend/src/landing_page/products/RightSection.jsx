import React from 'react';
import "./RightSection.css";

function RightSection({image, title, paragraph, firstLink, alt}) {
    return ( 
        <section className='product-rightsection-section'>
            <div className='container'>
                <div className='rightsection-text'>
                    <h1>{title}</h1>

                    <p>
                        {paragraph}
                    </p>

                    <a>{firstLink} <i className="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className='rightsection-image'>
                    <a><img src={image} alt={alt}/></a>
                </div>
            </div>
        </section>
    );
}

export default RightSection;