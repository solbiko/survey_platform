import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes} from '../lib/createRequestSaga';
import { delay, put, takeLatest, select, throttle } from 'redux-saga/effects';
import {Map, List} from 'immutable';

const ADD_QUESTION = 'question/add';
const DELETE_QUESTION = 'question/delete';
const EDIT_QUESTION_CONTENT = 'question/edit_question_content';
const EDIT_QUESTION_TYPE = 'question/edit_question_type';
const ADD_ANSWER = 'question/add_answer';
const DELETE_ANSWER = 'question/delete_answer';

export const addQuestion = createAction(ADD_QUESTION);
export const deleteQuestion = createAction(DELETE_QUESTION);
export const editQuestionContent = createAction(EDIT_QUESTION_CONTENT, ({ id, value, name }) => ({
    id, value, name
  }));
export const editQuestionType = createAction(EDIT_QUESTION_TYPE, ({ id, value, name }) => ({
id, value, name
}));
export const addAnswer = createAction(ADD_ANSWER, ({ id, value }) => ({
    id, value
  }));
export const deleteAnswer = createAction(DELETE_ANSWER, ({ id, aid }) => ({
    id, aid
  }));

export function* questionSaga() {
}

const initialState = 
List([
    Map({
        id : 1,
        questionType : "Sub",
        content : "질문을 입력해주세요",
        optionList : []
    }),
    Map({
        id : 2,
        questionType : "NumOnly",
        content : "질문을 입력해주세요.",
        optionList :[
            Map({
                queOptId : 1,
                optionName : "답변1"
            }), 
            Map({
                queOptId : 2,
                optionName : "답변2"
            }), 
        ]
    }),
  ]);


const questions = handleActions({

    [ADD_QUESTION] : (state, action) => { //질문추가
        const id  = action.payload;

        return state.push(Map({
                id : id,
                questionType : "Sub",
                content : "질문을 입력해주세요",
                optionList : []
            }));
    },

    [DELETE_QUESTION]: (state, { payload: question }) => { //질문삭제
        return state.filter(function(data) {
            return data.get("id") != question.id;
        });
    },

    [EDIT_QUESTION_CONTENT] : (state, {payload: question }) => {
        const text = question.value;

        return state.map(function(data) {
            if (data.get("id") == question.id){
                return data.set("content", text);
            }else{
                return data;
            }
        });
    },
    [EDIT_QUESTION_TYPE] : (state, {payload: question }) => {
        const text = question.value;
        
        return state.map(function(data) {
            if (data.get("id") == question.id){
                return data.set("questionType", text);
            }else{
                return data;
            }
        });
    },
    [ADD_ANSWER] : (state, {payload: question }) => {
        const text = question.value;
        return state.map(function(data) {
            if (data.get("id") == question.id){
                const idx = data.get("optionList").length +1;
                let optionList = data.get("optionList");
                optionList = [...optionList, Map({
                    queOptId :  idx,
                    optionName : text
                })];
                return data.set("optionList", optionList);;
            }else{
                return data;
            }
        });
    },
    [DELETE_ANSWER] : (state, {payload: question }) => {
        return state.map(function(data) {
            if (data.get("id") == question.id){
                let optionList = data.get("optionList");
                optionList = optionList.filter(function(option) {
                    return option.get("queOptId") != parseInt(question.aid);
                });
                return data.set("optionList", optionList);;
            }else{
                return data;
            }
        });
    },
    
  },
  initialState
);

export default questions;