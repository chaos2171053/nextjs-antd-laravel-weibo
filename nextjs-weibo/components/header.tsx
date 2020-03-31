import React, { useState } from "react";
export default function Header(props) {
  const {
    children
  } = props;

  return (
    <header>
      <div
      >
        {children}
      </div>
    </header>
  );
}
