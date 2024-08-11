export const calculateMarks=(currentQuestion, answers)=>{
    let m=0;
        if(currentQuestion.type=="single"){
            if(answers[0]==currentQuestion.correct[0])
                m+=4;
            else
                if(answers.length>0)   
                    m-=2;
        }else{
            let wrong=false;
            m=answers.reduce((acc, ans)=>{
                if(currentQuestion.correct.includes(ans))
                    acc+=1;
                else{
                    wrong=true;
                    acc-=1;
                }
                return acc;
            }, 0);
            if(!wrong && answers.length===currentQuestion.correct.length)
                m=4;
        }
        return m;
}