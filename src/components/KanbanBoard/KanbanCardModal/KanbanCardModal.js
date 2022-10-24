import { Button, Form, Input, Modal, Popover, Typography } from "antd";
import React, { useState } from "react";
import ModalChecklistTab from "./ModalChecklistTab";
import ModalComment from "./ModalComment";
import ModalLabel from "./ModalLabel";
import { CheckSquareOutlined } from "@ant-design/icons";
import { checklist } from "../../../services/endpoints/checklist";
import { useDataContext } from "../../../contexts/data";

const KanbanCardModal = ({
  onFinish,
  isModalOpen,
  onOk,
  onCancel,
  cardData,
  form,
}) => {
  const { reloadCard } = useDataContext();
  const [checklistTitle, setChecklistTitle] = useState("");
  const [checklistPopoverOpen, setChecklistPopoverOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setChecklistPopoverOpen(newOpen);
    setChecklistTitle("")
  };

  const createChecklist = () => {
    if (checklistTitle) {
      checklist
      .create({ title: checklistTitle, cardId: cardData?.id })
      .then(() => {
        reloadCard({ id: cardData?.id });
        setChecklistPopoverOpen(false)
        setChecklistTitle("")
      });
    }
  };

  return (
    <>
      <Modal
        title={
          <div className={"card-modal-title"}>
            <h4>{cardData.title}</h4>
            <Popover
              placement="top"
              title={"Add Checklist"}
              trigger="click"
              open={checklistPopoverOpen}
              onOpenChange={handleOpenChange}
              content={
                <>
                  <Typography.Text>Title</Typography.Text>
                  <Input
                    value={checklistTitle}
                    onChange={(e) => {
                      setChecklistTitle(e.target.value);
                    }}
                  ></Input>
                  <Button type="primary" onClick={createChecklist} className="checklist-popover-create-button">Create</Button>
                </>
              }
            >
              <Button
                icon={<CheckSquareOutlined />}
                shape="round"
                className="card-modal-title-checklist"
              >
                Checklist
              </Button>
            </Popover>
          </div>
        }
        open={isModalOpen}
        onOk={onOk}
        okText="Save"
        cancelText="Close"
        onCancel={onCancel}
      >
        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input title",
              },
            ]}
          >
            <Input placeholder="Please enter..."></Input>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input description",
              },
            ]}
          >
            <Input placeholder="Please enter..."></Input>
          </Form.Item>
          <Form.Item>
            <ModalChecklistTab cardData={cardData} />
          </Form.Item>
          <Form.Item>
            <ModalLabel cardData={cardData}/>
          </Form.Item>
          <Form.Item>
            <ModalComment cardData={cardData} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default KanbanCardModal;
