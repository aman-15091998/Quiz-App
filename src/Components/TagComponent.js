import { useEffect, useState } from "react"
import styles from "./components.module.css";
import { useDispatch, useSelector } from "react-redux";
import { tagActions, tagSelector } from "../features/tagSlice";
export const TagComponent=({alltags, page})=>{
    const {tags}=useSelector(tagSelector);
    const dispatch=useDispatch();

    const data=alltags.slice((page-1)*20, (page-1)*20+20);
    
    function handleSelection(e){
        const val=e.target.value;
        const ind=tags.findIndex(v=>v==val);
        if(ind==-1){
            if(tags.length<20)
                dispatch(tagActions.addTag(val));
        }else{
            dispatch(tagActions.removeTag(ind));
        }
        console.log(tags);
    }
    return (
        <div className={styles.tagDiv}>
                {data.map((t, index)=>{
                    return <div className={styles.tags} key={index}>
                        <input id={t} type="checkbox" value={t} onChange={handleSelection} checked={tags.includes(t)}/>
                        <label htmlFor={t}>{t}</label>
                    </div>
                }
                )}
        </div>
    )
}