import React from 'react'

function Searchbar(props) {
    return (
        <div>
            <div className="searchbox">
                <input type="search" placeholder="search your city here.." name="" id="search" onChange={(event) => { props.setinputvalue(event.target.value) }} />
                <button className="submitbutton" onClick={() => { props.aftersearch() }}>Search</button>
            </div>
        </div>
    )
}

export default Searchbar
