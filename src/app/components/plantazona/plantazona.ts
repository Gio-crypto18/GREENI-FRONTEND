import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from "../chatbot/chatbot";
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-plantas',
  standalone: true,
  imports: [CommonModule, ChatbotComponent,ReactiveFormsModule,RouterLink,MatIcon,RouterModule,RouterOutlet],
  templateUrl: './plantazona.html',
  styleUrl: './plantazona.css',
})
export class Plantazona {
constructor(public route:ActivatedRoute) {}

}
