export interface Song {
    artist: string;
    title: string;
    coverUrl: string | null;
    previewUrl: string | null;
    releaseDate: string | null;
    language: string | null;
    positions: { [year: string]: number };
    external: {
        top2000?: {
            historyUrl?: string;
            detailUrl?: string;
        };
        genius?: {
            id?: number | undefined;
        };
        spotify?: {
            id?: string | undefined;
        };
        youtube?: {
            videoUrl?: string | undefined;
        };
        deezer?: {
            id?: string | undefined;
        };
    };
    theme?: {
        primary_color: string | null;
        secondary_color: string | null;
        text_color: string | null;
    };
}