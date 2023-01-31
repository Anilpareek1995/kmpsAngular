import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  value = 0;
  loading = true;

  constructor() {
   
  }
  ngOnInit(): void {
    this.value = 0;
    this.loading = true;
    this.loadContent();
  }

  loadContent() {
    this.loading = true;
    const subs$: Subscription = interval(200).subscribe((res:any) => {
      this.value = this.value + 10;
      if(this.value === 120) {
        subs$.unsubscribe();
        this.loading = false;
        this.value = 0;
        console.log('Ha terminado');
      }
    });
  }
}
