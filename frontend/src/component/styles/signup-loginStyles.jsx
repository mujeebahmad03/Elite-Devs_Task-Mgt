import styled from 'styled-components';

export const Container = styled.main`

    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap :7rem;
    padding: 0 2rem;

    @media screen and (max-width: 1050px){
        grid-gap: 5rem;
    }

    @media screen and (max-width: 900px){
        grid-template-columns: 1fr;
    }
    
`

export const Wave = styled.img`

    position: fixed;
    bottom: 0;
    left: 0;
    height: 100%;
    z-index: -1;
    
    @media screen and (max-width: 900px){
        display: none;
    }
    
`

export const ImgContainer = styled.div`

    display: flex;
    justify-content: flex-end;
    align-items: center;

    img{
        width: 500px;

    }
    
    @media screen and (max-width: 900px){
        display: none;
    }

    @media screen and (max-width: 1000px){
        img{
            width: 400px;
        }
    }
    
`

export const FormCon = styled.div`

    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;

    form{
        width: 360px;
    }
    
    img{
        height: 100px;
    }

    h2{
        margin: 15px 0;
        text-transform: uppercase;
        font-size: 3rem;
    }


    @media screen and (max-width: 100px){
        form{
            width: 290px;
        }
    
        h2{
        font-size: 2.5rem;
        margin: 8px 0;
	}

    }

    @media screen and (max-width: 900px){
        justify-content: center;
    }
    
`

export const InputCon = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
    
    &:after, &:before {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 0%;
        height: 2px;
        background-color: #38d39f;
        transition: .4s;
    }

    &:before{
        right: 50%;
    }
    
    &:after{
        left: 50%;
    }

    & > div{
        position: relative;
        height: 45px;
    }

    input{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: none;
        padding: 0.5rem 0.7rem;
        font-size: 1.5rem;
        color: #eee;
        outline-width: 0;
    }

    input:focus{
        outline-width: 0;
    }
    
    
    label{
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        font-size: 1.8rem;
        transition: .3s;
    }
    
    &.focus {
        &:before, &:after {
            width: 50%;
        }

        > div > label {
            top: -5px;
            font-size: 1.5rem;
        }

        > div > .i > i {
            color: #38d39f;
        }
    }
`

export const IconCon = styled.div`

    color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;

    i{
    transition: .3s;
    }
    
`

export const Button = styled.button`

    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    outline: none;
    border: none;
    background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
    background-size: 200%;
    font-size: 1.5rem;
    color: #fff;
    text-transform: uppercase;
    margin: 1rem 0;
    cursor: pointer;
    transition: .5s;
    
    &:hover{
    background-position: right;
    }
`

export const StyledLink = styled.p`

	display: block;
	text-align: right;
	color: #999;
	font-size: 1.1rem;
	transition: .3s;


    & > a{
    text-decoration: none;
    color: violet;
}
    & > a:hover{
        color: #38d39f;
}

`

export const Error = styled.span`

    color: red;
    display: block;
	text-align: left;
	font-size: 0.9rem;
	transition: .3s;
    transform: translateY(-50%);

`