import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-newes',
  templateUrl: './newes.component.html',
  styleUrls: ['./newes.component.scss']
})
export class NewesComponent implements OnInit {
  public uploader2: FileUploader;
  public textDetail = '<p>Some html</p>';
  constructor() { }

  ngOnInit() {
    this.uploader2 = new FileUploader({
      url: URL + '/upLoad'
      , method: 'POST'
      , itemAlias: 'image'
      , autoUpload: true
    });
    this.uploader2.onSuccessItem = (item, response, status, headers) => {
      console.log(response);
      if (status === 200) {
        const rsp = JSON.parse(response);
        const img = '<img class="camera" src="' + rsp.data.image_url + '" alt="">';
        console.log(img);
        this.textDetail += img;
      } else {
        console.log(response);
      }
    };
  }

}
