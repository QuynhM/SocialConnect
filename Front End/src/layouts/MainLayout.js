import React from 'react';
import Nav from '../components/nav/Nav';
import LeftBar from '../components/leftbar/LeftBar';
import RightBar from '../components/rightbar/RightBar';
import { Outlet } from "react-router-dom";
import { Stack, Box } from "@mui/material";


export default function Layout() {
  
  return (
    <>
    <Nav />
    <main>
      <LeftBar />
      <div className="container">
        <Outlet />
      </div>
      <RightBar />
    </main>
    </>
  );
}
