import React, { useState } from "react";
import Nav from './navbar';
export default function Header(props) {
  const {
    children
  } = props;

  return (
    <header>
      <div
      >
        <Nav />
        {children}
      </div>
    </header>
  );
}
