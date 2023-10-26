import { Router } from 'express';
import {
  createCardValidation,
  checkCardId,
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
cardRouter.delete('/:cardId', checkCardId, deleteCard);
cardRouter.put('/:cardId/likes', checkCardId, cardLike);
cardRouter.delete('/:cardId/likes', checkCardId, cardDislike);

export default cardRouter;
