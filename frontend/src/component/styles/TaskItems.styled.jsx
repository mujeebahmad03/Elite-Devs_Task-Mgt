import styled from 'styled-components';


export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${({theme}) => theme.white};
  margin-bottom: 1.5rem;
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }

`

export const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`

export const TaskTexts = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const TaskText = styled.p`
  word-break: break-all;
  font-weight: 500;
  font-size: 1.4rem;
  color: ${({theme}) => theme.black2};

  &.completed {
    text-decoration: line-through;
    opacity: 0.7;
  }
`

export const TaskActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

`
export const Icon = styled.div`
	font-size: 2rem;
	padding: 0.5rem;
	border-radius: 4px;
	background-color: ${({theme}) => theme.gray1};
	color: ${({theme}) => theme.black2};
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: 0.3s ease background-color;
	
  &:hover {
		background-color: ${({theme}) => theme.gray2};
	}
`
