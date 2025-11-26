import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbotservice';
@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class ChatbotComponent {
   isOpen = false;
  pregunta = "";
  respuesta = "";
  cargando = false;

  togglePanel() {
    this.isOpen = !this.isOpen;
  }

  closePanel() {
    this.isOpen = false;
  }

  constructor(private cs:ChatbotService) {}

  preguntarIA() {
    if (!this.pregunta) return;

    this.cargando = true;
    this.respuesta = '';

    this.cs.getChatResponse(this.pregunta).subscribe({
      next: (res) => {
        this.respuesta = res.choices?.[0]?.message?.content || 'Sin respuesta';
        this.cargando = false;
      },
      error: () => {
        this.respuesta = 'Ocurrió un error al consultar la IA.';
        this.cargando = false;
      }
    });
  }

}
