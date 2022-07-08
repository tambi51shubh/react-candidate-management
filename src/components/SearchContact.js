import React, { useState } from 'react';
//import debounce from 'lodash/debounce'

const SearchContact = ({ onSearchUpdate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e) => {
    // debouncing to be added.
    setSearchQuery(e.target.value);
    onSearchUpdate(e.target.value);
  }

  return (
    <div className="input-group m-5 lg">
      <div className="form-outline">
        <input type="search" id="form1" className="form-control" placeholder="Whom are you looking for?" value={searchQuery} onChange={handleChange}/>
      </div>
    </div>
  )
}

export default SearchContact;