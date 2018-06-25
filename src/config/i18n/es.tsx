const es = {
  global: {
    yes: 'Si',
    no: 'No'
  },
  login: {
    'logIn': 'Ingresar con'
  },
  home: {
    'hello': 'Hola',
    'logout': 'Cerrar Sesión',
    'about': 'Acerca de',
    'menu': 'Menú',
    lang: {
      'label': 'Cambiar Idioma a',
      'target': 'en',
      'targetName': 'Inglés (English)'
    },
    join: {
      'title': 'Unirse a una Sesión',
      'subtitle': 'Ingrese el ID de la sesión planning',
      'button': 'Unirse',
      'error': 'Ingrese un ID de sesión válido'
    },
    create: {
      'title': 'Crear Sesión',
      'subtitle': 'Carga tu backlog y estas listo para planear!',
      'button': 'Crear Sesión'
    }
  },
  session: {
    'sid': 'ID de Sesión',
    'copyClipboard': 'Copiar ID',
    'copySuccess': 'Copiado!',
    'addMember': 'Agregar Miembros',
    'team': 'Equipo',
    'backlog': 'Historias',
    'addStory': 'Agregar Historia',
    'emptyTeam': 'Sin miembros aun',
    'emptyBacklog': 'Sin historias aun',
    'hintTeam': 'Use el botón más (+) para invitar los miembros del equipo.',
    'hintBacklog': 'Use el botón más (+) para incluir nuevas historias en su backlog',
    'noVoting': 'La sesión no ha iniciado aun, esperando por la señal del anfitrión',
    'completed': 'La sesión ha sido completada, la votación ya no está disponible',
    'confirmUpdate': 'Realmente deseas actualizar la sesión?',
    'statusValidation': 'Debe configurar el equipo e historias para iniciar la sesión',
    'votes': 'Ha estimado',
    buttons: {
      'start': 'Iniciar Sesión',
      'end': 'Finalizar Sesión',
      'next': 'Siguiente Historia'
    },
    invite: {
      'title': 'Invita a tu equipo',
      'paragraph': 'Digita los emails manualmente o copia y pega una lista de emails. ' +
                   'Separa los email con espacio y/o coma, o ingresa cada email en una línea nueva.',
      'hint': 'Las direcciones duplicadas o inválidas serán ignoradas, también si el miembro ya fué invitado.',
      'button': 'Invitar Equipo',
      'success': 'Actualizado!',
      'remove': 'Realmente deseas remover este miembro?'
    },
    story: {
      'title': 'Agregar Historias',
      'paragraph': 'Ingresa las historias como texto manualment o copia y pega una lista de historias. ' +
                   'Separa cada historia de usuario con una nueva línea.',
      'button': 'Agregar Historias',
      'success': 'Actualizado!',
      'remove': 'Realmente deseas eliminar esta historia?'
    }
  }
}

export default {
  translation: es
}
