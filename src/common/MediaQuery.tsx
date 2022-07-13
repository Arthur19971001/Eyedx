import React from "react"
import { useMediaQuery } from "react-responsive"

const QHD :React.FC = ({children}) => {
const isQHDSize = useMediaQuery({minWidth:2500});
    return <React.Fragment>{isQHDSize && children}</React.Fragment>
}

const FHD:React.FC = ({children}) => {
const isFHDSize = useMediaQuery({minWidth:1900,maxWidth:2499});
    return <React.Fragment>{isFHDSize && children}</React.Fragment>
}

const HD:React.FC = ({children}) => {
const isHDSize = useMediaQuery({maxWidth:1899});
    return <React.Fragment>{isHDSize && children}</React.Fragment>
}

export  {QHD,FHD,HD};