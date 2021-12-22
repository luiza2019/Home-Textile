import { css } from 'styled-components';

export const mobile = (props) => {
    return css`
    @media only screen and (max-width: 375px){
        ${props}
    }`
}
export const tablett = (props) => {
    return css`
    @media only screen and (max-width: 475px){
        ${props}
    }`
}
export const tablet = (props) => {
    return css`
    @media only screen and (max-width: 600px){
        ${props}
    }`
}
export const note = (props) => {
    return css`
    @media only screen and (max-width: 1000px){
        ${props}
    }`
}