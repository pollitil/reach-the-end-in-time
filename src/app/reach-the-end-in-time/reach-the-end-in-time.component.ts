import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reach-the-end-in-time',
  templateUrl: './reach-the-end-in-time.component.html',
  styleUrls: ['./reach-the-end-in-time.component.scss']
})
export class ReachTheEndInTimeComponent implements OnInit {
  cantidad: number;
  cadena: string = "";
  movimientos: number;
  totalMovimientos: number = 0;
  nodos: any[];
  contador: number = 0;
  capturarFlag: boolean = false;
  resultado: string = "";
  expand: Nodo[];
  cola: Nodo[];
  constructor() { }

  ngOnInit(): void {
  }

  capturar = () => {
    if(this.cantidad > 0){
      this.capturarFlag = true;
      this.nodos = [];
      for (let i = 0; i < this.cantidad; i++) {
        this.nodos.push([]);
      }
    }      
  }
  siguiente = () => {
    if( this.cadena.length == this.cantidad ){
      if((this.contador == 0 && this.cadena[0]=='.') || this.contador > 0){
        for(let i = 0; i<this.cantidad; i++){
          this.nodos[this.contador].push({caracter: this.cadena[i],anterior:null,x:this.contador,y:i,visitado:false});
        }
        this.contador++;
        this.cadena = "";
      }      
    }
  }
  calcularMovimientos(){
    for(let i=0; i<this.cantidad; i++){
      for(let j=0; j<this.cantidad; j++){
        this.nodos[i][j].visitado = false;
        this.nodos[i][j].anterior = null;
      }
    }
    this.cola = [];
    this.expand = [];
    this.totalMovimientos = 0;

    this.cola.push(this.nodos[0][0]);
    if(this.rutaMasCorta()){
      this.anlizarRuta(this.expand.pop());     

      if(this.movimientos >= this.totalMovimientos){
        this.resultado = 'Yes';
      }else{
        this.resultado = 'No';
      }
    }else{
      this.resultado = 'No tiene solucion';
    }
    
  }

  keyPress = (evt) => {
    if((evt.keyCode == 46 || evt.keyCode == 35 ) && this.cadena.length < this.cantidad){
      return true;
    }
    return false;
  }
  
  rutaMasCorta = (): boolean =>{
    if(this.cola.length == 0 && (this.expand[this.expand.length-1].x != this.cantidad-1 || this.expand[this.expand.length-1].y != this.cantidad-1)){
      return false;
    }
    if(this.expand.length > 0 && this.expand[this.expand.length-1].x == this.cantidad-1 && this.expand[this.expand.length-1].y == this.cantidad-1){
      return true;
    }
    let item = this.cola[0];
    let nodoAux;
    this.cola.splice(0,1);
    this.expand.push(item);
    let x = item.x;
    let y = item.y;

    if( x > 0 ){
      nodoAux = this.nodos[x-1][y];
      this.validateCola( nodoAux, item);
    }
    if( y > 0 ){
      nodoAux = this.nodos[x][y-1];
      this.validateCola( nodoAux, item);
    } 
    if((x+1) < this.cantidad){
      nodoAux = this.nodos[x+1][y];
      this.validateCola( nodoAux, item);
    }   
    if((y+1) < this.cantidad){
      nodoAux = this.nodos[x][y+1];
      this.validateCola( nodoAux, item);
    }  
    return this.rutaMasCorta();
  }
  validateCola = (nodoAux: Nodo, item: Nodo) => {
    if(
      this.expand.indexOf(nodoAux) === -1 &&
      this.cola.indexOf(nodoAux) === -1 &&
      nodoAux.caracter != '#'
    ){
      nodoAux.anterior = item;
      this.cola.push(nodoAux);
    }
  }
  anlizarRuta = (nodo: Nodo) => {
    nodo.visitado = true;
    if(nodo.anterior == null){
      return;
    }
    this.totalMovimientos++;
    return this.anlizarRuta(nodo.anterior);
  };
  reset = () => {
    this.cantidad = 0;
    this.contador = 0;
    this.cadena = "";
    this.movimientos = 0;
    this.totalMovimientos = 0;
    this.nodos = [];
    this.capturarFlag = false;
    this.resultado  = "";
    this.expand = [];
    this.cola = [];
  }
}

interface Nodo {
  caracter: string;
  x: number;
  y: number;
  anterior: Nodo;
  visitado: boolean;
}
