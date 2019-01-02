import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public uploader2: FileUploader;
  URL = 'd';
  editorContent = '<p>Some html</p>';
  config = {
    toolbar: [
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video']                         // link and image, video
    ]
  };
  constructor() {
    console.log(URL);
  }

  ngOnInit() {

    this.uploader2 = new FileUploader({
      url: this.URL
      , method: 'POST'
      , itemAlias: 'upfile'
      , autoUpload: true
    });
    this.uploader2.onSuccessItem = function (item, response, status, headers) {
      if (status === 200) {
        const rsp = JSON.parse(response);
        const img = '<img class="camera" src="' + 'http://您的域坝' + rsp.url + '" alt="">';
        this.data.content += img;
      }
    };
  }

  aa(e) {
    console.log(e);
  }
}
