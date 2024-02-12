import { render, screen, within } from '@testing-library/react';
import WinDetail from '.';
import dayjs from 'dayjs';

const player1: TPlayer = {
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

const player2: TPlayer = {
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

const match: TMatch = {
    players: [player1, player2],
    winner: player1,
    startTime: '2023-02-10T10:00:00.000Z',
    endTime: '2023-02-10T16:00:00.000Z',
};

const dateFormat = 'ddd DD/MM/YYYY HH:mm';

describe('Test WinDetail', () => {
    describe('Test rendering match without players', () => {
        beforeEach(() => {
            render(<WinDetail match={match} players={[]} />);
        });
        it('renders paragraphs', () => {
            expect(screen.getByText('Competition')).toBeInTheDocument();
            expect(
                screen.getByText(
                    `Start time: ${dayjs(match.startTime).format(dateFormat)}`
                )
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    `End time: ${dayjs(match.endTime).format(dateFormat)}`
                )
            ).toBeInTheDocument();
            expect(screen.getByText('Players:')).toBeInTheDocument();
        });
        it('renders empty players', () => {
            const playersList = within(
                screen.getByRole('list', {
                    name: /player/i,
                })
            );
            const playersListItem = playersList.getAllByRole('listitem');
            expect(playersListItem.length).toBe(2);

            expect(
                within(playersListItem[0]).getByText('')
            ).toBeInTheDocument();
            expect(
                within(playersListItem[1]).getByText('')
            ).toBeInTheDocument();
        });
    });
    describe('Test rendering match with players', () => {
        beforeEach(() => {
            render(<WinDetail match={match} players={[player1, player2]} />);
        });
        it('renders players', () => {
            const playersList = within(
                screen.getByRole('list', {
                    name: /player/i,
                })
            );
            const playersListItem = playersList.getAllByRole('listitem');
            expect(playersListItem.length).toBe(2);

            expect(
                within(playersListItem[0]).getByText(
                    `${player1.firstname} ${player1.lastname}`
                )
            ).toBeInTheDocument();
            expect(
                within(playersListItem[1]).getByText(
                    `${player2.firstname} ${player2.lastname}`
                )
            ).toBeInTheDocument();
        });
    });
});
