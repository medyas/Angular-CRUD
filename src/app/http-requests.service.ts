import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "./article";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  private key = 'AIzaSyB2u2nnoyzaTTcQOFVImh1_khYYyPhXesc';
  private url = `https://firestore.googleapis.com/v1beta1/projects/pwa-test-2bd08/databases/(default)/documents/articles?key=${this.key}`;
  constructor(private http: HttpClient) { }

  getArticles() {
    return new Observable<Article[]>( o => {
      this.http.get(this.url)
        .subscribe(json => {
          let articles: Article[] = [];
          if(json['documents'] === undefined) {
            //o.next(null);
            return;
          }
          json['documents'].forEach(doc => {
            articles.push(HttpRequestsService.parseArticle(doc));
          });
          o.next(articles);
        });
    })
  }

  static parseArticle(doc) {
    return {
      id: doc['name'].split('/')[6],
      title: doc['fields']['title']['stringValue'],
      description: doc['fields']['description']['stringValue']
    } as Article;
  }

  addNewArticle(article: Article) {
    let json = `
    {
    "fields": {
            "title": {"stringValue": "${article.title}"},
            "description": {"stringValue": "${article.description}"}
        }
    }`;
    return this.http.post(this.url,
       json,
      {headers: {"Content-Type": "application/json"}})
      .toPromise();
  }

  updateArticle(article: Article) {
    let url = `https://firestore.googleapis.com/v1beta1/projects/pwa-test-2bd08/databases/(default)/documents/articles/${article.id}?key=${this.key}&updateMask.fieldPaths=title&updateMask.fieldPaths=description`;
    let json = `
    {
    "fields": {
            "title": {"stringValue": "${article.title}"},
            "description": {"stringValue": "${article.description}"}
        }
    }`;

    return this.http.patch(url, json, {headers: {"Content-Type": "application/json"},})
      .toPromise();
  }

  deleteArticle(id) {
    let url = `https://firestore.googleapis.com/v1beta1/projects/pwa-test-2bd08/databases/(default)/documents/articles/${id}?key=${this.key}`;
    return this.http.delete(url).toPromise();
  }

}
