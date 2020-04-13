/* eslint-disable consistent-return */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const addCardToList = async (listId, userId, existingList) => {
  if (!listId) return null;
  try {
    const firestore = firebase.firestore();
    const newCard = await firestore.collection('cards').add({
      content: '',
      createdOn: new Date(),
      createdBy: userId,
    });
    const querySnapshot = await firestore.collection('lists').doc(listId).get();
    querySnapshot.ref.update({
      cards: [...(existingList.cards || []), newCard],
    });
  } catch (error) {
    console.error('Error adding card', error);
  }
};

const updateCard = async (cardId, content) => {
  const firestore = firebase.firestore();
  const querySnapshot = await firestore.collection('cards').doc(cardId).get();
  await querySnapshot.ref.update({
    content,
  });
};

const deleteCardById = async (cardId) => {
  const firestore = firebase.firestore();
  const querySnapShot = await firestore.collection('cards').doc(cardId).get();
  return querySnapShot.ref.delete();
};

const ListHelpers = {
  addCardToList,
  deleteCardById,
  updateCard,
};

export default ListHelpers;
