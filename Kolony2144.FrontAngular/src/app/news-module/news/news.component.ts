import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: string[] = [];
  notes: string = '';

  constructor() { }

  ngOnInit() {
    this.news.push('aaaa')
    this.news.push('a2aaa')
    this.news.push('aa3aa')
    this.news.push('aaa4a')

  }

}
