import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AppState } from "../store";
import { isLoggedIn } from "../store/actions/userActions";

function AppHeader() {
  const { data, loading, error } = useSelector((state: AppState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  const { pathname } = useLocation();

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        {data.username ? (
          <React.Fragment>
            <Menu.Item key="/records">
              <Link to="/records">Expense Records</Link>
            </Menu.Item>
            <Menu.Item key="/categories">
              <Link to="/categories">Category</Link>
            </Menu.Item>
            <Menu.Item key="/logout">
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </React.Fragment>
        ) : loading ? null : (
          <React.Fragment>
            <Menu.Item key="/login">
              <Link to="login">Login</Link>
            </Menu.Item>
            <Menu.Item key="/register">
              <Link to="register">Register</Link>
            </Menu.Item>
          </React.Fragment>
        )}
      </Menu>
    </Header>
  );
}

export default AppHeader;
