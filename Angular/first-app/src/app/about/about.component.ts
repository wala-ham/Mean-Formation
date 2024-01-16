import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  //string interpolation
  name='Wala hammemi';
  age= 24;
  //property binding
  imageUrl='https://static.vecteezy.com/system/resources/thumbnails/005/857/332/small/funny-portrait-of-cute-corgi-dog-outdoors-free-photo.jpg'
  alternative='cute dog';


  //event binding 
  change(){
    this.name='Master Class';
    this.age=45;
  }

  //two way data binding
  text =''
  // text='by default'

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
