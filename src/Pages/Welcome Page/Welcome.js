import styles from "./welcome.module.css";
import { useEffect, useState } from "react"
import data from "../../data.json"
import { TagComponent } from "../../Components/TagComponent";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { tagSelector } from "../../features/tagSlice";
import { quizSelector } from "../../features/quizSlice";

export const Welcome=()=>{
    const {tags}=useSelector(tagSelector);  //from store
    const {status}=useSelector(quizSelector); //from store
    const [page, setPage]=useState(1);   //for storing the page number
    const navigate=useNavigate();
    useEffect(()=>{ //going back to quiz is status is true 
        if(status)
            navigate("/quiz");
    },[status])
    const allTags= data.uniqueTags;  //getting all tags from json file

    function nextPage(){ 
        if(page<5)
        setPage(page+1);
    }
    function prevPage(){
        if(page>1)
        setPage(page-1);
    }
    function goToQuiz(){ 
        navigate("/quiz");
    }
    // console.log(allTags[0]);
    return (
        <div className={styles.welcomeDiv}>
            <h2 className="text-center my-2">Welcome to the Quiz App</h2>
            <h5 className="text-center my-1">Please select tags (max: 20)</h5>
            <TagComponent alltags={allTags} page={page} />
            <div className={styles.paginationDiv}>
                <span onClick={prevPage}>Prev</span>
                <span>{page} of 5</span>
                <span onClick={nextPage}>Next</span>
            </div>
            <button className="btn btn-primary my-1" disabled={tags.length==0} onClick={goToQuiz}>Done!</button>
        </div>
    )
}