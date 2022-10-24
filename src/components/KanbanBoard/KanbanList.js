import { Card, Button, Form, Modal, Input, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDataContext } from "../../contexts/data";
import KanbanCard from "./KanbanCard";
import { card } from "../../services/endpoints/card";

const KanbanList = ({ list, provided, openEditModal, removeList, loading, setLoading }) => {
  const { id } = useParams();

  const { loadListData } = useDataContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadListData({ id });
  }, [loadListData, id]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values) => {
    card.create({ ...values, listId: +list?.id }).then(() => {
      loadListData({ id });
    });

    setIsModalOpen(false);
    form.resetFields();
  };
  const removeCard = ({ cardId }) => {
    setLoading(true)
    card.deleteItem({ id: cardId }).then(() => {
      loadListData({ id });
      setLoading(false)
    });
  };

  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      style={{
        height: "100%",
      }}
      key={list.id}
    >
      <Card
        loading={loading}
        className="flexible-card"
        bodyStyle={{
          maxHeight: 700,
          overflow: "auto",
        }}
        style={{
          borderRadius: "23px",
          height: "95%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          margin: "15px",
          minWidth: "300px",
          justify: "center",
          align: "middle",
        }}
        title={list.title}
        extra={
          <>
            <Button
              className="list-extra-button"
              shape="circle"
              onClick={showModal}
              icon={<PlusOutlined style={{ color: "#66BFBF" }} />}
            />
            <Popconfirm
              title="Are you sure to delete this list?"
              onConfirm={() => {
                removeList({ listId: list.id });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                className="list-extra-button"
                shape="circle"
                icon={<DeleteOutlined style={{ color: "#FF4B5C" }} />}
              />
            </Popconfirm>

            <Button
              className="list-extra-button"
              shape="circle"
              onClick={() => {
                openEditModal({ list });
              }}
              icon={<EditOutlined style={{ color: "#056674" }} />}
            />
          </>
        }
      >
        {list.cards.map((cardData, index) => (
          <Draggable
            key={cardData?.id}
            draggableId={cardData?.id.toString()}
            index={index}
          >
            {(provided, snapshot) => {
              return (
                <KanbanCard
                  provided={provided}
                  snapshot={snapshot}
                  cardData={cardData}
                  removeCard={removeCard}
                  setLoading={setLoading}
                />
              );
            }}
          </Draggable>
        ))}
      </Card>

      <Modal
        title={"Create New Card"}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText={"Create"}
      >
        <Form onFinish={onFinish} form={form}>
          <Form.Item name="title" label="Title">
            <Input placeholder="Please enter..."></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KanbanList;
