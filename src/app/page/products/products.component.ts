import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { URL } from '../../config/config';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public name: string;
  public imgUrl: string;
  public img: string;
  public info: string;
  public content = '<p>Some html</p>';
  public author: string;
  public uploader1;
  public uploader2;
  public productList;
  public productID;
  constructor(private http: HttpService) { }

  ngOnInit() {

    this.producGet();

    this.uploader1 = new FileUploader({
      url: URL + '/upLoad'
      , method: 'POST'
      , itemAlias: 'image'
      , autoUpload: true
    });
    this.uploader1.onSuccessItem = (item, response, status, headers) => {
      console.log(response);
      if (status === 200) {
        const rsp = JSON.parse(response);
        this.imgUrl = rsp.data.image_url;
        this.img = `<img class="camera" src="${rsp.data.image_url}" alt="">`;
      } else {
        console.log(response);
      }
    };


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
        this.content += '<img class="camera" src="' + rsp.data.image_url + '" alt="">';
      } else {
        console.log(response);
      }
    };
  }


  sub() {
    if (!this.name || this.name.length === 0) { alert('请输入标题'); return; }
    if (!this.imgUrl || this.imgUrl.length === 0) { alert('请上传产品图'); return; }
    if (!this.info || this.info.length === 0) { alert('请输入简介'); return; }
    if (!this.content || this.content.length === 0) { alert('请输入内容'); return; }

    const p = {
      name: this.name,
      author: this.author,
      content: this.content,
      info: this.info,
      img: this.imgUrl
    };
    if (this.productID && this.productID.length > 0) {
      p['id'] = this.productID;
    }

    this.http.post('/producAdd', p)
      .subscribe(e => {
        console.log(e);
        const a = (e['code'] === 200) ? '上传成功' : '上传失败';
        this.name = '';
        this.author = '';
        this.content = '';
        this.info = '';
        this.imgUrl = '';
        this.productID = '';
        this.img = '';
        this.producGet();
        alert(a);
      });
  }

  producGet() {
    this.http.get('/producGet')
      .subscribe(r => {
        this.productList = r['data'];
      });
  }

  delet(id) {
    this.http.get('/producDelete', { id })
      .subscribe(r => {
        alert('删除成功');
        this.productList = this.productList.filter(a => a.id !== id);
      });
  }


  edit(id) {
    this.productID = id;
    this.http.get('/producGet', { id })
      .subscribe(r => {
        console.log(r);
        this.imgUrl = r['data']['0']['img'];
        this.img = `<img class="camera" src="${this.imgUrl}" alt="">`;
        this.name = r['data']['0']['name'];
        this.author = r['data']['0']['author'];
        this.content = r['data']['0']['content'];
        this.info = r['data']['0']['info'];
      });
  }
}
