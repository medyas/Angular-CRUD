import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from "../article";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  @Output() delete: EventEmitter<String> = new EventEmitter();
  @Output() edit: EventEmitter<Article> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  deleteArticle(event) {
    event.stopPropagation();
    this.delete.emit(this.article.id);
  }

  editArticle(event) {
    event.stopPropagation();
    this.edit.emit(this.article);
  }
}
