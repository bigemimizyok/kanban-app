import { Card, Popconfirm } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BoardsMemberModal from "./BoardsMemberModal";
import {
  DeleteOutlined,
  EditOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const BoardCard = ({ board, removeBoard, openEditModal, loadData }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const showShareModal = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div>
      <Card
        title={
          <Link className="board-link" to={`${board.id}`}>
            {board.title}
          </Link>
        }
        bodyStyle={{ borderRadius: "30px" }}
        style={{
          width: 300,
          borderRadius: "30px",
        }}
        offset={12}
        className="board-card"
        key={board.id}
        actions={[
          <EditOutlined
            style={{ color: "#256D85" }}
            onClick={() => {
              openEditModal(board);
            }}
          />,
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {removeBoard(board.id)}}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ color: "#FF4B5C" }}
            />
          </Popconfirm>,
          <ShareAltOutlined
            style={{ color: "#66BFBF" }}
            onClick={showShareModal}
          />,
        ]}
        hoverable
      ></Card>
      <BoardsMemberModal
        board={board}
        setIsShareModalOpen={setIsShareModalOpen}
        isShareModalOpen={isShareModalOpen}
        loadData={loadData}
      ></BoardsMemberModal>
    </div>
  );
};

export default BoardCard;
