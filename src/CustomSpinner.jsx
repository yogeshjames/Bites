import React from "react";
import { Box } from "@chakra-ui/react";
import "./CustomSpinner.css"; // Include the provided CSS here

const CustomSpinner = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <svg viewBox="0 0 240 240" height="6em" width="6em" className="pl">
        <circle
          strokeLinecap="round"
          strokeDashoffset="-330"
          strokeDasharray="0 660"
          strokeWidth="20"
          stroke="#000"
          fill="none"
          r="105"
          cy="120"
          cx="120"
          className="pl__ring pl__ring--a"
        ></circle>
        <circle
          strokeLinecap="round"
          strokeDashoffset="-110"
          strokeDasharray="0 220"
          strokeWidth="20"
          stroke="#000"
          fill="none"
          r="35"
          cy="120"
          cx="120"
          className="pl__ring pl__ring--b"
        ></circle>
        <circle
          strokeLinecap="round"
          strokeDasharray="0 440"
          strokeWidth="20"
          stroke="#000"
          fill="none"
          r="70"
          cy="120"
          cx="85"
          className="pl__ring pl__ring--c"
        ></circle>
        <circle
          strokeLinecap="round"
          strokeDasharray="0 440"
          strokeWidth="20"
          stroke="#000"
          fill="none"
          r="70"
          cy="120"
          cx="155"
          className="pl__ring pl__ring--d"
        ></circle>
      </svg>
    </Box>
  );
};

export default CustomSpinner;
