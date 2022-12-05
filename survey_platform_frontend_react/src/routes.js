import React from 'react'


const Home = React.lazy(() => import('./views/Home'))

const Search = React.lazy(() => import('./views/survey/search/Search'))
const PrtcpList = React.lazy(() => import('./views/survey/list/PrtcpList'))
const MakeList = React.lazy(() => import('./views/survey/list/MakeList'))


const SurveyCreate = React.lazy(() => import('./views/survey/create/CreateSurvey'))
const SurveyAnswerReg = React.lazy(() => import('./views/survey/detail/RegisterAnswer'))
const SurveyAnswerEdit = React.lazy(() => import('./views/survey/detail/EditAnswer'))

const surveyDetail = React.lazy(() => import('./views/survey/detail/Detail'))

const grouplist = React.lazy(() => import('./views/group/list/list'))
const groupCreate = React.lazy(() => import('./views/group/form/create'))
const groupDetail = React.lazy(() => import('./views/group/detail/detail'))

const ad_survey_analysis = React.lazy(() => import('./views/analysis/ad_survey_analysis'))
const surveyVulgarismList= React.lazy(() => import('./views/analysis/survey_vulgarism'));

const categoryList = React.lazy(() => import('./views/admin/CategoryList'))


const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Home },

  // 설문
  { path: '/survey/search', name: 'Search', element: Search },                                        // 설문 검색 목록
  { path: '/survey/create', name: 'Survey', element: SurveyCreate },                                  // 설문 생성
  { path: '/survey/detail/:sur_id', name: 'Survey Detail', element: surveyDetail },                   // 설문 상세
  { path: '/survey/prtcpList', name: 'PrtcpList', element: PrtcpList },                               // 설문 참여 목록
  { path: '/survey/makeList', name: 'MakeList', element: MakeList },                                  // 설문 생성 목록
  { path: '/survey/answer/register/:sur_id', name: 'Survey Participate', element: SurveyAnswerReg },          // 설문 답변 등록
  { path: '/survey/answer/edit/:sur_id', name: 'Survey Modify', element: SurveyAnswerEdit },   // 설문 답변 수정

  // 그룹
  { path: '/group/list', name: 'Group List', element: grouplist },                                    // 그룹 목록
  { path: '/group/create', name: 'Group Create', element: groupCreate },                              // 그룹 생성
  { path: '/group/detail/:group_id', name: 'Group Detail', element: groupDetail },                              // 그룹 상세

  // 분석(ADMIN)
  { path: '/analysis/ad_survey_analysis', name: 'Ad Survey analysis', element: ad_survey_analysis },
  { path: '/analysis/survey_vulgarism_list', name: 'Survey Vulgarism List', element: surveyVulgarismList },

  //카테고리 리스트 설정
  { path: '/admin/CategoryList', name: 'Category List', element: categoryList },

  // //{ path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },

]

export default routes
