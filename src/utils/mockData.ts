export const player1: TPlayer = {
    id: 'p-1',
    firstname: 'Gael',
    lastname: 'Monfils',
    sex: 'MAN',
    shortname: 'G.Monfils',
    picture: {
        url: 'pic1',
    },
    country: {
        picture: {
            url: 'country1',
        },
        code: 'FRA',
    },
    stats: {
        rank: 21,
        points: 1784,
        weight: 81000,
        height: 183,
        age: 35,
    },
};

export const player2: TPlayer = {
    id: 'p-2',
    firstname: 'Novak',
    lastname: 'Djokovic',
    sex: 'MAN',
    shortname: 'N.Djokovic',
    picture: {
        url: 'pic2',
    },
    country: {
        picture: {
            url: 'country2',
        },
        code: 'SEB',
    },
    stats: {
        rank: 2,
        points: 3784,
        weight: 80000,
        height: 185,
        age: 35,
    },
};

export const match: TMatch = {
    players: [player1, player2],
    winner: player1,
    startTime: '2023-02-10T10:00:00.000Z',
    endTime: '2023-02-10T16:00:00.000Z',
};
