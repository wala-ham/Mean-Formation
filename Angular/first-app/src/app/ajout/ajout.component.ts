import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})
export class AjoutComponent {


  hero = {
    name : '',
    power : 0 
  }


  ajouter(){
    this._shared.heros.push(this.hero);
   
    this.hero = {
      name : '',
      power : 0 
    }
  }

  //snd version
  ajoute(){
    this._shared.createNewHero(this.hero)
    .subscribe(res =>{
      console.log(this.hero);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Hero has been saved',
        showConfirmButton: true,
        timer: 1500
      });
      this.hero = {
        name : '',
        power : 0 
      }
      this.router.navigate(['/list']);
    }, err=>{
      console.log(err)
    }
    );
  }




  //with uploads 
  image : any;
  selectImage(e:any){
    this.image = e.target.files[0];
    console.log(this.image);
    
  }

  ajouteUpload(){
    let myFormData= new FormData()
    myFormData.append('name' , this.hero.name );
    myFormData.append('power', this.hero.power.toString());
    myFormData.append('image' , this.image );

    this._shared.createNewHeroUpload(myFormData)
    .subscribe(res =>{
      console.log(this.hero);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Hero has been saved',
        showConfirmButton: true,
        timer: 1500
      });
      


      this.hero = {
        name : '',
        power : 0 
      }

      this.router.navigate(['/list']);
     

    }, err=>{
      console.log(err)
    }
    );
  }







  constructor(public _shared : SharedService,private router: Router) {}
}
