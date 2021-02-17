import { CardType, CardTypesResponse } from '../../../interface/card.interface';

export function cardMapper(cardTypesResponse: CardTypesResponse): CardType[] {
  return cardTypesResponse.cardTypes;
}
