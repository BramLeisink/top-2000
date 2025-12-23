import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params;

    const response = await fetch(`https://api.deezer.com/track/${id}`);

    if (!response.ok) {
        throw error(404, 'Could not reach Deezer API');
    }

    const data = await response.json();

    if (data.error) {
        throw error(404, `Deezer API Error: ${data.error.message}`);
    }

    if (!data.preview) {
        throw error(404, 'Preview URL not found for this track');
    }

    throw redirect(307, data.preview);
};