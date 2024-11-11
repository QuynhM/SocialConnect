import React from 'react';
import { Outlet } from "react-router-dom";

function BlankLayout() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default BlankLayout
