import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Article} from "../article";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  @Output() addArticle: EventEmitter<Article> = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article
  ) { }

  articleForm = new FormGroup({
    title: new FormControl(this.data.title),
    description: new FormControl(this.data.description),
  });

/*
  title = new FormControl(this.data.title);
  description = new FormControl(this.data.description);*/

  ngOnInit() {
  }

  submitInputs() {
    if(!this.articleForm.valid) {
      return;
    }
    this.addArticle.emit(new Article(this.data.id, this.articleForm.controls.title.value, this.articleForm.controls.description.value));
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
