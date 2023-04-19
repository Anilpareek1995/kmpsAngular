import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-card',
  templateUrl: './top-card.component.html',
  styleUrls: ['./top-card.component.scss'],
})
export class TopCardComponent {
  constructor() {}

  @Input() dashboardlist = {
    EveningAmt:0,
EveningFat:0,
EveningQty:0,
EveningSnf:0,
MilkPaymentInYear:0,
MilkQuantityInYear:0,
MilkSupplyDaysInYear:0,
MorningAmt:0,
MorningFat:0,
MorningQty:0,
MorningSnf:0,
ProductDeduction:0,
ShareDeduction:0,
Summer:0,
Winte:0
  }
}
