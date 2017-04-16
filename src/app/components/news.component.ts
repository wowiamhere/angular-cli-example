import { Component } from '@angular/core';

@Component({
  selector: 'news-component',
  templateUrl: '../templates/news.component.html',
  styleUrls: [ '../styles/app.component.css']
})

export class NewsComponent {
  title:string = "This is the Daily news";

}