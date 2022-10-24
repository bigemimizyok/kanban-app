import { Divider, Empty } from 'antd';
import React from 'react';
import ModalChecklist from './ModalChecklist';

const ModalChecklistTab = ({cardData}) => {
  return (
    <div>
      <Divider>Checklists</Divider>
      {cardData.checklists.length === 0 ? (
        <Empty/>
      ) : (
        <>
          {cardData.checklists.map(checklistData => (
            <ModalChecklist key={checklistData.id} checklistData={checklistData}/>
          ))}
        </>
      )}
    </div>
  );
};

export default ModalChecklistTab;
