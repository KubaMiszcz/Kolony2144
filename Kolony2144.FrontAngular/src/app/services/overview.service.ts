import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  private news: string[] = []

  constructor() { }

  get News() { return this.news }

  clearNews() {
    this.news = [];
  }

  addNews(val: string) {
    this.news.push(val);
  }
}
