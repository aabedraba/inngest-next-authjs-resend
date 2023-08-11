import React from "react";
import "./full-screen-loading.css";

const FullScreenLoading = () => {
  return (
    <div className="loading-background">
      <div className="loading-bar">
        <div className="loading-circle-1" />
        <div className="loading-circle-2" />
      </div>
    </div>
  );
};

export default FullScreenLoading;