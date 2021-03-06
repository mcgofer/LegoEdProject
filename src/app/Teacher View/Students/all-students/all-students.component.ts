import { Component, OnInit } from '@angular/core';
import { StudentsViewService } from '../../../students-view.service';
import Student from '../../../../models/student-model';
import { MatTableDataSource } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { StudentFormDialogComponent } from '../student-form-dialog/student-form-dialog.component';
import { WarningDialogComponent } from '../../warning-dialog/warning-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {
  title: String;
  displayedColumns = ['present', 'firstName', 'lastName', 'edit'];
  color = 'accent';
  disabled = false;
  dataSource: MatTableDataSource<Student>;

  changedStudent: Student = new Student();

  constructor(private service: StudentsViewService, public dialog: MatDialog) { }

  ngOnInit() {
    this.title = 'All Students';
    this.service.studentsData$.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    },
      error => { console.error(error); }
    );
    this.service.getStudents();
  }

  // MARK STUDENT PRESENT
  markPresent(student) {
    this.service.studentPresent(student).subscribe(data => {
      this.service.getPresentStudents();
      this.service.getStudents();
    });
  }

  // ADD STUDENT
  openDialog(): void {
    let dialogRef = this.dialog.open(StudentFormDialogComponent, {
      width: "290px",
      data: {
        firstName: this.changedStudent.firstName,
        lastName: this.changedStudent.lastName,
        btnText: 'Add',
        title: 'Add Student'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      var newStudent = Object.assign({}, result);
      console.log(newStudent);

      // Add to data array on service
      if (result) {
        this.service
          .addStudent(newStudent)
          .subscribe(data => this.service.getStudents());
      }

      // Clean the input
      this.changedStudent = new Student();
    });
  }

  // EDIT STUDENT
  openEditDialog(student: Student): void {
    let dialogRef = this.dialog.open(StudentFormDialogComponent, {
      width: '290px',
      data: {
        firstName: student.firstName,
        lastName: student.lastName,
        btnText: 'Edit',
        title: 'Edit Student'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      var updStudent = Object.assign({}, result);
      updStudent.studentId = student.studentId;
      console.log(updStudent);
      if (result) {
        this.service
          .updStudent(updStudent)
          .subscribe(data => {
            this.service.getStudents();
            this.service.getPresentStudents();
          });
      }
    });
  }

  //DELETE (archieve) STUDENT
  openArchieveDialog(student: Student): void {
    let dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '310px',
      data: {
        text: 'Are you sure you want to remove ' + student.firstName + ' ' + student.lastName + ' from the student list?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.
          archieveStudent(student).subscribe(
            data => {
              this.service.getPresentStudents();
              this.service.getStudents();
            },
            error => {
              console.error(error)
            });
      }
    });
  }
}
