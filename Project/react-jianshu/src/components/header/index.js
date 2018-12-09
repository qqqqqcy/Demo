import React, { Component } from "react";
import { connect } from "react-redux";
import {
  WebHeader,
  SearchWrap,
  HeaderIcon,
  HeaderLogo,
  HeaderLink,
  HeaderBtn
} from "./style";
import navLogo from "../../static/img/nav-logo.png";
import { CSSTransition } from "react-transition-group";
import {
  getHandleInputFocus,
  getHandleInputBlur
} from "../../store/actionCreators";

const mapStateToProps = store => ({
  focused: store.focused
});

const mapDispatchToProps = dispatch => ({
  handlefocus() {
    const action = getHandleInputFocus();
    dispatch(action);
  },
  handleInputBlur() {
    const action = getHandleInputBlur();
    dispatch(action);
  }
});

class Header extends Component {
  render() {
    const { focused, handlefocus, handleInputBlur } = this.props;
    return (
      <WebHeader>
        <HeaderLogo src={navLogo} alt="简书" />
        <HeaderIcon className="active">首页</HeaderIcon>
        <HeaderIcon>下载App</HeaderIcon>
        <SearchWrap>
          <CSSTransition in={focused} classNames="slide" timeout={300}>
            <div>
              <input
                className={focused ? "focused" : ""}
                onFocus={handlefocus}
                onBlur={handleInputBlur}
                placeholder="搜索"
                type="search"
                name=""
                id=""
              />
              <span className={focused ? "focused" : ""}>&#xe623;</span>
            </div>
          </CSSTransition>
        </SearchWrap>
        <HeaderLink>Aa</HeaderLink>
        <HeaderLink>登录</HeaderLink>
        <HeaderBtn>注册</HeaderBtn>
        <HeaderBtn className="active">写文章</HeaderBtn>
      </WebHeader>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
