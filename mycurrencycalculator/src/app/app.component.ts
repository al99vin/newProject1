import { Component } from '@angular/core';
import { CurrencyapidataService } from './currencyapidata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  ngOnInit(){
    this.input2[0].setAttribute('value', '0');
    this.input1[0].setAttribute('value', '0');
  }

  testinput = document.getElementById("input1");
  title = 'mycurrencycalculator';
  currjson: any = [];
  cont1 = 'USD';
  cont2 = 'USD';
  curr1 = '0';
  curr2 = '0';

  input1 = document.getElementsByClassName("input1");
  
  input2 = document.getElementsByClassName("input2");

  select1 = document.getElementsByClassName("selectLeft")
  select2 = document.getElementsByClassName("selectRight")
  

  result: string = '1';

  changecount1(a: string){
    this.cont1 = a;
  }

  changecount2(b: string){
    this.cont2 = b;
  }

  changecurr1(c: string){
  this.curr1 = c;
  }

  changecurr2(d: string){
  this.curr2 = d;
  }



  constructor(private currency: CurrencyapidataService){}

  convert(){
    this.currency.getcurrencydata(this.cont1).subscribe(data => {
      this.currjson = JSON.stringify(data);
      this.currjson = JSON.parse(this.currjson);
      


      if(this.cont2 == "USD"){
        this.result = this.currjson.rates.USD;
      }
      if(this.cont2 == "EUR"){
        this.result = this.currjson.rates.EUR;
      }
      if(this.cont2 == "UAH"){
        this.result = this.currjson.rates.UAH;
      }
    })
  }

  rotateValue(c:string, d:string, a: string, b: string){
   
    this.cont1 = a;
    this.cont2 = b;
    this.curr1 = c
    this.curr2 = d;
    console.log(this.curr1)
    //console.log(this.curr2)
    this.testinput = document.getElementById("input1");
    this.testinput?.replaceWith
    console.log(this.testinput);
    this.testinput?.setAttribute("value", `123`);
    console.log(this.curr1)
    console.log(this.testinput);
    //this.input1[0].setAttribute('value', this.curr2);
    this.input2[0].setAttribute('value', this.curr1);
    
  


  
    this.convert()
  }
  

}



//let input2 = document.getElementsByClassName("input2")

//let input1 = document.getElementsByClassName("input1")
