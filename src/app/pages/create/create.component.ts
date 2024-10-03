import { Component } from '@angular/core';
import { BlogFormComponent } from '../../components/blog-form/blog-form.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [BlogFormComponent, NavbarComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.sass',
})
export class CreateComponent {}
