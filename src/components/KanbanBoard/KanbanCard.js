import { Card, Tag, Form, notification, Popconfirm } from "antd";
import React, { useState } from "react";
import KanbanCardModal from "./KanbanCardModal/KanbanCardModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { card } from "../../services/endpoints/card";
import { useDataContext } from "../../contexts/data";

const KanbanCard = ({ provided, snapshot, cardData, removeCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reloadCard } = useDataContext();
  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue(cardData);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    form.validateFields().then(() => {
      card.update({ id: cardData.id, values }).then(() => {
        reloadCard({ id: cardData.id });
        notification.success({
          message: "Saved",
          description: "Changes are saved successfully!",
        });
      });
    });
  };
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        color: "white",
        ...provided.draggableProps.style,
      }}
    >
      <Card
        hoverable
        style={{
          borderRadius: "26px",
          minWidth: "200px",
          justify: "center",
          align: "middle",
          marginBottom: "20px",
        }}
        title={cardData.title}
        extra={cardData.labels?.map((label) => (
          <Tag color={label.color} key={label.id}>
            {label.title}
          </Tag>
        ))}
        actions={[
          <EditOutlined style={{ color: "#256D85" }} onClick={showModal} />,
          <Popconfirm
            title="Are you sure to delete this card?"
            onConfirm={() => {
              removeCard({ cardId: cardData.id });
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "#FF4B5C" }} />
          </Popconfirm>,
        ]}
      ></Card>
      <KanbanCardModal
        onFinish={onFinish}
        onCancel={handleCancel}
        isModalOpen={isModalOpen}
        onOk={handleOk}
        cardData={cardData}
        form={form}
      />
    </div>
  );
};

export default KanbanCard;
