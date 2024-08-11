import { useDispatch, useSelector } from "react-redux";
import styles from "./components.module.css";
import { useEffect, useState } from "react";
import { quizActions, quizSelector } from "../features/quizSlice";

export const Timer=({seconds})=>{
    const [timer, setTimer]=useState(seconds);
    const dispatch=useDispatch();
    const {questionNumber}=useSelector(quizSelector);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => {
                return prevTimer > 0 ? prevTimer - 1 : prevTimer;
            });
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, []);
    
    useEffect(() => {
        if (timer === 0) {
            dispatch(quizActions.setNextQuestion());
            setTimer(seconds);
        }
    }, [timer, dispatch]);
    useEffect(()=>{
        setTimer(seconds);
    }, [questionNumber])
    
    return (
        <div className={styles.timer}>
            {timer}
        </div>
    )
}