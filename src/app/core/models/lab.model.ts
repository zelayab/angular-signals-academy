export type LabDifficulty = 'básico' | 'intermedio' | 'avanzado';

export interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: LabDifficulty;
  category: string;
  initialCode: string;
  expectedOutput: string;
}
