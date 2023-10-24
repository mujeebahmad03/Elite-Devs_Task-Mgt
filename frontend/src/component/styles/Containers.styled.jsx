import styled from "styled-components";

export const Container = styled.main`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ActionWrapper = styled.div`
  max-width: 750px;
  width: 100%;
  margin: 0 auto;
`;
export const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
	margin-left: auto;
	gap: 2rem;
`;

export const TaskWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
  border-radius: 12px;

  @media only screen and (max-width: 768px) {
    padding: 1.5rem;
  }
`;
