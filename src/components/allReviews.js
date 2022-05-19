import React from 'react';

/* this will show all reviews on front end and should probably 
also be only visible to Admins since reviews will be attached to
their respective products */


const ReviewsList = (props) => {
    const {reviews} = props
    return(
        <>
            <h1>REVIEWS</h1>
            <div> {reviews.map(review =>
                <div className='reviewCard' key={review.id}>
                    <h3>Rating: {`${review.starRating}`}</h3>
                    <p>{`${review.body}`}</p>
                </div>
            )}
            </div>
        </>
    )
}


export default ReviewsList