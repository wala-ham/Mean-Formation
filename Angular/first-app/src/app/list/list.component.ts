import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(public _shared: SharedService) { }
  heros: any;


  ngOnInit(): void {
    this._shared.getAllHero()
      .subscribe(
        (response)=>{
          console.log(this.heros);
          this.heros = response
           
        },err=>{
          console.log(err)
        }
      )

  }

   delete(id: any){
    
    this._shared.deleteHero(id)
      .subscribe(
        (response)=>{
          console.log(response);
          
          this.ngOnInit();

        },err=>{
          console.log(err)
        }
      );
    
  }

}
