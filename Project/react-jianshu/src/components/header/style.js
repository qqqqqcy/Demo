import styled from "styled-components";

const navHeight = "59px";
export const WebHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;
export const HeaderLogo = styled.img`
  height: ${navHeight};
`;

export const HeaderLink = styled.a`
  line-height: ${navHeight};
  font-size: 18px;
  cursor: pointer;
  color: #969696;
  padding: 0 24px;
`;

export const HeaderBtn = styled.button`
  border-radius: 99px;
  border: 1px solid rgba(236, 97, 73, 0.7);
  font-size: 15px;
  cursor: pointer;
  color: rgba(236, 97, 73, 0.7);
  padding: 8px 20px;
  margin: 0 20px;
  background-color: #fff;
  &:hover {
    background-color: rgba(236, 97, 73, 0.05);
  }
  &.active {
    color: #fff;
    background-color: #ea6f5a;
  }
`;

export const HeaderIcon = styled.a`
  line-height: ${navHeight};
  padding: 0 20px;
  cursor: pointer;
  font-size: 18px;
  &.active {
    color: #ea6f5a;
  }
  :hover:not(.active) {
    background-color: #f5f5f5;
  }
`;

const searchHeight = "38px";

export const SearchWrap = styled.div`
  @font-face {
    font-family: "iconfont"; /* project id 957768 */
    src: url("//at.alicdn.com/t/font_957768_v75b85643na.eot");
    src: url("//at.alicdn.com/t/font_957768_v75b85643na.eot?#iefix")
        format("embedded-opentype"),
      url("//at.alicdn.com/t/font_957768_v75b85643na.woff") format("woff"),
      url("//at.alicdn.com/t/font_957768_v75b85643na.ttf") format("truetype"),
      url("//at.alicdn.com/t/font_957768_v75b85643na.svg#iconfont")
        format("svg");
  }

  flex-grow: 1;
  margin-left: 20px;

  input {
    width: 220px;
    height: ${searchHeight};
    border-radius: 100px;
    padding: 0 40px 0 20px;
    box-sizing: border-box;
    font-size: 14px;
    border: none;
    box-shadow: none;
    background-color: #eee;
    transition: width 0.3s;
    ::-moz-placeholder {
      color: #aaa;
    }
    ::-webkit-input-placeholder {
      color: #aaa;
    }
    :-ms-input-placeholder {
      color: #aaa;
    }
    &.focused {
      width: 320px;
    }
  }

  & > div {
    position: relative;
    display: inline-block;
  }
  span {
    cursor:pointer;
    font-family: iconfont;
    line-height: ${searchHeight};
    font-size: 20px;
    color: rgb(150, 150, 150);
    text-align: center;
    display: block;
    position: absolute;
    width: ${searchHeight};
    height: ${searchHeight};
    right: 0;
    top: 0;
    border-radius: 100px;
    box-shadow: inset 0 0 0 4px rgb(238, 238, 238);
    transition: all 0.3s;
  }
  span.focused {
    color: #fff;
    background: #969696;
  }
`;
