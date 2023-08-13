import React from 'react'
import '../css/loader.css'

function Loader({loading}) {
    return (
        <div>
            <div style={{ width: "100%", height: "100%", backgroundColor: "whitesmoke" }}>
                {loading ?
                    <div className='loading-container flex vertical horizontal'>
                        <span className="loader"></span>
                    </div>
                    : <div />
                }
            </div>
        </div>
    )
}

export default Loader