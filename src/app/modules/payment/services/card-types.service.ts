import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../services/config.service';
import { CardType, CardTypesResponse } from '../../../interface/card.interface';
import { map } from 'rxjs/operators';
import { cardMapper } from '../mappers/card-type.mapper';

@Injectable({
  providedIn: 'root'
})
export class CardTypesService {

  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfig
  ) {}

  getCardTypes(): Observable<CardType[]> {
    const url = `${this.appConfig.apiUrl}/5d145fa22f0000ff3ec4f030 `;

    return this.httpClient.get<CardTypesResponse>(url).pipe(map(res => cardMapper(res)));
  }
}
