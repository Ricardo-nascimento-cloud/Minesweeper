import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface MediaPlayer {
    element: HTMLVideoElement | null;
    volume: number;
    isPlaying: boolean;
}

const initialState: MediaPlayer = {
    element: null,
    volume: 0.5,
    isPlaying: false,
};

export const audioPlayer = writable<MediaPlayer>(initialState);

export function initMedia(src: string): void {
    if (browser) {
        audioPlayer.update(state => {
            if (!state.element) {
                const element = document.createElement('video');
                element.src = src;
                element.loop = true;
                element.volume = state.volume;
                return { ...state, element };
            }
            return state;
        });
    }
}

export function playMedia(): void {
    audioPlayer.update(state => {
        if (state.element && !state.isPlaying) {
            state.element.play().catch(e => {
                console.error("Erro ao tocar a mídia:", e);
            });
            return { ...state, isPlaying: true };
        }
        return state;
    });
}

export function setVolume(newVolume: number): void {
    audioPlayer.update(state => {
        if (state.element) {
            state.element.volume = newVolume;
        }
        return { ...state, volume: newVolume };
    });
}

export function pauseMedia(): void {
    audioPlayer.update(state => {
        if (state.element && state.isPlaying) {
            state.element.pause();
            return { ...state, isPlaying: false };
        }
        return state;
    });
}

export function playEffect(src: string): void {
    if (browser) {
        const effect = new Audio(src);
        effect.volume = 0.5;
        effect.play().catch(e => console.error("Erro ao tocar efeito sonoro:", e));
    }
}
