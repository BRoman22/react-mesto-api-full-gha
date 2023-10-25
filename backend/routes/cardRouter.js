import { Router } from 'express';
import {
  createCardValidation,
  deleteCardValidation,
  cardLikeValidation,
  cardDislikeValidation,
} from '../middlewares/requestValidation.js';
import {
  getCards,
  createCards,
  deleteCard,
  cardLike,
  cardDislike,
} from '../controllers/cards.js';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', createCardValidation, createCards);
cardRouter.delete('/:cardId', deleteCardValidation, deleteCard);
cardRouter.put('/:cardId/likes', cardLikeValidation, cardLike);
cardRouter.delete('/:cardId/likes', cardDislikeValidation, cardDislike);

export default cardRouter;
