import * as v from 'valibot';
import { error } from '@sveltejs/kit';
import { query } from '$app/server';
import type { Song } from '$lib/types/song.js';
import { loadSongs } from '$lib/server/songs';

const randomSchema = v.object({
    n: v.number(),
    years: v.optional(v.array(v.string()), undefined),
    exclude: v.optional(v.array(v.string()), []),
    requireAudio: v.optional(v.boolean(), true)
});

export const getRandomSongs = query(
    randomSchema,
    async ({ n, years, exclude, requireAudio }) => {
        const songs = await loadSongs();

        const filtered = Object.entries(songs).filter(([key, song]) => {
            const hasAllYears = !years || years.every((year) => song.positions[year]);
            return hasAllYears &&
                !exclude.includes(key) &&
                (!requireAudio || song.previewUrl);
        });

        if (filtered.length < n) {
            error(404, 'Not enough songs available.');
        }

        const selected = filtered
            .sort(() => Math.random() - 0.5)
            .slice(0, n);

        return selected as [string, Song][];
    }
);
