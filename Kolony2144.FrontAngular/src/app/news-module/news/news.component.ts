import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { NewsService } from './../../services/news.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: string[] = [];
  playerNotes: string = '';

  constructor(
    private gameService: GameService,
    private newsService: NewsService,
  ) { }

  ngOnInit() {
    this.news = this.newsService.news;
    this.playerNotes = this.gameService.playerNotes;
  }

}
