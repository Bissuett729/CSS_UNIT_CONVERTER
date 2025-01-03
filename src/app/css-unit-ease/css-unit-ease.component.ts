import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { UnitConverterComponent } from './pages/unit-converter/unit-converter.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-css-unit-ease',
  standalone: true,
  imports: [
    HeaderComponent,
    UnitConverterComponent,
    FooterComponent
  ],
  templateUrl: './css-unit-ease.component.html',
  styleUrl: './css-unit-ease.component.scss'
})
export class CssUnitEaseComponent {

}
