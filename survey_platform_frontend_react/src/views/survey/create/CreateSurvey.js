import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CNav, 
  CNavItem, 
  CNavLink, 
  CTabContent, 
  CTabPane,
  CButton,
  CAlert
} from '@coreui/react'
import CreateSurveyInfo from './CreateSurveyInfo';
import CreateQuestion from './CreateQuestion';
import Send from './Send';
import axios from 'axios';
import apiConfig from 'src/lib/apiConfig';

const CreateSurvey = () => {
  const [activeKey, setActiveKey] = useState(1);
  const [visible, setVisible] = useState(false);

  const { user } = useSelector(({user})=> ({user:user.user}));
  const { survey } = useSelector(({ survey }) => ({
    survey : survey
  }));
  const { questions } = useSelector(({ questions }) => ({
    questions : questions
  }));
  const [validated, setValidated] = useState(false);


  var headers =null;
  if (user != null) {
    const accessToken = user.token.access_token;
    headers = {'Authorization': 'Bearer ' + accessToken };
  }


  
  // 설문발송탭 활성/비활성화
  function showSendTab(flag) {
    setValidated(flag);
  }

  function createSurvey(){

    const surveyParam = Object.fromEntries(survey);
    if(surveyParam.title==''){
      setVisible(true);
        return;
    }
    surveyParam.dueDt = surveyParam.dueDate+"T"+surveyParam.dueTime+":00";

    const questionDTOList = [];

    questions._tail.array.forEach(function(question) {
      const map = Object.fromEntries(question);
      const list = [];
      map.optionList.forEach(function(option) {
        let newOption = {
          optionOrder : option.get("queOptId"),
          optionName : option.get("optionName")
        }
        list.push(newOption);
      });
      map.optionList = list;
      questionDTOList.push(map);
  });
  
    const body ={ 
        "survey": surveyParam,
        "send_yn": validated? "Y":"N",
        "questionDTOList" : questionDTOList,
        "surveyTargetList" : []
    };

    console.log(body)
    axios.post(apiConfig.createSurvey, body, {headers: headers})
      .then((response) => {
        console.log(response);
      })
  }
  
  return (
    <>
     <CCard className="mb-3">
        <CCardHeader>설문 생성<small> 설문을 생성 할 수 있습니다.</small>
        </CCardHeader>
        <CCardBody>
          <div>
            <div
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CNav role="tablist" variant="tabs">
                <CNavItem>
                  <CNavLink
                    active={activeKey === 1}
                    onClick={() => setActiveKey(1)}
                  >
                    기본정보 작성
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    active={activeKey === 2}
                    onClick={() => setActiveKey(2)}
                  >
                    질문 작성
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink 
                    disabled={!validated}
                    active={activeKey === 3}
                    onClick={() => setActiveKey(3)}
                  >
                    설문 발송
                  </CNavLink>
                </CNavItem>
              </CNav>
            </div>

            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                <CreateSurveyInfo showSendTab={showSendTab}/>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                <CreateQuestion />
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
                <Send />
              </CTabPane>
            </CTabContent>
            <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
              <svg className="flex-shrink-0 me-2" width="24" height="24" viewBox="0 0 512 512">
                <rect width="32" height="176" x="240" y="176" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect>
                <rect width="32" height="32" x="240" y="384" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect>
                <path fill="var(--ci-primary-color, currentColor)" d="M274.014,16H237.986L16,445.174V496H496V445.174ZM464,464H48V452.959L256,50.826,464,452.959Z" className="ci-primary"></path>
              </svg>
              제목을 입력하세요.</CAlert>
            <div className="d-grid gap-3 col-md-12 d-md-flex justify-content-md-end">
              <CButton color="primary" onClick={createSurvey}>
                Create
              </CButton>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CreateSurvey