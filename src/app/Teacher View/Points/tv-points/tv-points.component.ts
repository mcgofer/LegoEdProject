import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PointsFormDialogComponent } from '../points-form-dialog/points-form-dialog.component';
import PointItem from "../../../../models/point-model";
import { StudentsViewService } from "../../../students-view.service";
import { MatTableDataSource } from "@angular/material/table";
@Component({
  selector: 'app-tv-points',
  templateUrl: './tv-points.component.html',
  styleUrls: ['./tv-points.component.css']
})
export class TvPointsComponent implements OnInit {
  pointItem: PointItem = new PointItem();
  dataSource: MatTableDataSource<PointItem>;
  
  constructor(private studentsViewService: StudentsViewService, public dialog: MatDialog) { }

  ngOnInit() {
      // this.studentsViewService.pointsData$.subscribe(data => {
      //   this.dataSource = new MatTableDataSource(data);
      // }, error => {
      //   console.error(error);
      // });
      // this.studentsViewService.getPrizes();

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(PointsFormDialogComponent, {
      width: '290px',
      data: {
        description: this.pointItem.description,
        amount: this.pointItem.amount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      var newItem = Object.assign({}, result);
      console.log(newItem);

      //Add to data array on service
      if(result) {
        if(newItem.category == 'Reward')
        this.studentsViewService.addReward(newItem).subscribe(
          data => this.studentsViewService.getRewards()
        ) }
        
        else if (newItem.category == 'Prize'){
          this.studentsViewService.addPrize(newItem).subscribe(
            data => this.studentsViewService.getPrizes()
          )} 
          
          else if (newItem.category == 'Penalty'){
          this.studentsViewService.addPenalty(newItem).subscribe(
            data => this.studentsViewService.getPenalties()
           ) }
     
    //Clean the input
      this.pointItem = new PointItem;
    });
  }
}