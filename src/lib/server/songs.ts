import type { Song } from '$lib/types/song';

let cache: Record<string, Song> | null = null;

export async function loadSongs(): Promise<Record<string, Song>> {
    if (!cache) {
        const data = await import('$lib/data/external/songs.json');
        cache = data.default as Record<string, Song>;
    }

    if (!cache) {
        throw new Error('Failed to load songs');
    }

    return cache;
}
