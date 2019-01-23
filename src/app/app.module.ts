import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewesComponent } from './page/newes/newes.component';
import { AboutComponent } from './page/about/about.component';
import { ProductsComponent } from './page/products/products.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewesComponent,
    AboutComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule, CKEditorModule,
    AppRoutingModule,
    QuillModule,
    CommonModule,
    FileUploadModule, FormsModule, HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
