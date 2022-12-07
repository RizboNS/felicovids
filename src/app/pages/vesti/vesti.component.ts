import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleOffical } from 'src/app/models/article-offical';
import { Source } from 'src/app/models/source';
import { CashingService } from 'src/app/services/cashing/cashing.service';

@Component({
  selector: 'app-vesti',
  templateUrl: './vesti.component.html',
  styleUrls: ['./vesti.component.css'],
})
export class VestiComponent implements OnInit, OnDestroy {
  originalArticles: Article[] = [];
  articles: Article[] = [];
  articlesOfficial: ArticleOffical[] = [];
  showOfficial = false;
  sources: Source[] = [];
  selectedFilter: string = '';

  articlesSub: Subscription = new Subscription();
  sourcesSub: Subscription = new Subscription();
  articlesOfficialSub: Subscription = new Subscription();

  constructor(private cashingService: CashingService) {}

  ngOnInit(): void {
    this.initArticles();
    this.initSources();
    this.initArticlesOfficial();
  }
  ngOnDestroy(): void {
    this.articlesSub.unsubscribe();
    this.articlesOfficialSub.unsubscribe();
    this.sourcesSub.unsubscribe();
  }

  showOfficialToggle(): void {
    this.showOfficial = this.showOfficial ? false : true;
  }

  filterArticles(source: string): void {
    this.undoFilter();
    this.selectedFilter = source;
    this.articles = this.articles.filter((article) => {
      return article.source === source;
    });
  }
  undoFilter(): void {
    this.selectedFilter = '';
    this.articles = this.originalArticles;
  }

  initSources(): void {
    this.sourcesSub = this.cashingService.sources$.subscribe((res) => {
      this.sources = res;
    });
  }
  initArticles(): void {
    this.articlesSub = this.cashingService.articles$.subscribe((res) => {
      this.articles = res;
      this.originalArticles = res;
    });
  }
  initArticlesOfficial(): void {
    this.articlesOfficialSub = this.cashingService.articlesOfficial$.subscribe(
      (res) => {
        this.articlesOfficial = res;
      }
    );
  }
}
