import React, { Component } from "react";
import {
  Header,
  SearchWrap,
  HeaderIcon,
  HeaderLogo,
  SearchInput
} from "./style";
import navLogo from "../../static/img/nav-logo.png";
export default class header extends Component {
  render() {
    return (
      <Header>
        <HeaderLogo src={navLogo} alt="简书" />
        <HeaderIcon className="active">⊙</HeaderIcon>
        <HeaderIcon>↓↓</HeaderIcon>
        <SearchWrap>
          <SearchInput placeholder="搜索" type="search" name="" id="" />
        </SearchWrap>
        <span>Aa</span>
        <span>登录</span>
        <span>注册</span>
        <span>写文章</span>
      </Header>
    );
  }
}
