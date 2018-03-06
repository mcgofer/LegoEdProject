import { Injectable } from '@angular/core';
import PointItem from '../models/point-model';
import Student from '../models/student-model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';


var PENALTIES: Array<PointItem> = [{ pointId: 1, catId  : 2, description:'pushing', amount: 300}, { pointId: 2, catId : 2, description:'yelling', amount: 100}, { pointId: 3, catId : 3, description:'missing class', amount: 100}, { pointId: 4, catId : 1, description:'no homework', amount: 200}, { pointId: 5, catId : 3, description:'making fun of', amount: 200}]
var REWARDS: Array<PointItem> = [{ pointId: 1, catId: 2, description: 'helping student', amount: 300}, { pointId: 2, catId
  : 2, description: 'extra credit', amount: 100}, { pointId: 3, catId
  : 3, description: 'helping teacher', amount: 100}, { pointId: 4, catId
  : 1, description: 'help clean', amount: 200}, { pointId: 5, catId
  : 3, description: 'exceptional work', amount: 200}]
var PRIZES: Array<PointItem> = [{ pointId: 1, catId
  : 3, description: 'movie for 2', amount: 200}, { pointId: 2, catId
  : 2, description: 'you choose next topic', amount: 300}, { pointId: 3, catId
  : 1, description: 'lead the next activity', amount: 200}, { pointId: 4, catId
  : 3, description: 'Choose your own project', amount: 100}, { pointId: 5, catId
  : 3, description: 'be teacher for a day', amount: 500}];
var STUDENTS: Array<Student> = [{
  'studentId': 1, 'firstName': 'Eugen', 'lastName': 'Whitton', 'rating': 67, 'balance': 26, 'present': false
}, {
  'studentId': 2,
  "firstName": "Saul",
  "lastName": "Garza",
  "rating": 99,
  "balance": 9,
  "present": true
}, {
  "studentId": 3,
  "firstName": "Lilias",
  "lastName": "Bramer",
  "rating": 98,
  "balance": 11,
  "present": true
}, {
  "studentId": 4,
  "firstName": "Colver",
  "lastName": "Vuitte",
  "rating": 68,
  "balance": 32,
  "present": true
}, {
  "studentId": 5,
  "firstName": "Joannes",
  "lastName": "Mecozzi",
  "rating": 94,
  "balance": 35,
  "present": false
}, {
  "studentId": 6,
  "firstName": "Gothart",
  "lastName": "Vasyutkin",
  "rating": 87,
  "balance": 16,
  "present": true
}, {
  "studentId": 7,
  "firstName": "Emogene",
  "lastName": "Hassall",
  "rating": 82,
  "balance": 18,
  "present": false
}, {
  "studentId": 8,
  "firstName": "Franzen",
  "lastName": "Aery",
  "rating": 78,
  "balance": 36,
  "present": false
}, {
  "studentId": 9,
  "firstName": "Peadar",
  "lastName": "Hutfield",
  "rating": 77,
  "balance": 41,
  "present": false
}, {
  "studentId": 10,
  "firstName": "Cobbie",
  "lastName": "Scandroot",
  "rating": 68,
  "balance": 34,
  "present": true
}, {
  "studentId": 11,
  "firstName": "Claresta",
  "lastName": "Bidewell",
  "rating": 88,
  "balance": 13,
  "present": true
}, {
  'studentId': 12,
  "firstName": "Borg",
  "lastName": "Bestwerthick",
  "rating": 66,
  "balance": 25,
  "present": false
}, {
  "studentId": 13,
  "firstName": "Malena",
  "lastName": "Mosby",
  "rating": 97,
  "balance": 16,
  "present": false
}, {
  "studentId": 14,
  "firstName": "Calypso",
  "lastName": "Svanetti",
  "rating": 100,
  "balance": 36,
  "present": true
}, {
  "studentId": 15,
  "firstName": "Dianne",
  "lastName": "Robart",
  "rating": 60,
  "balance": 30,
  "present": true
}, {
  "studentId": 16,
  "firstName": "Dore",
  "lastName": "Bertelet",
  "rating": 100,
  "balance": 11,
  "present": false
}, {
  "studentId": 17,
  "firstName": "Koo",
  "lastName": "Bray",
  "rating": 78,
  "balance": 24,
  "present": false
}, {
  "studentId": 18,
  "firstName": "Maxy",
  "lastName": "Hainey`",
  "rating": 90,
  "balance": 34,
  "present": false
}, {
  "studentId": 19,
  "firstName": "Kaitlin",
  "lastName": "Bog",
  "rating": 54,
  "balance": 12,
  "present": true
}, {
  "studentId": 20,
  "firstName": "Marilin",
  "lastName": "Littley",
  "rating": 80,
  "balance": 5,
  "present": false
},  {
  "studentId": 21,
  "firstName": "Dore",
  "lastName": "Bertelet",
  "rating": 100,
  "balance": 11,
  "present": false
}];

@Injectable()
export class StudentsViewService {
  studentsData$: Subject<Student[]> = new Subject;
  presentStudentsData$: Subject<Student[]> = new Subject;
  students: Student[] = STUDENTS;
  prizes: PointItem[] = PRIZES;
  penalties: PointItem[] = PENALTIES;
  rewards: PointItem[] = REWARDS;
  pointsData$: Subject<PointItem[]> = new Subject;

  constructor(private http: HttpClient) { }


  //GET ALL STUDENTS
    getStudents():void {
    // return this.students;
    this.http.get<Student[]> ('api/students/all').subscribe(
      data => this.studentsData$.next(data)
    );
  }
  
   //GET PRESENT STUDENTS
  getPresentStudents() : Observable<Student[]> {
    return this.http.get<Student[]> ('api/students/getpresent');
  }
  
  //ADD STUDENT
  addStudent(newStudent:Student): Observable <Student>  {
    console.log(newStudent);
    // newStudent.studentId = this.generateId();
    // newStudent.rating = 0;
    // newStudent.balance = 0;
    // newStudent.present = false;
    // this.students.push(newStudent);
    // console.log(this.students);
    return this.http.post<Student>('api/students/add', newStudent);
  }


 //GET POINTS
  getPrizes(): void {
    this.http.get<PointItem[]> ('api/points/all/prizes').subscribe(
      data => this.pointsData$.next(data)
    );

  }

  getPenalties(): void{
    this.http.get<PointItem[]> ('api/points/all/penalties').subscribe(
      data => this.pointsData$.next(data)
    );
  }


  getRewards(): void {
    this.http.get<PointItem[]> ('api/points/all/rewards').subscribe(
      data => this.pointsData$.next(data)
    );
  }
  
  //ADD POINT ITEM
  addPointItems(newItem: PointItem): Observable<PointItem>{
    console.log(newItem);
    return this.http.post<PointItem>('api/points/add', newItem);
  }

}
