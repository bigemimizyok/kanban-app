import React, { useEffect, useState } from "react";
import { Button, Col, Menu, Row, Typography } from "antd";
import { useLoginContext } from "../../contexts/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./navbar.css";
import { useDataContext } from "../../contexts/data";
import { board } from "../../services/endpoints/board";
const { Paragraph } = Typography;

const Navbar = () => {
  let navigate = useNavigate();
  const {currentBoardData,loadBoardData} = useDataContext()
  const { logout } = useLoginContext();
  const { pathname } = useLocation();


  const [clickTriggerStr, setClickTriggerStr] = useState("");

  useEffect(() => {
    setClickTriggerStr(currentBoardData?.title);
  }, [currentBoardData]);

  const updateBoardName = (value) => {
    board.update({id: currentBoardData.id, value: {title: value}}).then(() => {
      loadBoardData({id: currentBoardData.id})
    }
    )
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const backBoards = () => {
    navigate("/boards");
  };


  return (
    <Menu mode="horizontal" style={{ backgroundColor: "#6e38c5a1" }}>
      <Row justify="space-between" style={{ width: "100%" }} gutter={10}>
        <Col>
          <Menu.Item key="back-button">
            {pathname?.startsWith("/boards/") && (
              <Button
                shape="round"
                onClick={backBoards}
                icon={<ArrowLeftOutlined style={{ color: "#056674" }} />}
              />
            )}
          </Menu.Item>
        </Col>
        <Col>
          <Menu.Item key="board-name">
            {pathname?.startsWith("/boards/") && (
              <Paragraph
                className="navbar-title"
                editable={{
                  tooltip: "click to edit text",
                  onChange: updateBoardName,
                  triggerType: "text",
                }}
              >
                {clickTriggerStr}
              </Paragraph>
            )}
          </Menu.Item>
        </Col>
        <Col>
          <Menu.Item onClick={handleLogout} key="logout-button">
            <b>Logout</b>
          </Menu.Item>
        </Col>
      </Row>
    </Menu>
  );
};

export default Navbar;
