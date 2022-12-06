import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleOffical } from 'src/app/models/article-offical';
import { Source } from 'src/app/models/source';
import { Response } from 'src/app/models/response';

@Injectable({
  providedIn: 'root',
})
export class ArticleServiceService {
  constructor(private http: HttpClient) {}
  private _url = 'http://test-api-temp.felicons.com/';

  getArticle(): Observable<Article[]> {
    return this.http.get<Article[]>(this._url + 'news');
  }
  getArticleOfficial(): Observable<ArticleOffical[]> {
    return this.http.get<ArticleOffical[]>(this._url + 'news-official-v2');
  }
  getSources(): Observable<Source[]> {
    return this.http.get<Source[]>(this._url + 'newspaper');
  }
  getStatistics(): Observable<Response> {
    return this.http.get<Response>(this._url + 'statistics');
  }
}
