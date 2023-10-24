import styled from "styled-components";

export const Title = styled.h1`
	display: inline-block;
	width: 100%;
	font-family: 'Poppins';
	font-size: 4rem;
	font-weight: 700;
	text-transform: uppercase;
	text-align: center;
	margin: 0 auto;
	margin-top: 2rem;
	margin-bottom: 1.5rem;
	color: var(--black-1);


@media only screen and (max-width: 768px) {
  font-size: 3rem;

}
`

export const LoneText = styled.p`

	font-size: 1.6rem;
	font-weight: 500;
	color: #585858;
	text-align: center;
	margin: 0 auto;
	padding: 0.5rem 1rem;
	border-radius: 8px;
	background-color: #dedfe1;
	width: max-content;
	height: auto;

`

export const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	padding: 2rem;
	margin-bottom: 2rem;
	
	@media only screen and (max-width: 768px){
		padding: 1rem;	
	}
`


export const Welcome = styled.div`
	display: flex;
	align-items: center;

	svg{
		width: 5rem;
		height: 5rem;
	}


`