import styled from 'styled-components'

const colors = {
    mainBlueColor: "#0069bb",
    secondBlueColor: "#2089DB",
    inactivColor:"#9F9F9F",
    backgroundColor:"#EBEBEB",
    modalBackgroundColor:"#F6F6F6",
}

const RegFont = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: ${props => props.size || 12}px;
  color: ${props=> props.color || 'black'};
`

export  {colors,RegFont};