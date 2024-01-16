import { Component } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent {
//ngIF
  display = true;

  //exIf
  displayImage = true;
  url='https://d.newsweek.com/en/full/1955557/attack-titan.jpg?w=1200&f=3d355bc0ad34eb94ab189465aff41b67'


  //ngFor
  fruits = ['apple','banana','orange'];
  //exFor
  students = [
    {'name':'John Doe','age':25},
    {'name':'Mikasa','age':30},
    {'name':'Eran','age':51},
    {'name':' Doe','age':22}
  ]

  //EXERCICE IF+FOR

  //ngSwitch
  superhero = 'Thor';

  //ngStyle
  user = {
    name: 'wala',
    age: 24,
    bg: 'blue',
    color: 'green'
    }
  
  //ngClass
  //STUDENTS
}
