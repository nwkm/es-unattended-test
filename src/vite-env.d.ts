/// <reference types="vite/client" />

type TPicture = {
    url: string;
};

type TCountry = {
    code: string;
    picture: TPicture;
};

type TPlayer = {
    id: string;
    firstname: string;
    lastname: string;
    sex: 'MAN' | 'WOMAN';
    shortname: string;
    picture: TPicture;
    country: TCountry;
    stats: TStat;
};

type TStat = {
    rank: number;
    points: number;
    weight: number;
    height: number;
    age: number;
};

type TMatch = {
    players: TPlayer[];
    winner: TPlayer;
    startTime: string;
    endTime: string;
};
