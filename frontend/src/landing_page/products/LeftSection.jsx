import React from 'react';
import "./LeftSection.css";

function LeftSection({image, title, paragraph, firstLink, secondLink, alt}) {
    return ( 
        <section className="product-leftsection-section">
            <div className="container">
                <div className="leftsection-image">
                    <a><img src={image} alt={alt}/></a>
                </div>
                <div className='leftsection-text'>
                    <h1>{title}</h1>
                    <p>
                        {paragraph}
                    </p>

                    {
                        firstLink ?
                        <a className='leftsection-link-1'>{firstLink} <i className="fa-solid fa-arrow-right"></i></a> :
                        null
                    }
                    
                    {
                        secondLink ?
                        <a className='leftsection-link-2'>{secondLink} <i className="fa-solid fa-arrow-right"></i></a> :
                        null
                    }

                    <div className='leftsection-download-img'>
                        <a className='download-link-1'><img src="media/images/googlePlayBadge.svg" alt="playstore-link"/></a>
                        <a className='download-link-2'><img src="media/images/appstoreBadge.svg" alt="appstore-link"/></a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LeftSection;