import { lazy, Suspense, useEffect, useState } from "react"
import styles from "./quiz.module.css";
import { useDispatch, useSelector } from "react-redux"
import { tagSelector } from "../../features/tagSlice"
import { quizActions, quizSelector } from "../../features/quizSlice";
import data from "../../data.json";
import { top10ByTagsCount } from "../../utils/filterQuestions";
import { useNavigate } from "react-router";
import { calculateMarks } from "../../utils/calculateMarks";
// import { Question } from "../../Components/Question";

const Question = lazy(() => import("../../Components/Question.js"));

export const Quiz=()=>{
    const {tags}=useSelector(tagSelector);
    const {currentQuestion, questionNumber, status, score, questionArr}=useSelector(quizSelector); 
    const [answers, setAnswers]=useState([]);
    const [marks, setMarks]=useState(0);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(() => {
        
        window.history.pushState(null, '', window.location.href);

        const handleBack = (event) => {
           
            if (window.confirm('Are you sure you want to leave this page?')) {
                navigate("/");  //redirecting the user to welcome page
            } else {
                window.history.pushState(null, '', window.location.href);  // Preventing the user from going back
            }
        };

        window.addEventListener('popstate', handleBack);

        return () => {
            window.removeEventListener('popstate', handleBack);
        };
    }, [navigate]);

    useEffect(()=>{
        console.log(questionArr);
        if(tags.length==0)  // navigating to welcome page is no tags are selected
            navigate("/");
        const questions=data.questions;
        const arr=top10ByTagsCount(questions, tags); //getting top 10 questions by matching tag count
        dispatch(quizActions.setQuestionArr(arr));
    }, []); 
    
    //updating the score state and reseting marks, answer states when the question number changes because of timeout or submit action 
    useEffect(()=>{
        dispatch(quizActions.updateScore(marks));
        setMarks(0);
        setAnswers([]);
    }, [questionNumber]);
    
    //updating the marks state whenever answer state updates
    useEffect(()=>{
        //updating marks
        if(currentQuestion!=null){
            const m=calculateMarks(currentQuestion, answers);
            setMarks(m);
        }
    }, [answers])

    function startQuiz(){
        dispatch(quizActions.startQuiz());
    }

    function submitAnswer(){
        dispatch(quizActions.setNextQuestion());
    }

    return (
        <div className={styles.quizDiv}>
            {!status?<h3 className="text-center my-4">Your last score: {score}</h3>:<></>}
           {!status?
           <>
            <h2 className="text-center my-4">Start the Quiz</h2>
            <button className="btn btn-primary" onClick={startQuiz}>Start Quiz</button>
           </>
           :
           <div className={styles.questionDiv}>
                <Suspense fallback={<div>Loading question...</div>}>
                    <Question answers={answers} setAnswers={setAnswers} />
                </Suspense>
                <button className="btn btn-primary my-2" onClick={()=>submitAnswer()}>Submit</button>
           </div>
           } 
        </div>
    )
}