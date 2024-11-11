import React from 'react'
import { Routes, Route } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout"
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/login/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import WelcomePage from "../pages/welcome/WelcomePage";
import AuthRequire from './AuthRequire';
import Profile from '../pages/profile/Profile';
import UserProfile from '../components/userProfile/UserProfile';
import CurrentProfile from '../components/userProfile/CurrentProfile';
import Feeds from '../features/post/Feeds';
import FriendList from '../features/friend/FriendList';
import FriendRequests from '../features/friend/FriendRequests';
import FriendRequestsSent from '../features/friend/FriendRequestsSent';
import Posts from '../features/post/Posts';
import SearchResult from '../components/nav/SearchResult';


function index() {
  return (
    <Routes>
        <Route path="/" element={<AuthRequire > <MainLayout /> </AuthRequire>}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchResult />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="user" element={<Profile />} >
              <Route path=":userId" element={<CurrentProfile />}>  
                <Route path="posts" element={<Posts />} />
                <Route path="friends" element={<FriendList />} />
                <Route path="requests" element={<FriendRequests />} />
                <Route path="sent" element={<FriendRequestsSent />} />
              </Route>
            </Route>
        </Route>


      <Route element={<BlankLayout />}>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default index
