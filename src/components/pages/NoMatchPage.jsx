import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NoMatchPage = () => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => navigate("/"), []);

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

export default NoMatchPage;
