import {
  Button,
  Checkbox,
  List,
  Progress,
  Typography,
  Row,
  Col,
  Popover,
  Input
} from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { checklistItem } from "../../../services/endpoints/checklistItem";
import { checklist } from "../../../services/endpoints/checklist";
import { useDataContext } from "../../../contexts/data";

const ModalChecklist = ({ checklistData }) => {
  const { reloadCard } = useDataContext();
  const [percent, setPercent] = useState(0);
  const [checklistItemTitle, setChecklistItemTitle] = useState("");
  const [checklistPopoverOpen, setChecklistItemPopoverOpen] = useState(false);

  useEffect(() => {
    setPercent(
      Math.round(
        (checklistData.items.filter((item) => item?.isChecked).length /
          checklistData.items.length) *
          100,
        2
      )
    );
  }, [checklistData]);

  const changeChecklistItemStatus = ({ checked, item }) => {
    checklistItem
      .update({ id: item.id, values: { isChecked: checked } })
      .then(() => {
        reloadCard({ id: checklistData.cardId });
      });
  };

  const removeChecklist = () => {
    const cardId = checklistData.cardId;
    checklist.deleteItem({ id: checklistData.id }).then(() => {
      reloadCard({ id: cardId });
    });
  };

  const removeChecklistItem = (itemId) => {
    const cardId = checklistData.cardId;
    checklistItem.deleteItem({ id: itemId }).then(() => {
      reloadCard({ id: cardId });
    });
  };

  const createChecklistItem = () => {
    if (checklistItemTitle) {
      checklistItem
        .create({ title: checklistItemTitle, checklistId:checklistData?.id, isChecked:false })
        .then(() => {
          reloadCard({ id: checklistData.cardId });
          setChecklistItemPopoverOpen(false);
          setChecklistItemTitle("");
        });
    }
  };
  const handleOpenChange = (newOpen) => {
    setChecklistItemPopoverOpen(newOpen);
    setChecklistItemTitle("");
  };

  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Typography.Title level={4} extra={"123"}>
            {checklistData.title}
          </Typography.Title>
        </Col>
        <Col>
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
                  value={checklistItemTitle}
                  onChange={(e) => {
                    setChecklistItemTitle(e.target.value);
                  }}
                ></Input>
                <Button
                  type="primary"
                  onClick={createChecklistItem}
                  className="checklist-popover-create-button"
                >
                  Create
                </Button>
              </>
            }
          >
            <Button
              shape="circle"
              icon={<PlusOutlined />}
              style={{ marginRight: 5 }}
            />
          </Popover>

          <Button
            shape="circle"
            danger
            icon={<DeleteOutlined />}
            onClick={removeChecklist}
          />
        </Col>
      </Row>
      <Progress percent={percent} />
      <List
        itemLayout="horizontal"
        dataSource={checklistData.items}
        renderItem={(item) => (
          <List.Item
            extra={
              <Button
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  removeChecklistItem(item.id);
                }}
              />
            }
          >
            <List.Item.Meta
              avatar={
                <Checkbox
                  checked={item.isChecked}
                  onChange={(e) => {
                    changeChecklistItemStatus({
                      checked: e.target.checked,
                      item,
                    });
                  }}
                />
              }
              title={item.title}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ModalChecklist;
