import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { URL } from '../../config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public uploader2: FileUploader;
  editorContent = '<p>Some html</p>';

  constructor() {
  }

  ngOnInit() {

    this.uploader2 = new FileUploader({
      url: URL + '/bannerAdd'
      , method: 'POST'
      , itemAlias: 'img'
      , autoUpload: true
    });
    this.uploader2.onSuccessItem = function (item, response, status, headers) {
      if (status === 200) {
        const rsp = JSON.parse(response);
        const img = '<img class="camera" src="' + 'http://您的域坝' + rsp.url + '" alt="">';
        this.data.content += img;
      } else {
        console.log(response);
      }
    };
  }

  aa(e) {
    console.log(e);
  }
}
