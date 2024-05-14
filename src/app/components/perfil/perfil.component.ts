import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  user: User = {}

  constructor(
    private route: ActivatedRoute,
    private service: UserService
  ){}

  ngOnInit(): void {      
    this.user = this.service.getByMail(this.route.snapshot.paramMap.get("email")!)
  
    console.log(this.user)
  }
}
