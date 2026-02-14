import React, { useEffect, useState } from 'react';
import styles from '../../public/assets/styles/Home3.module.css'

const CountdownTimer = ({ targetDate, text }) => {
    const useCountdown = (targetDate) => {
        const countDownDate = new Date(targetDate).getTime();

        const [countDown, setCountDown] = useState(
            countDownDate - new Date().getTime()
        );

        useEffect(() => {
            const interval = setInterval(() => {
                setCountDown(countDownDate - new Date().getTime());
            }, 1000);

            return () => clearInterval(interval);
        }, [countDownDate]);

        return getReturnValues(countDown);
    };

    const getReturnValues = (countDown) => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

        return [days, hours, minutes, seconds];
    };

    const [days, hours, minutes, seconds] = useCountdown(targetDate);
    if (days + hours + minutes + seconds <= 0) {
        return null;
    } else {
        return (
            <>
                <div className={` ${styles.countdown} countdown`}>
                    <div className={`${styles.countdown_timer} timer`}>
                        <div className={`${styles.countdown_timer_group} group`}>
                            <span className={`${styles.countdown_timer_group_number} number`}>{days}</span>
                            <span className={styles.countdown_timer_group_language}>{text.days}</span>
                        </div>
                        <div className={`${styles.countdown_timer_group} group`}>
                            <span className={`${styles.countdown_timer_group_number} number`}>{hours}</span>
                            <span className={styles.countdown_timer_group_language}>{text.hrs}</span>
                        </div>
                        <div className={`${styles.countdown_timer_group} group`}>
                            <span className={`${styles.countdown_timer_group_number} number`}>{minutes}</span>
                            <span className={styles.countdown_timer_group_language}>{text.mins}</span>
                        </div>
                        <div className={`${styles.countdown_timer_group} group`}>
                            <span className={`${styles.countdown_timer_group_number} number`} suppressHydrationWarning={true}>{seconds}</span>
                            <span className={styles.countdown_timer_group_language}>{text.secs}</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default CountdownTimer;
