import { Avatar, Button, Comment, Divider, Form, Input, List } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { comment } from "../../../services/endpoints/comment";
import { useDataContext } from "../../../contexts/data";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={(props) => (
        <Comment
          author={props?.author?.username}
          content={<p>{props.message}</p>}
          avatar="https://joeschmoe.io/api/v1/random"
          datetime={moment(props?.createdAt).fromNow()}
        />
      )}
    />
  )
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const ModalComment = ({ cardData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const { reloadCard } = useDataContext();

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    comment.create({ cardId: cardData.id, message: value }).then(() => {
      reloadCard({ id: cardData.id });
      setSubmitting(false);
      setValue("")
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Divider>Comments</Divider>

      {cardData.comments.length > 0 && <CommentList comments={cardData.comments} />}
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default ModalComment;
