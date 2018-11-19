import React from 'react';

function Loader(props) {
  return <h2>{props.text || "Loading..."}</h2>
}

export default Loader;