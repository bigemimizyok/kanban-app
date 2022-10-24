import { Divider, Select, Tag } from "antd";
import React from "react";
import { useDataContext } from "../../../contexts/data";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
        backgroundColor: "purple",
      }}
    >
      {label}
    </Tag>
  );
};

const ModalLabel = ({ cardData }) => {
  const { labelData } = useDataContext();

  const handleChange = (value) => {
    console.log("value : ", value)
  }

  return (
    <div>
      <Divider>Labels</Divider>
      <Select
        mode="multiple"
        showArrow
        placeholder="Select label"
        options={labelData?.map((labelDatum) => {
          return {
            label: labelDatum?.title,
            value: labelDatum?.id,
          };
        })}
        tagRender={tagRender}
        style={{
          width: "100%",
        }}
        value={cardData?.labels.map(labelItem => labelItem.id)}
        onChange={handleChange}
      />
    </div>
  );
};

export default ModalLabel;
