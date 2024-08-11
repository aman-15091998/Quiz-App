import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    status:false,
    questionNumber:0,
    questionArr:[], 
    score:null,
    currentQuestion:null
  },
  reducers: {
    startQuiz:(state)=>{      //for starting the quiz setting default values
        state.status=true;
        state.questionNumber=0;
        state.currentQuestion=state.questionArr[0];
        state.score=null;
    },
    stopQuiz:(state)=>{     //for stoping the quiz
      state.status=false;
      state.questionNumber=0;
      state.currentQuestion=null;
    },
    setQuestionArr:(state, action)=>{     //for adding questions to the state
        state.questionArr=action.payload;
    },
    setNextQuestion:(state)=>{    //for updating the question to the next one
        if(state.status){
          if(state.questionNumber<state.questionArr.length-1){
            state.questionNumber++;
            state.currentQuestion=state.questionArr[state.questionNumber];
          }else{   // for stopping the quiz when all questions are covered
            state.status=false;
            state.questionNumber=0;
            state.currentQuestion=null;
          }
        }
    },
    updateScore:(state, action)=>{   //for updating the score
        state.score+=action.payload;
    }
  },
});
export const quizReducer=quizSlice.reducer;
export const quizActions=quizSlice.actions;
export const quizSelector=(state)=>state.quizReducer;