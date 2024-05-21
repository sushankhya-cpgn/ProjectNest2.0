import React, { useEffect, useState } from "react";

function DebouceInput({ searchQuery, onChange, debounce = 500, ...props }) {
  const [value, setValue] = useState(searchQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      value={value}
      {...props}
      onChange={(e) => setValue(e.target.value)}
    ></input>
  );
}

export default DebouceInput;
