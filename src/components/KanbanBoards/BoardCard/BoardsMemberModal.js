import { Avatar, Checkbox, List, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { member } from "../../../services/endpoints/boardMember";
import { user } from "../../../services/endpoints/user";

const BoardsMemberModal = ({
  isShareModalOpen,
  setIsShareModalOpen,
  board,
  loadData,
}) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUserData = useCallback(() => {
    user.list().then(({ data }) => {
      setUserData(data);
    });
  }, [setUserData]);

  useEffect(() => {
    setLoading(true)
    loadUserData();
    setLoading(false)
  }, [loadUserData]);

  const onChange = (e, item) => {
    setLoading(true)
    if (e?.target?.checked) {
      member.create({ username: item.username, boardId: board.id }).then(() => {
        loadData();
        setLoading(false)
      });
    } else {
      const boardMemberId = board.members.filter(
        (boardMember) => boardMember.id === item.id
      )[0]?.BoardMember?.id;
      member.deleteItem({ id: boardMemberId }).then(() => {
        loadData();
        setLoading(false)
      });
    }
  };

  const handleOk = () => {
    setIsShareModalOpen(false);
  };

  const handleCancel = () => {
    setIsShareModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={isShareModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        key={`board_member_${board.id}`}
      >
        <List
        loading={loading}
          itemLayout="horizontal"
          style={{marginTop: 20}}
          dataSource={userData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{item.username}</a>}
              />
              <div>
                <Checkbox
                  onChange={(e) => onChange(e, item)}
                  checked={
                    board?.members?.filter(
                      (memberData) => memberData.id === item.id
                    ).length > 0
                  }
                ></Checkbox>
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default BoardsMemberModal;
