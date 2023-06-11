import { Component } from '@angular/core';
import { CurrencyapidataService } from './currencyapidata.service';
import { async } from 'rxjs';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'mycurrencycalculator';
  currjson: any = [];
  cont1 = 'USD';
  cont2 = 'USD';
  curr1 = '0';
  curr2 = '0';
  calculateResult = 0;
  result: string = '1';

  changecount(a: string, b: string, c:string){      //The method is saving countries and currency before operations
    this.cont1 = a;
    this.cont2 = b;
    this.curr1 = String(Number(c));
  }

  constructor(private currency: CurrencyapidataService){}

  minusCheck(){                            //The method is designed to check the presence of a minus
    if(Number(this.curr1) < 0){
      let temp = 0
      temp = Number(this.curr1) * -1;
      this.curr1 = String(temp);
    }
    this.curr1 = String(Number(this.curr1));            //This is made to delete zeros on the beginning

    const input1 = document.getElementById('input1') as HTMLInputElement | null;
      if (input1 != null) {
      input1.value = (this.curr1);
    }

  }

  convert(){                            //This method downloading info from open API with last date and convertating 1st currency to the second one
    this.currency.getcurrencydata(this.cont1).subscribe(data => {
      this.currjson = JSON.stringify(data);
      this.currjson = JSON.parse(this.currjson);
      
      if(this.cont2 == "USD"){
        this.calculateResult = this.currjson.rates.USD.toFixed(5);
      }
      if(this.cont2 == "EUR"){;
        this.calculateResult = this.currjson.rates.EUR.toFixed(5);
      }
      if(this.cont2 == "UAH"){
        this.calculateResult = this.currjson.rates.UAH.toFixed(5);
      }
      this.result = String(Number(this.calculateResult).toFixed(3))
      this.calculate();
    })
    
  }
  calculate(){                          //This one method is calculating
    this.minusCheck();
    let temp = Number(this.curr1) * Number(this.calculateResult);
    this.curr2 = String(temp.toFixed(2));
    const input2 = document.getElementById('input2') as HTMLInputElement | null;
    if (input2 != null) {
      input2.value = this.curr2;
    }
  }


  rotateValue(c:string, d:string, a: string, b: string){
    this.cont1 = a;
    this.cont2 = b;

    this.curr1 = String(Number(c));           //This is made to delete zeros on the beginning

    const cont1 = document.getElementById('country1') as HTMLInputElement | null;
    if (cont1 != null) {
      cont1.value = (this.cont2);
    }

    const cont2 = document.getElementById('country2') as HTMLInputElement | null;
    if (cont2 != null) {
      cont2.value = (this.cont1);
    }

    const input1 = document.getElementById('input1') as HTMLInputElement | null;
    if (input1 != null) {
      input1.value = (this.curr2);
    }

    const input2 = document.getElementById('input2') as HTMLInputElement | null;
    if (input2 != null) {
      input2.value = (this.curr1);
    }
  }
}


