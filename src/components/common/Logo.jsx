import React from "react";

const Logo = ({ isFocusedMode }) => {

  return (
    <div className="header" style={{visibility: isFocusedMode ? 'hidden' : 'visible' }}>

    </div>
  );
};

export default Logo;
