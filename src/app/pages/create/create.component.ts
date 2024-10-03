import { Component } from '@angular/core';
import { BlogFormComponent } from '../../components/blog-form/blog-form.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [BlogFormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.sass',
})
export class CreateComponent {}
