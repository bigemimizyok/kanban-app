import { Card, Col, Form, Input, Modal, Row, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDataContext } from "../../contexts/data";
import { board } from "../../services/endpoints/board";
import { PlusOutlined } from "@ant-design/icons";
import "./boards.css";
import BoardCard from "./BoardCard/BoardCard";

const Boards = () => {
  const { boardData, setBoardData } = useDataContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempBoardId, setTempBoardId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  const loadData = useCallback(() => {
    board.list().then(({ data }) => {
      setBoardData(data);
    });
  }, [setBoardData]);

  useEffect(() => {
    setIsLoading(true);
    loadData();
    setIsLoading(false);
  }, [loadData]);

  const removeBoard = (boardId) => {
    setIsLoading(true);
    board.deleteItem({ id: boardId }).then(() => {
      loadData();
      setIsLoading(false);
    });
  };
  const openEditModal = (board) => {
    setIsEdit(true);
    setTempBoardId(board.id);
    form.setFieldsValue({
      title: board?.title,
    });
    setIsModalOpen(true);
  };

  const onFinish = (value) => {
    setIsLoading(true)
    if (isEdit) {
      board.update({ value, id: tempBoardId }).then(() => {
        loadData();
      });
    } else {
      board.create(value).then(() => {
        loadData();
      });
    }

    setIsModalOpen(false);
    setIsLoading(false)
    form.resetFields();
  };

  const showModal = () => {
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <Row justify="center" align="middle">
        <Col>
          <Spin />
        </Col>
      </Row>
    );
  } else {
    return (
      <>
        <Row
          className="board-container"
          justify="space-evenly"
          align="middle"
          display="flex"
        >
          {boardData?.map((board) => (
            <div key={board.id}>
              <Col>
                <BoardCard
                  board={board}
                  openEditModal={openEditModal}
                  removeBoard={removeBoard}
                  loadData={loadData}
                />
              </Col>
            </div>
          ))}
          <Col>
            <Card
              className="board-card"
              bodyStyle={{
                marginTop: "45px",
                paddingLeft: "20px",
              }}
              onClick={showModal}
              hoverable
              style={{
                color: "#ADDDD0",
                margin: "15px",
                borderRadius: "23px",
              }}
            >
              <PlusOutlined
                style={{
                  fontSize: "50px",
                  color: "#ADDDD0",
                }}
              />
              Add New Board
            </Card>
          </Col>
        </Row>
        <Modal
          title={`${isEdit ? "Edit" : "Create New"} Board`}
          open={isModalOpen}
          onOk={form.submit}
          onCancel={handleCancel}
          okText={isEdit ? "Update" : "Create"}
        >
          <Form onFinish={onFinish} form={form}>
            <Form.Item name="title" label="Title">
              <Input placeholder="Please enter..."></Input>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
};
export default Boards;
