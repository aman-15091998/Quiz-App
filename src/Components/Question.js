import styles from "./components.module.css";
import { useDispatch, useSelector } from "react-redux"
import { quizActions, quizSelector } from "../features/quizSlice"
import { Timer } from "./Timer";

const Question=({answers, setAnswers})=>{
    const {currentQuestion, questionNumber, questionArr, status, score}=useSelector(quizSelector);

    function handleChange(e, opt){
        //updating selections in the answer state
        if(e.target.type=="radio"){
            setAnswers([opt]);     // simply updating the selection in case of radios
        }else{
            let index=answers.findIndex(ans=>ans===opt);   // adding/removing the selection in case of checkboxes
            if(index==-1){
                setAnswers([...answers, opt]);    
            }else{
                let arr=[...answers];
                arr.splice(index, 1);
                setAnswers(arr);
            }
        }
    }
    
    return (
        <>
            <p className="my-1">You have answered {questionNumber} out of {questionArr.length} questions</p>
            {status?<div><Timer seconds={30}/></div>:<></>}
            <h5>{currentQuestion.question}</h5>
            <p>{currentQuestion.type==="single"?"Choose the correct option!":"Multiple correct answers are possible!"}</p>
            <div className={styles.optionsDiv}>
                {currentQuestion.type==="single"?   
                <>
                    {currentQuestion.options.map((opt, index)=>(   //rendering radios
                    <div key={index} className={styles.options}>
                        <input id={opt} type="radio" value={opt} name="radio" onChange={(e)=>handleChange(e, opt)} checked={answers.includes(opt)}/>
                        <label htmlFor={opt}>{opt}</label>
                    </div>))}
                </>
                :
                <>
                    {currentQuestion.options.map((opt, index)=>(   //rendering checkboxes
                    <div key={index} className={styles.options}>
                        <input id={opt} type="checkbox" value={opt} onChange={(e)=>handleChange(e, opt)} checked={answers.includes(opt)}/>
                        <label htmlFor={opt}>{opt}</label>
                    </div>))}
                </>}
            </div>
        </>
    )
}

export default Question;