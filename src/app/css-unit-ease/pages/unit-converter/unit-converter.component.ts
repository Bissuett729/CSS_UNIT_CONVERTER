import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-unit-converter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.scss']
})
export class UnitConverterComponent {
  public selectedUnit1: string = 'px';
  public selectedUnit2: string = 'rem';
  public inputValue1: number = 0;
  public inputValue2: number = 0;
  public rootFontSize: number = 16;
  public basePercentage: number = 100;
  public conversionResult: number = 0;
  public conversionResultUnit: string = this.selectedUnit2;

  public keys: { key: string; description: string }[] = [
    { key: 'C', description: 'Calculate and copy the result of calculation.' },
    { key: 'V', description: 'Calculate the result.' },
    { key: 'B', description: 'Copy the result of calculation.' },
    { key: 'R', description: 'Reverse the converter.' },
    { key: 'Q', description: 'Focus the first input.' },
    { key: 'W', description: 'Focus the second input.' }
  ];

  // Referencias a los inputs en el DOM
  @ViewChild('pixelsInput', { static: false }) pixelsInput!: ElementRef;
  @ViewChild('remSizeInput', { static: false }) remSizeInput!: ElementRef;

  // Listener para detectar teclas presionadas
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key.toUpperCase()) {
      case 'C':
        this.calculateAndCopy();
        break;
      case 'V':
        this.calculateResult();
        break;
      case 'B':
        this.copyResult();
        break;
      case 'R':
        this.reverseConverter();
        break;
      case 'Q':
        this.focusPixelsInput();
        break;
      case 'W':
        this.focusRemSizeInput();
        break;
    }
  }
  
  // Funciones de las teclas
  calculateAndCopy() {
    this.convertInputValue1();
    this.copyResult();
  }

  calculateResult() {
    this.convertInputValue1();
  }

  copyResult() {
    navigator.clipboard.writeText(this.conversionResult.toString()).then(() => {
      console.log('Resultado copiado:', this.conversionResult);
    });
  }

  reverseConverter() {
    [this.selectedUnit1, this.selectedUnit2] = [this.selectedUnit2, this.selectedUnit1];
    [this.inputValue1, this.inputValue2] = [this.inputValue2, this.inputValue1];
    this.conversionResultUnit = this.selectedUnit2;
    this.convertInputValue1();
  }

  focusPixelsInput() {
    this.pixelsInput.nativeElement.focus();
  }

  focusRemSizeInput() {
    this.remSizeInput.nativeElement.focus();
  }

  selectUnit1(value: string) {
    this.selectedUnit1 = value;
    this.convertInputValue1();
  }

  selectUnit2(value: string) {
    this.selectedUnit2 = value;
    this.convertInputValue1();
  }

  convertInputValue1() {
    this.conversionResult = this.convertUnits(this.inputValue1, this.selectedUnit1, this.selectedUnit2);
    this.inputValue2 = this.conversionResult;
    this.conversionResultUnit = this.selectedUnit2; // Actualiza la unidad de resultado
  }

  convertInputValue2() {
    this.conversionResult = this.convertUnits(this.inputValue2, this.selectedUnit2, this.selectedUnit1);
    this.inputValue1 = this.conversionResult;
    this.conversionResultUnit = this.selectedUnit1; // Actualiza la unidad de resultado
  }

  convertUnits(value: number, fromUnit: string, toUnit: string): number {
    if (fromUnit === toUnit) return value;

    let valueInPx = value;
    switch (fromUnit) {
      case 'rem':
      case 'em':
        valueInPx = value * this.rootFontSize;
        break;
      case 'cm':
        valueInPx = value * 37.7952755906;
        break;
      case 'in':
        valueInPx = value * 96;
        break;
      case 'pt':
        valueInPx = value * 1.333333;
        break;
      case '%':
        valueInPx = (value / 100) * this.basePercentage;
        break;
    }

    switch (toUnit) {
      case 'rem':
      case 'em':
        return valueInPx / this.rootFontSize;
      case 'cm':
        return valueInPx / 37.7952755906;
      case 'in':
        return valueInPx / 96;
      case 'pt':
        return valueInPx / 1.333333;
      case '%':
        return (valueInPx / this.basePercentage) * 100;
    }

    return valueInPx;
  }
}
