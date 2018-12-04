import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;
export const HeaderLogo = styled.img`
  height: 58px;
`;

export const HeaderIcon = styled.span`
  line-height: 58px;
  padding: 0 20px;
  cursor: pointer;
  font-size: 25px;
  &.active {
    color: #ea6f5a;
  }
  :hover:not(.active) {
    background-color: #f5f5f5;
  }
`;

export const SearchWrap = styled.div`
  flex-grow: 1;
`;

export const SearchInput = styled.input`
  width: 320px;
  height: 38px;
  border-radius: 100px;
  padding: 0 40px 0 20px;
  box-sizing: border-box;
  font-size: 14px;
  border: none;
  box-shadow: none;
  background-color: #eee;
  ::-moz-placeholder {
    color: #aaa;
  }
  ::-webkit-input-placeholder {
    color: #aaa;
  }
  :-ms-input-placeholder {
    color: #aaa;
  }
`;
