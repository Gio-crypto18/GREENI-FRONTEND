import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Story {
  id: number;
  content: string;
}

interface Post {
  id: number;
  userName: string;
  avatar: string;
  date: string;
  content: string;
  liked: boolean;
  saved: boolean;
}

interface Trend {
  id: number;
  tag: string;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-comunidad',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './comunidad.html',
  styleUrls: ['./comunidad.css']
})
export class ComunidadComponent implements OnInit {
  // Datos de ejemplo
  stories: Story[] = [
    { id: 1, content: '🌱 Hoy sembramos 50 árboles en el parque central' },
    { id: 2, content: '💡 Tip Verde: desconecta tus aparatos en standby' },
    { id: 3, content: '📢 Este sábado: taller de reciclaje, ¡participa!' },
    { id: 4, content: '🙌 Usuario destacado: Ana López (10 publicaciones este mes)' },
    { id: 5, content: '#UnÁrbolPorTi 🌳 ¿Ya sembraste el tuyo?' }
  ];

  posts: Post[] = [
    { 
      id: 1, 
      userName: 'María Alave', 
      avatar: 'https://i.pravatar.cc/60', 
      date: 'Hoy', 
      content: '¡Bienvenidos a Greeni! Esperamos que todos ustedes sean amigos y compartan su amor por el planeta.',
      liked: false,
      saved: false
    },
    { 
      id: 2, 
      userName: 'Walter Requejo', 
      avatar: 'https://i.pravatar.cc/30', 
      date: 'Ayer', 
      content: 'Hoy planté un árbol en mi jardín y me siento muy feliz de contribuir al medio ambiente. ¿Tú ya plantaste el tuyo?',
      liked: false,
      saved: false
    },
    { 
      id: 3, 
      userName: 'Jhonathan Tasayco', 
      avatar: 'https://i.pravatar.cc/20', 
      date: 'Hace 2 días', 
      content: '¡Hoy hace mucho sol! Perfecto para regar nuestras plantas con energía positiva.',
      liked: false,
      saved: false
    },
    { 
      id: 4, 
      userName: 'Rodrigo Alaya', 
      avatar: 'https://i.pravatar.cc/10', 
      date: 'Hace 1 semana', 
      content: 'Aquí algunos tips de sostenibilidad: Usa bolsas reutilizables, cuida el agua y recicla para ayudar al planeta. ¿Qué otros tips tienes?',
      liked: false,
      saved: false
    }
  ];

  trends: Trend[] = [
    { id: 1, tag: '#RetoSinPlástico' },
    { id: 2, tag: '#EnergíaVerdeEnCasa' },
    { id: 3, tag: '#UnÁrbolPorTi' }
  ];

  recommendedFriends: Friend[] = [
    { id: 1, name: 'Luis Saldarriaga', avatar: 'https://i.pravatar.cc/60' },
    { id: 2, name: 'Edgar Mego', avatar: 'https://i.pravatar.cc/80' },
    { id: 3, name: 'Patrick Ortiz', avatar: 'https://i.pravatar.cc/90' },
    { id: 4, name: 'Rosangela Espinoza', avatar: 'https://i.pravatar.cc/71' }
  ];

  selectedImage: string | null = null;

  ngOnInit(): void {
    // Inicialización si es necesaria
  }

  // Métodos de la comunidad
  toggleSidebar(): void {
    // Lógica para mostrar/ocultar sidebar
    console.log('Toggle sidebar');
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value;
    console.log('Buscando:', searchTerm);
    // Implementar lógica de búsqueda
  }

  openStory(story: Story): void {
    console.log('Abriendo story:', story);
    // Navegar a la story o mostrar modal
  }

  showPostOptions(post: Post): void {
    console.log('Opciones del post:', post);
    // Mostrar menú de opciones
  }

  toggleLike(post: Post): void {
    post.liked = !post.liked;
    console.log('Post liked:', post.liked);
  }

  toggleSave(post: Post): void {
    post.saved = !post.saved;
    console.log('Post saved:', post.saved);
    if (post.saved) {
      alert('¡Publicación guardada!');
    } else {
      alert('Publicación retirada de guardados');
    }
  }

  searchTrend(tag: string): void {
    console.log('Buscando tendencia:', tag);
    // Implementar búsqueda por hashtag
  }

  showTrendOptions(trend: Trend): void {
    console.log('Opciones de tendencia:', trend);
    // Mostrar menú de opciones
  }

  followFriend(friend: Friend): void {
    console.log('Siguiendo a:', friend.name);
    alert(`¡Empezaste a seguir a ${friend.name}!`);
    // Implementar lógica de seguir
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('share-file-input') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}