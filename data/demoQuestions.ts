import type { QuestionSet } from '@/types/question.types'

/**
 * Set de preguntas demo estilo "100 Mexicanos Dijeron".
 *
 * Usado para jugar sin necesidad de cuenta — cargado directamente
 * en el GameContext via `RESET_GAME` con este set.
 *
 * Reglas de puntos:
 * - La respuesta más popular tiene más puntos
 * - El total por pregunta suma ~100 puntos
 * - Mínimo 5, máximo 8 respuestas por pregunta
 */
export const DEMO_QUESTION_SET: QuestionSet = {
  id: 'demo-set-001',
  title: '100 Mexicanos Dijeron — Demo',
  description: 'Preguntas de demostración para jugar sin necesidad de crear cuenta',
  userId: null,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  questions: [
    {
      id: 'q01',
      text: '¿Qué es lo primero que haces al levantarte?',
      answers: [
        { id: 'q01-a1', text: 'Ver el teléfono', points: 38, orderIndex: 1 },
        { id: 'q01-a2', text: 'Ir al baño', points: 27, orderIndex: 2 },
        { id: 'q01-a3', text: 'Preparar café', points: 18, orderIndex: 3 },
        { id: 'q01-a4', text: 'Hacer ejercicio', points: 10, orderIndex: 4 },
        { id: 'q01-a5', text: 'Desayunar', points: 7, orderIndex: 5 },
      ],
    },
    {
      id: 'q02',
      text: 'Nombra algo que siempre hay en la cocina de una casa mexicana',
      answers: [
        { id: 'q02-a1', text: 'Tortillas', points: 35, orderIndex: 1 },
        { id: 'q02-a2', text: 'Chile', points: 25, orderIndex: 2 },
        { id: 'q02-a3', text: 'Frijoles', points: 20, orderIndex: 3 },
        { id: 'q02-a4', text: 'Salsa', points: 12, orderIndex: 4 },
        { id: 'q02-a5', text: 'Limón', points: 8, orderIndex: 5 },
      ],
    },
    {
      id: 'q03',
      text: '¿Qué hace la gente cuando no puede dormir?',
      answers: [
        { id: 'q03-a1', text: 'Ver el teléfono', points: 32, orderIndex: 1 },
        { id: 'q03-a2', text: 'Ver televisión', points: 24, orderIndex: 2 },
        { id: 'q03-a3', text: 'Contar ovejas', points: 18, orderIndex: 3 },
        { id: 'q03-a4', text: 'Tomar leche caliente', points: 13, orderIndex: 4 },
        { id: 'q03-a5', text: 'Leer un libro', points: 9, orderIndex: 5 },
        { id: 'q03-a6', text: 'Dar vueltas en la cama', points: 4, orderIndex: 6 },
      ],
    },
    {
      id: 'q04',
      text: 'Nombra algo que la gente siempre lleva a la playa',
      answers: [
        { id: 'q04-a1', text: 'Toalla', points: 30, orderIndex: 1 },
        { id: 'q04-a2', text: 'Bloqueador solar', points: 26, orderIndex: 2 },
        { id: 'q04-a3', text: 'Agua o bebidas', points: 20, orderIndex: 3 },
        { id: 'q04-a4', text: 'Sombrilla', points: 14, orderIndex: 4 },
        { id: 'q04-a5', text: 'Traje de baño', points: 7, orderIndex: 5 },
        { id: 'q04-a6', text: 'Snacks', points: 3, orderIndex: 6 },
      ],
    },
    {
      id: 'q05',
      text: '¿Cuál es el platillo que más piden los mexicanos en restaurante?',
      answers: [
        { id: 'q05-a1', text: 'Tacos', points: 40, orderIndex: 1 },
        { id: 'q05-a2', text: 'Pozole', points: 22, orderIndex: 2 },
        { id: 'q05-a3', text: 'Enchiladas', points: 17, orderIndex: 3 },
        { id: 'q05-a4', text: 'Caldo de pollo', points: 12, orderIndex: 4 },
        { id: 'q05-a5', text: 'Chiles rellenos', points: 9, orderIndex: 5 },
      ],
    },
    {
      id: 'q06',
      text: '¿Qué revisa la gente primero cuando agarra el teléfono?',
      answers: [
        { id: 'q06-a1', text: 'WhatsApp', points: 42, orderIndex: 1 },
        { id: 'q06-a2', text: 'Redes sociales', points: 28, orderIndex: 2 },
        { id: 'q06-a3', text: 'Correo electrónico', points: 14, orderIndex: 3 },
        { id: 'q06-a4', text: 'Noticias', points: 10, orderIndex: 4 },
        { id: 'q06-a5', text: 'La hora', points: 6, orderIndex: 5 },
      ],
    },
    {
      id: 'q07',
      text: '¿Qué es lo que más extraña la gente cuando viaja al extranjero?',
      answers: [
        { id: 'q07-a1', text: 'La comida mexicana', points: 38, orderIndex: 1 },
        { id: 'q07-a2', text: 'La familia', points: 28, orderIndex: 2 },
        { id: 'q07-a3', text: 'Los amigos', points: 16, orderIndex: 3 },
        { id: 'q07-a4', text: 'La música', points: 10, orderIndex: 4 },
        { id: 'q07-a5', text: 'Las tortillas', points: 8, orderIndex: 5 },
      ],
    },
    {
      id: 'q08',
      text: 'Nombra algo que siempre pasa en las reuniones familiares mexicanas',
      answers: [
        { id: 'q08-a1', text: 'Alguien llega tarde', points: 30, orderIndex: 1 },
        { id: 'q08-a2', text: 'Hay demasiada comida', points: 25, orderIndex: 2 },
        { id: 'q08-a3', text: 'Los tíos preguntan del novio/novia', points: 20, orderIndex: 3 },
        { id: 'q08-a4', text: 'Se pone música a todo volumen', points: 14, orderIndex: 4 },
        { id: 'q08-a5', text: 'Discute alguien', points: 7, orderIndex: 5 },
        { id: 'q08-a6', text: 'Sacan el dominó o cartas', points: 4, orderIndex: 6 },
      ],
    },
    {
      id: 'q09',
      text: '¿Qué hace la gente cuando se va la luz?',
      answers: [
        { id: 'q09-a1', text: 'Buscar velas', points: 32, orderIndex: 1 },
        { id: 'q09-a2', text: 'Usar la linterna del teléfono', points: 28, orderIndex: 2 },
        { id: 'q09-a3', text: 'Asomarse por la ventana', points: 18, orderIndex: 3 },
        { id: 'q09-a4', text: 'Llamar a la CFE', points: 12, orderIndex: 4 },
        { id: 'q09-a5', text: 'Dormir', points: 10, orderIndex: 5 },
      ],
    },
    {
      id: 'q10',
      text: '¿Qué compras en el supermercado que no tenías planeado?',
      answers: [
        { id: 'q10-a1', text: 'Frituras o botanas', points: 34, orderIndex: 1 },
        { id: 'q10-a2', text: 'Dulces o chocolates', points: 26, orderIndex: 2 },
        { id: 'q10-a3', text: 'Refresco', points: 18, orderIndex: 3 },
        { id: 'q10-a4', text: 'Helado', points: 13, orderIndex: 4 },
        { id: 'q10-a5', text: 'Pan dulce', points: 9, orderIndex: 5 },
      ],
    },
    {
      id: 'q11',
      text: 'Nombra algo que la gente hace cuando se aburre en el trabajo',
      answers: [
        { id: 'q11-a1', text: 'Ver el teléfono', points: 36, orderIndex: 1 },
        { id: 'q11-a2', text: 'Tomar café', points: 24, orderIndex: 2 },
        { id: 'q11-a3', text: 'Platicar con compañeros', points: 20, orderIndex: 3 },
        { id: 'q11-a4', text: 'Ver redes sociales', points: 13, orderIndex: 4 },
        { id: 'q11-a5', text: 'Comer algo', points: 7, orderIndex: 5 },
      ],
    },
    {
      id: 'q12',
      text: '¿Qué dices cuando algo te sale mal?',
      answers: [
        { id: 'q12-a1', text: 'Ay no', points: 30, orderIndex: 1 },
        { id: 'q12-a2', text: 'Ya estuvo', points: 24, orderIndex: 2 },
        { id: 'q12-a3', text: 'No puede ser', points: 20, orderIndex: 3 },
        { id: 'q12-a4', text: 'Me lleva el tren', points: 15, orderIndex: 4 },
        { id: 'q12-a5', text: 'Híjole', points: 11, orderIndex: 5 },
      ],
    },
  ],
}
