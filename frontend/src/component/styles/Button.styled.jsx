import styled, { css } from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  height: auto;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1.5rem;
  text-decoration: none;
  text-transform: capitalize;
  cursor: pointer;
  overflow: hidden;


  ${(props) =>
    props.$primary &&
    css`
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.white};
    `}

  ${(props) =>
    props.$secondary &&
    css`
      background-color: ${({ theme }) => theme.bg1};
      color: ${({ theme }) => theme.black1};
    `}
`;

export const SelectButton = styled.select`
  color: ${({ theme }) => theme.black1};
  font-family: Poppins;
  padding: .8rem;
  border: none;
  background-color: ${({ theme }) => theme.bg3};
  width: 150px;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1.6rem;
  text-decoration: none;
  text-transform: capitalize;
  overflow: hidden;
`;
