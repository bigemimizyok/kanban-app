import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../contexts/data";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { Card, Col, Form, Input, Modal, Row } from "antd";
import KanbanList from "./KanbanList";
import { PlusOutlined } from "@ant-design/icons";
import { boardList } from "../../services/endpoints/boardList";
import "./board.css";
import { card } from "../../services/endpoints/card";

const Board = () => {
  const { id } = useParams();

  const { listData, loadListData, loadBoardData } = useDataContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempListId, setTempListId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadListData({ id });
    loadBoardData({ id });
  }, [loadListData, id, loadBoardData]);

  const removeList = ({ listId }) => {
    setLoading(true);
    boardList.deleteItem({ id: listId }).then(() => {
      loadListData({ id });
      setLoading(false);
    });
  };

  const openEditModal = ({ list }) => {
    setIsEdit(true);
    setTempListId(list.id);
    form.setFieldsValue({
      title: list?.title,
    });
    setIsModalOpen(true);
  };

  const onFinish = (value) => {
    setLoading(true);
    if (isEdit) {
      boardList.update({ value, id: tempListId }).then(() => {
        loadListData({ id });
        setLoading(false);
      });
    } else {
      boardList.create({ ...value, boardId: +id }).then(() => {
        loadListData({ id });
        setLoading(false);
      });
    }

    setIsModalOpen(false);
    form.resetFields();
  };

  const showModal = () => {
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const moveCard = (result) => {
    setLoading(true);
    const newListId = result?.destination?.droppableId;
    const cardId = result?.draggableId;

    card.update({ id: cardId, values: { listId: +newListId } }).then(() => {
      loadListData({ id });
      setLoading(false);
    });
  };

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <DragDropContext onDragEnd={moveCard}>
        <Row
          className="board-container"
          style={{ overflow: "hidden", height: "100%" }}
        >
          {listData.map((list, index) => (
            <Col key={index}>
              <Droppable droppableId={list?.id.toString()} key={list?.id}>
                {(provided, snapshot) => {
                  return (
                    <KanbanList
                      provided={provided}
                      list={list}
                      openEditModal={openEditModal}
                      showModal={showModal}
                      removeList={removeList}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  );
                }}
              </Droppable>
            </Col>
          ))}
          <Col>
            <Card
              hoverable
              onClick={showModal}
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
              Add New List
            </Card>
          </Col>
        </Row>

        <Modal
          title={`${isEdit ? "Edit" : "Create New"} List`}
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
      </DragDropContext>
    </div>
  );
};

export default Board;
