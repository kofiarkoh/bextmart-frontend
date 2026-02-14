import React, { useState, useRef } from 'react';
import Popup from "reactjs-popup";
import Image from 'next/image'
import emailjs from '@emailjs/browser';
import useTranslation from './useTranslation'
import { displayRating } from './Tools'
import { SVGClose } from '../../public/assets/SVG';
import styles from '../../public/assets/styles/ProductPage.module.css'

const ProductPageReview = ({ data }) => {
    const { t, locale } = useTranslation();
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [status, setStatus] = useState(t("Review_form_submit"));    
    const [classStatus, setClassStatus] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewData, setReviewData] = useState({
        review_avatar: "",
        review_name: "",
        review_country: "",
        review_text: "",
        review_rating: 0,
    });
    const { review_avatar, review_name, review_country, review_text } = reviewData;
    const ref_name = useRef(null);
    const ref_text = useRef(null);
    const inputChange = e => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    }

    function reviewSubmit(e) {
        e.preventDefault();
        if (reviewData.review_name != '') {
            if (reviewData.review_text != '') {
                reviewData.review_rating = rating;     
                setStatus(t("Review_form_submitting"));    
                setClassStatus(styles.review_submit_button_loading);       
                emailjs.send('service_tpg1r0h', 'template_2wp5lco', reviewData, 'dCVeBV20VeZr1KjP4')
                    .then((result) => {
                        setStatus(t("Review_form_submitcomplete")); 
                        setClassStatus(styles.review_submit_button_complete);
                        setTimeout(() => {                            
                            setStatus(t("Review_form_submit"));
                            setClassStatus('');
                            setOpen(false);
                        }, 1200);                       
                    }, (error) => {
                        console.log('FAILED...', error);
                    });
            } else {
                ref_text.current.focus();
            }
        } else {
            ref_name.current.focus();
        }
    }

    function renderReview() {
        return (
            data.map((review, index) => (
                <div className='review-element' key={index}>
                    <div className='review-avatar'>
                        <Image src={review.avatar} alt='' width={100} height={100} />
                        </div>
                    <div className='review-content'>
                        <div className='reivew-name'>{review.name} ({review.country})</div>
                        <div className='reivew-rating'>{displayRating(review.rating)}</div>
                        <div className='reivew-text'>{review.content}</div>
                    </div>
                </div>
            ))
        )
    }

    return (
        <>
            <div className='product-review-box'>
                <div className="box-divider">
                    <h4 className="box-title">{t("Review_title")}</h4>
                </div>
                <div className='product-review-content'>
                    <div className='review-list'>
                        {
                            (data.length > 1) ? renderReview() : <>
                                <div className='no-review'>{t("Review_nothing")}</div>
                            </>
                        }
                    </div>
                    <div className='review-add'>
                        <button type="button" className="button button--primary" onClick={() => setOpen(o => !o)}>
                            <span className="button__text">{t("Review_button")}</span>
                        </button>
                        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                            <div className="modal__layout modal-open review-popup">
                                <div className="modal__close" onClick={closeModal}></div>
                                <div className="modal__content">
                                    <div className="modal__header">
                                        <span className="modal__close-icon" onClick={closeModal}><SVGClose /></span>
                                    </div>
                                    <div className="modal__body">
                                        <form method="post" id="ReviewForm" className={`review-form`} onSubmit={(e) => reviewSubmit(e)}>
                                            <input type="hidden" name="form_type" value="review" />
                                            <input type="hidden" name="utf8" value="✓" />
                                            <div className="review__fields row">
                                                <div className={`col-12 col-sm-6`}>
                                                    <div className="field">
                                                        <input className={`field__input`} type="text" id="review_name" name="review_name" value={review_name} placeholder={t("Review_form_name")} onChange={inputChange} onFocus={inputChange} ref={ref_name} />
                                                        <label className="field__label" htmlFor="review_name">{t("Review_form_name")}</label>
                                                    </div>
                                                </div>
                                                <div className={`col-12 col-sm-6`}>
                                                    <div className="field">
                                                        <input className={`field__input`} type="text" id="review_country" name="review_country" value={review_country} placeholder={t("Review_form_country")} onChange={inputChange} onFocus={inputChange} />
                                                        <label className="field__label" htmlFor="review_country">{t("Review_form_country")}</label>
                                                    </div>
                                                </div>
                                                <div className={`col-12 col-sm-12`}>
                                                    <div className="field">
                                                        <input className={`field__input`} type="text" id="review_avatar" name="review_avatar" value={review_avatar} placeholder={t("Review_form_avatar")} onChange={inputChange} onFocus={inputChange} />
                                                        <label className="field__label" htmlFor="review_avatar">{t("Review_form_avatar")}</label>
                                                    </div>
                                                </div>
                                                <div className="star-rating">
                                                    {[...Array(5)].map((star, index) => {
                                                        index += 1;
                                                        return (
                                                            <button
                                                                type="button"
                                                                key={index}
                                                                className={`${styles.rating_button} ${index <= rating ? styles.rating_on : styles.rating_off}`}
                                                                onClick={() => setRating(index)}
                                                            >
                                                                <span className="star">&#9733;</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                <div className={`col-12 col-sm-12`}>
                                                    <div className="field">
                                                        <textarea rows="10" className={`field__input`} type="text" id="review_text" name="review_text" value={review_text} placeholder={t("Review_form_text")} onChange={inputChange} onFocus={inputChange} ref={ref_text} ></textarea>
                                                        <label className="field__label" htmlFor="review_text">{t("Review_form_text")}</label>
                                                    </div>
                                                </div>
                                                <div className="contact__button">
                                                    <button type="submit" className={`${styles.contact__button_button} button contact-submit-button ${classStatus}`}>
                                                        {status}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductPageReview;
