/* eslint-disable consistent-return */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const getBoardById = async (id) => {
  if (!id) return null;
  try {
    const firestore = firebase.firestore();
    const querySnapshot = await firestore.collection('boards').doc(id).get();
    const selected = querySnapshot.id;
    return selected;
  } catch (error) {
    console.error('Error fetching board by id', error);
    return null;
  }
};

const addListToBoard = async (listTitle, boardId, userId, selectedBoard) => {
  if (!boardId) return null;
  try {
    const firestore = firebase.firestore();
    const newList = await firestore.collection('lists').add({
      cards: [],
      createdOn: new Date(),
      createdBy: userId,
      name: listTitle,
    });
    const querySnapshot = await firestore.collection('boards').doc(boardId).get();
    querySnapshot.ref.update({
      lists: [...(selectedBoard.lists || []), newList],
    });
  } catch (error) {
    console.error('Error adding card', error);
  }
};

const deleteListById = async (listId, boardId, selectedBoard, cardsToDelete) => {
  if (!boardId || !listId) return;
  const firestore = firebase.firestore();
  const cardDeletions = cardsToDelete.map(cardRef => cardRef.delete());
  const querySnapshot = await firestore.collection('boards').doc(boardId).get();
  const updatedLists = selectedBoard.lists.filter(list => list.id !== listId);
  querySnapshot.ref.update({
    lists: updatedLists,
  });
  await Promise.all(cardDeletions);
};

const createBoardWithName = async (boardName, userId) => {
  if (!boardName) return;
  const newDoc = {
    name: boardName,
    createdOn: new Date(),
    createdBy: userId,
  };
  const firestore = firebase.firestore();
  const addedDoc = await firestore.collection('boards').add(newDoc);
  return addedDoc.id;
};

const reorderLists = async (from, to, activeBoardId, listRefs) => {
  const firestore = firebase.firestore();
  if (from < to) {
    const updatedListRefs = [
      ...listRefs.slice(from + 1, to + 1),
      listRefs[from],
      ...listRefs.slice(to + 1),
    ];
    const querySnapShot = await firestore.collection('boards').doc(activeBoardId).get();
    await querySnapShot.ref.update({
      lists: updatedListRefs,
    });
  } else {
    const updatedListRefs = [
      ...listRefs.slice(0, to),
      listRefs[from],
      ...listRefs.slice(to, from),
    ];
    const querySnapShot = await firestore.collection('boards').doc(activeBoardId).get();
    await querySnapShot.ref.update({
      lists: updatedListRefs,
    });
  }
};


const BoardHelpers = {
  getBoardById,
  addListToBoard,
  deleteListById,
  createBoardWithName,
  reorderLists,
};

export default BoardHelpers;
