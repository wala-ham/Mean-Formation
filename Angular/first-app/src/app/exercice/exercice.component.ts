import { Component } from '@angular/core';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent {

  user = {
    name : 'wala',
    age : '24',
    image : 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Mikasa-Ackermann.Attack-on-Titan.webp'
  }


  myname='';
  changeName(){
    this.user.name=this.myname;
  }

}
