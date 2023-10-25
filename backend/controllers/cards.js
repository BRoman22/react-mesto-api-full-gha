import Card from '../models/card.js';
import Forbidden from '../errors/Forbidden.js';
import NotFound from '../errors/NotFound.js';

export const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards.reverse()))
    .catch(next);
};

export const createCards = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

export const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с указанным _id не найдена'));
      }
      if (card.owner.valueOf() !== req.user._id) {
        return next(new Forbidden('Нет прав доступа'));
      }
      Card.deleteOne(card)
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch(next);
      return next;
    })
    .catch(next);
};

export const cardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate('likes')
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с указанным _id не найдена'));
      }
      return res.send(card);
    })
    .catch(next);
};

export const cardDislike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с указанным _id не найдена'));
      }
      return res.send(card);
    })
    .catch(next);
};
