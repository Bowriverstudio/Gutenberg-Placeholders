import React from 'react';
import {Disabled} from "@wordpress/components";

const MyDisabled = (props) => {
    const {flag, children} = props
    return (
        <div>

            {flag &&
            <Disabled>
                {children}
            </Disabled>}

            {!flag &&
            <div>
                {children}
            </div>
            }
        </div>
    )
}
export default MyDisabled;