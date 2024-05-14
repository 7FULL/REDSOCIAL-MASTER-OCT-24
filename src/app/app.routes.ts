import { Routes } from '@angular/router';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';

export const routes: Routes = [
    {
        path:"",
        title: "HOME",
        loadComponent: ()=> import ("./layouts/home/home.component").then(m => m.HomeComponent),
        children: [
            {
                path:"posts",
                loadComponent: ()=> import ("./components/posts/posts.component").then(m => m.PostsComponent),
                title: "POSTS"
            },
            {
                path:"postEspecifico/:id",
                loadComponent: ()=> import ("./components/post-especifico/post-especifico.component").then(m => m.PostEspecificoComponent)
            },
            {
                path:"perfil/:email",
                loadComponent: ()=> import ("./components/perfil/perfil.component").then(m => m.PerfilComponent)
            }
        ]
    },
    {
        path:"**",
        component: NoEncontradoComponent
    }
];
