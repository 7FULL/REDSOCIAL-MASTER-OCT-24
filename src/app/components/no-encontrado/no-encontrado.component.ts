import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './no-encontrado.component.html',
  styleUrl: './no-encontrado.component.css'
})
export class NoEncontradoComponent implements OnInit {
  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    setTimeout(()=>{
      this.router.navigate([""])
    }, 5000)
  }

}
