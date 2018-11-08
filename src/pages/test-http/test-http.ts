import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-test-http',
  templateUrl: 'test-http.html',
})
export class TestHttpPage {
  apps : any = {};
  dataResponses : any = [];
  toServer : any = {count : null};
  isLoading = false;
  mahasiswa = {nim : null, nama : null, jurusan : null, kelas : null};
  constructor(public navCtrl: NavController, public navParams: NavParams, private http : HttpClient) {
  	this.http.get('http://localhost/serverionic/get-data.php').subscribe((res : any ) =>{
  		this.apps = res;
  	//this.http.get('assets/apps.json').subscribe((res : any ) =>{
  	//	this.apps = res;--!>
  	});
  }
  sendData(){
    this.isLoading = true;
    this.http.post('http://localhost/serverionic/process-data.php', this.toServer).subscribe((res : any) => {
      this.dataResponses = res;
      this.isLoading = false;
    })
  }
  saveMahasiswa(){
    this.isLoading = true;
    this.http.post('http://localhost/serverionic/save-mahasiswa.php', this.mahasiswa).subscribe((res : any) => {
      this.isLoading = false;
      this.mahasiswa = {nim : null, nama : null, jurusan : null, kelas : null};
    }, error=>{
      console.error(error);
      this.isLoading = false;
    })
  }
}
