import { combineReducers } from 'redux';
import adminArticlesReducer from './Reducer/AdminArticlesReducer/AdminArticleReducer';
import adminCoursesReducer from './Reducer/AdminCoursesReducer/AdminCoursesReducer';
import adminJobsReducer from './Reducer/AdminJobsReducer/AdminJobsReducer';
import adminUserReducer from './Reducer/AdminUsersReducer/AdminUsersReducer';
import adminCertifcateReducer from './Reducer/AdminUploadCertficateReducer/AdminUploadCertficateReducer';
import authReducer from './Reducer/AuthReducer/AuthReducer';
import userArticlesReducer from './Reducer/UserArticlesReducer/UserArticlesReducer';
import userCoursesReducer from './Reducer/UserCoursesReducer/UserCoursesReducer';
import userJobsReducer from './Reducer/UserJobsReducer/UserJobsReducer';
import userProfileReducer from './Reducer/UserProfileReducer/UserProfileReducer';
import examReducer from './Reducer/ExamReducer/ExamReducer';

export const routeReducer = combineReducers({
  adminArticlesReducer: adminArticlesReducer,
  adminCoursesReducer: adminCoursesReducer,
  adminJobsReducer: adminJobsReducer,
  adminUserReducer: adminUserReducer,
  adminCertifcateReducer: adminCertifcateReducer,
  authReducer: authReducer,
  userArticlesReducer: userArticlesReducer,
  userCoursesReducer: userCoursesReducer,
  userJobsReducer: userJobsReducer,
  userProfileReducer: userProfileReducer,
  examReducer: examReducer,
});
