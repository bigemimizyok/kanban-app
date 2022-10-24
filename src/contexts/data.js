import React, { useState, useContext, useCallback, useEffect } from "react";
import { board } from "../services/endpoints/board";
import { boardList } from "../services/endpoints/boardList";
import { card } from "../services/endpoints/card";
import { label } from "../services/endpoints/label";

export const DataContext = React.createContext({});

export const DataProvider = ({ children }) => {
  const [boardData, setBoardData] = useState([]);
  const [currentBoardData, setCurrentBoardData] = useState({});
  const [listData, setListData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    label.list().then(({ data }) => {
      setLabelData(data);
    });
  }, []);

  const loadBoardData = useCallback(
    ({ id }) => {
      board.getItem({ id }).then(({ data }) => {
        setCurrentBoardData(data);
      });
    },
    [setCurrentBoardData]
  );

  const loadListData = useCallback(
    ({ id }) => {
      boardList.list({ boardId: id }).then(({ data }) => {
        setListData(data);
      });
    },
    [setListData]
  );

  const reloadCard = useCallback(
    ({ id }) => {
      card.get({ id }).then(({ data }) => {
        const newListData = listData.map((list) => {
          if (list.id === data.listId) {
            const newCards = list.cards.map((cardData) => {
              if (cardData.id === data.id) {
                return data;
              } else {
                return cardData;
              }
            });
            return { ...list, cards: newCards };
          } else {
            return list;
          }
        });
        setListData(newListData);
      });
    },
    [listData, setListData]
  );

  return (
    <DataContext.Provider
      value={{
        boardData,
        setBoardData,
        listData,
        setListData,
        cardData,
        setCardData,
        labelData,
        setLabelData,
        isModalOpen,
        setIsModalOpen,
        loadListData,
        reloadCard,
        currentBoardData,
        setCurrentBoardData,
        loadBoardData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const {
    boardData,
    setBoardData,
    listData,
    setListData,
    cardData,
    setCardData,
    labelData,
    setLabelData,
    isModalOpen,
    setIsModalOpen,
    loadListData,
    reloadCard,
    currentBoardData,
    setCurrentBoardData,
    loadBoardData,
  } = useContext(DataContext);
  return {
    boardData,
    setBoardData,
    listData,
    setListData,
    cardData,
    setCardData,
    labelData,
    setLabelData,
    isModalOpen,
    setIsModalOpen,
    loadListData,
    reloadCard,
    currentBoardData,
    setCurrentBoardData,
    loadBoardData,
  };
};
