import { Component } from '@angular/core';

import { Observable } from 'rxjs';

  /* services */
import { NewsService } from '../services/news.service';

@Component({
  selector: 'news-component',
  templateUrl: '../templates/news.component.html',
  styleUrls: [ '../styles/app.component.css']
})

export class NewsComponent {

  constructor(private newsService: NewsService){}

  title:string = "This is the Daily news";
  news_result: Array<any>;

  getTheNews(){
      
    this.newsService.fetchNews().subscribe(r => {
      this.news_result = r.json().articles;
    } );
  }

}