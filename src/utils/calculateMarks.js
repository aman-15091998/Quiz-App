export const calculateMarks=(currentQuestion, answers)=>{
    let m=0;
        if(currentQuestion.type=="single"){                 
            if(answers[0]==currentQuestion.correct[0])     
                m+=4;                                       //4marks for correct answer
            else
                if(answers.length>0)   
                    m-=2;                                   //-2 marks for incorrect answer
        }else{                                              
            let wrong=false;
            m=answers.reduce((acc, ans)=>{
                if(currentQuestion.correct.includes(ans))
                    acc+=1;                                 //1 marks for every correct selection
                else{
                    wrong=true;
                    acc-=1;                                 //-1 marks for every correct selection
                }
                return acc;
            }, 0);
            if(!wrong && answers.length===currentQuestion.correct.length)    //4marks for selecting all the right options and not wrong answers
                m=4;
        }
        return m;
}