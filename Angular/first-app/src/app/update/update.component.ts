import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
hero : any;
id:any;

constructor(private act:ActivatedRoute,
            private shared : SharedService,
            private router: Router){}


  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    console.log(this.id);

    this.shared.getHeroById(this.id)
      .subscribe(
        (response)=>{
          this.hero = response;  
        },err=>{
          console.log(err)
        }
      )
  }

update(){
  this.shared.updateHero(this.id, this.hero )
    .subscribe(
      (response)=>{
       
        console.log(response);
        this.router.navigate(['/list']);


        },err=>{console.log(err)}
        )         
      }   
}
