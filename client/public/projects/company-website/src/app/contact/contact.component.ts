import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  submitted = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitted = true;
      console.log('Form submitted:', form.value);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.submitted = false;
        form.reset();
      }, 3000);
    }
  }
}