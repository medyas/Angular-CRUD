import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule,
  MatSidenavModule, MatCardModule, MatExpansionModule, MatListModule,
  MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule,
} from '@angular/material';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { ArticleComponent } from './article/article.component';
import { LoaderComponent } from './loader/loader.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    InputDialogComponent,
    ArticleComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule,
    MatSidenavModule, MatCardModule, MatExpansionModule, MatListModule,
    MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    InputDialogComponent
  ]
})
export class AppModule { }
