import { Component } from '@angular/core';
// DATA
import * as DATA from '../../data'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public units : any = DATA.dropdownData

  onOptionSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected option:', selectedValue);
  }

}
