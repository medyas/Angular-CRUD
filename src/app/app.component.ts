import {Component, Inject} from '@angular/core';
import {HttpRequestsService} from "./http-requests.service";
import {Article} from "./article";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from "@angular/material";
import {InputDialogComponent} from "./input-dialog/input-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  articles$: Observable<Article[]>;
  loading = true;

  constructor(private requests: HttpRequestsService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.getArticles();
  }

  showAddDialog(article: Article): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = article == null? new Article('', '', ''): article;
    const dialogRef = this.dialog.open(InputDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    dialogRef.componentInstance.addArticle.subscribe((article) => {
      this.loading = true;
      if(article.id === '') {
        this.addArticle(article);
      } else {
        this.updateArticle(article);
      }
    });
  }

  showSnackBar(msg) {
    this.snackBar.open(msg, null,{
      duration: 2000,
    });
  }

  getArticles() {
    this.articles$ = this.requests.getArticles()
      .pipe(map(articles => articles.map(a => {
        return a;
      })));
    this.loading = false;
  }

  addArticle(article: Article) {
    this.loading = true;
    this.requests.addNewArticle(article)
      .then(res => {
        this.getArticles();
        this.showSnackBar("Article added");
      }).catch(e => {
        console.log(e);
        this.showSnackBar("Something happened !");
    });
  }

  updateArticle(article: Article) {
    this.loading = true;
    this.requests.updateArticle(article)
      .then((res) => {
        this.getArticles();
        this.showSnackBar("Article updated");
      })
      .catch(e => {
        console.log(e);
        this.showSnackBar("Something happened !");
      });
  }

  deleteArticle(id: String) {
    this.loading = true;
    this.requests.deleteArticle(id)
      .then(res => {
        this.getArticles();
        this.showSnackBar("Article Deleted");
      })
      .catch(res => {
        console.log(res);
        this.showSnackBar("Something happened !");
      });
  }
}

