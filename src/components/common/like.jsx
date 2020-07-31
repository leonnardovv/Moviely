import React from "react";

const Like = ({ isLiked, onSelectLike }) => {
  let classes = "fa fa-heart";
  if (!isLiked) classes += "-o";

  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      onClick={onSelectLike}
    ></i>
  );
};

export default Like;
