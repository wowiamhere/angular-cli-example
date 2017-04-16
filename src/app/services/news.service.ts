import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

//import { Observable } from 'rxjs';

@Injectable()
export class NewsService{

  constructor(private http: Http){}

  api_end_point: string = ' https://newsapi.org/v1/articles';
  api_key: string = 'apiKey=e4e2aa62a883464a87547e8de4336f61';
  source: string = 'source=bbc-news';

  target_url: string = this.api_end_point + '?' + this.source + '&' + this.api_key;

  fetchNews(){
    let result = this.http.get( this.target_url );

    return result;
  }

}