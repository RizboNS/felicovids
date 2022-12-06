import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription, take } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleOffical } from 'src/app/models/article-offical';
import { Source } from 'src/app/models/source';
import { Statistics } from 'src/app/models/statistics';
import { ArticleServiceService } from '../article/article-service.service';

@Injectable({
  providedIn: 'root',
})
export class CashingServiceService {
  private articles: Article[] = [];
  private sources: Source[] = [];
  private articlesOfficial: ArticleOffical[] = [];
  private statistics!: Statistics;

  private _articles$ = new BehaviorSubject(this.articles);
  articles$ = this._articles$.asObservable();

  private _sources$ = new BehaviorSubject(this.sources);
  sources$ = this._sources$.asObservable();

  private _articlesOfficial$ = new BehaviorSubject(this.articlesOfficial);
  articlesOfficial$ = this._articlesOfficial$.asObservable();

  private _statistics$ = new BehaviorSubject(this.statistics);
  statistics$ = this._statistics$.asObservable();

  constructor(private articleService: ArticleServiceService) {
    let articles = localStorage.getItem('articles');
    let sources = localStorage.getItem('sources');
    let articlesOfficial = localStorage.getItem('articlesOfficial');
    let statistics = localStorage.getItem('statistics');

    if (articles) {
      this._articles$.next(JSON.parse(articles));
    }
    if (sources) {
      this._sources$.next(JSON.parse(sources));
    }
    if (articlesOfficial) {
      this._sources$.next(JSON.parse(articlesOfficial));
    }
    if (statistics) {
      this._statistics$.next(JSON.parse(statistics));
    }

    this.initStatistics();
    this.initArticles();
    this.initSources();
    this.initArticlesOfficial();
  }

  private initStatistics(): void {
    this.articleService.getStatistics().subscribe((res) => {
      let statisticsResponse = res.response[0];
      localStorage.setItem('statistics', JSON.stringify(statisticsResponse));
      this._statistics$.next(statisticsResponse);
    });
  }
  private initArticles(): void {
    this.articleService
      .getArticle()
      .pipe(take(1))
      .subscribe((res) => {
        localStorage.setItem('articles', JSON.stringify(res));
        this._articles$.next(res);
      });
  }
  private initSources(): void {
    this.articleService
      .getSources()
      .pipe(take(1))
      .subscribe((res) => {
        localStorage.setItem('sources', JSON.stringify(res));
        this._sources$.next(res);
      });
  }
  private initArticlesOfficial(): void {
    this.articleService
      .getArticleOfficial()
      .pipe(take(1))
      .subscribe((res) => {
        localStorage.setItem('articlesOfficial', JSON.stringify(res));
        this._articlesOfficial$.next(res);
      });
  }
}
