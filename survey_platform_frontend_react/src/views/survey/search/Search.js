import React, { useState } from 'react'
import {
  CInputGroup,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CPagination,
  CPaginationItem,
  CTable,
  CTableDataCell,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CRow,
  CCol,
} from '@coreui/react'
import axios from "axios";
import apiConfig from 'src/lib/apiConfig';
import moment from 'moment';
import usePromise from 'src/lib/usePromise';

const SurveySearchList = () => {
  const current = decodeURI(window.location.href);
  const search = current.split("?")[1];
  const params = new URLSearchParams(search);
  const nowPage = params.get('page') ? params.get('page') : 1;

  let page = {
    prev: false,
    start: 1,
    page: 3,
    next: false,
    end: 1,
    pagelist: [1, 2, 3, 4, 5, 6],
  }
  let category = [
    {id: 1, name: '학교' },
    {id: 2, name: '기업',},
    {id: 3,name: '연애',},
    {id: 4,name: '사업',},
    {id: 5, name: '취미',},
  ]

  let surveyList = []

  // 설문 검색 리스트
  const [loading, response, error] = usePromise(() => {
    return axios.get(apiConfig.surveySearchList+"?&category_id=10&page="+ nowPage);
  }, []);


  if(response != null){
    surveyList = response.data.content;
    let arr = [];
    for (let i = 0; i < response.data.totalPages; i++) {
      arr.push(i+1);
    }
    page.pagelist = arr;
  }
  


  // 검색 상세 페이지 링크
  const tableRowClick = (e, id) => {
    window.location.href = "/#/survey/detail/"+id;
  }

      
  return (
    <>
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong> 설문 검색 </strong>
            <small> 전체 공개된 설문조사를 조회 할 수 있습니다. </small>
          </CCardHeader>
          <CCardBody>
            <CCard className="mb-2">
              <CCardBody>
                <CForm action={'/#/survey/search'} method={'post'}>
                  <CInputGroup className="mb-4">
                    <CDropdown variant="input-group">
                      <CDropdownToggle color="secondary" variant="outline">
                        분류 선택
                      </CDropdownToggle>
                      <CDropdownMenu>
                        {category.map((data) => (
                          <CDropdownItem href={'/search?category=' + data.id} key={data.id}>
                            {data.name}
                          </CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                    <CFormInput aria-label="Text input with 2 dropdown buttons" />
                    <CButton type="submit">검색</CButton>
                  </CInputGroup>
                </CForm>
                <CCard className="mb-3">
                  <CCardHeader>검색 목록</CCardHeader>
                  <CCardBody>
                    <CTable className="table-hover">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문분류</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문명</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문내용</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문생성자</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문참여자</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문일</CTableHeaderCell>
                          <CTableHeaderCell scope="col">마감일</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {surveyList.map((data) => (
                          <CTableRow key={data.sur_id} onClick={(e) => tableRowClick(e, data.sur_id)}>
                            <CTableHeaderCell scope="row">{data.sur_id}</CTableHeaderCell>
                            <CTableDataCell>{data.content}</CTableDataCell>
                            <CTableDataCell>{data.title}</CTableDataCell>
                            <CTableDataCell>{data.description}</CTableDataCell>
                            <CTableDataCell>{data.reg_id}</CTableDataCell>
                            <CTableDataCell>{data.answer_cnt}명</CTableDataCell>
                            <CTableDataCell>{moment(new Date(data.reg_dt)).format('YYYY-MM-DD')}</CTableDataCell>
                            <CTableDataCell>{moment(new Date(data.due_dt)).format('YYYY-MM-DD')}</CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                </CCard>
                <CPagination aria-label="Page navigation example" align="center">
                  {page.prev ? (
                    <CPaginationItem aria-label="Previous">
                      <span aria-hidden="true">
                        <a href={'/#/survey/search?page=' + page.start - 1}>&laquo;</a>
                      </span>
                    </CPaginationItem>
                  ) : (
                    <CPaginationItem aria-label="Previous" disabled>
                      <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                  )}
                  
                  {page.pagelist.map((idx) =>
                    idx === page.page ? (
                      <CPaginationItem active>{page.page}</CPaginationItem>
                    ) : (
                      <CPaginationItem>
                        <a href={'/#/survey/search?&page=' + idx}>{idx}</a>
                      </CPaginationItem>
                    ),
                  )}
                  {page.next ? (
                    <CPaginationItem aria-label="Next">
                      <span aria-hidden="true">
                        <a href={'/#/survey/search?page=' + page.end + 1}>&raquo;</a>
                      </span>
                    </CPaginationItem>
                  ) : (
                    <CPaginationItem aria-label="Next" disabled>
                      <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                  )}
                </CPagination>
              </CCardBody>
              </CCard>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default SurveySearchList
