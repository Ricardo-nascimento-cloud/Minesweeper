import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment'; // Importa o 'browser' do SvelteKit

export enum DifficultyLevel {
  EASY = 'easy',
  NORMAL = 'normal',
  HARD = 'hard',
  CUSTOM = 'custom'
}

export interface GameDifficultySettings {
  rows: number;
  cols: number;
  bombs: number;
}

export const predefinedDifficultySettings: Record<DifficultyLevel, GameDifficultySettings> = {
  [DifficultyLevel.EASY]: {
    rows: 20,
    cols: 20,
    bombs: 30,
  },
  [DifficultyLevel.NORMAL]: {
    rows: 20,
    cols: 20,
    bombs: 45,
  },
  [DifficultyLevel.HARD]: {
    rows: 20,
    cols: 20,
    bombs: 60,
  },
  [DifficultyLevel.CUSTOM]: {
    rows: 20,
    cols: 20,
    bombs: 30,
  }
};

function isValidDifficultyLevel(value: string | null): value is DifficultyLevel {
  return value === DifficultyLevel.EASY ||
         value === DifficultyLevel.NORMAL ||
         value === DifficultyLevel.HARD ||
         value === DifficultyLevel.CUSTOM;
}

export const currentDifficultyLevel = writable<DifficultyLevel>(DifficultyLevel.NORMAL);

if (browser) {
  const storedLevel = localStorage.getItem('minesweeperDifficulty');
  const initialDifficulty: DifficultyLevel = isValidDifficultyLevel(storedLevel)
    ? storedLevel
    : DifficultyLevel.NORMAL;

  currentDifficultyLevel.set(initialDifficulty);

  currentDifficultyLevel.subscribe(value => {
    localStorage.setItem('minesweeperDifficulty', value);
  });
}

export const currentDifficultySettings = derived(
  currentDifficultyLevel,
  ($level) => predefinedDifficultySettings[$level]
);

export const customRows = writable<number>(predefinedDifficultySettings[DifficultyLevel.CUSTOM].rows);
export const customCols = writable<number>(predefinedDifficultySettings[DifficultyLevel.CUSTOM].cols);
export const customBombs = writable<number>(predefinedDifficultySettings[DifficultyLevel.CUSTOM].bombs);

function updateCustomSetting<K extends keyof GameDifficultySettings>(key: K, value: GameDifficultySettings[K]) {
 
  if (get(currentDifficultyLevel) === DifficultyLevel.CUSTOM) {
    predefinedDifficultySettings[DifficultyLevel.CUSTOM][key] = value;
    currentDifficultyLevel.set(get(currentDifficultyLevel));
  }
}

customRows.subscribe(rows => updateCustomSetting('rows', rows));
customCols.subscribe(cols => updateCustomSetting('cols', cols));
customBombs.subscribe(bombs => updateCustomSetting('bombs', bombs));