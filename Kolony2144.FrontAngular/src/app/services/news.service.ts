import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private _news: string[] = []

  constructor() { }

  get news() { return this._news }

  clearNews() {
    this._news = [];
  }

  addNews(val: string) {
    this._news.push(val);
  }

}
