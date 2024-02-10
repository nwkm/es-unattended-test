import { useGetPlayersQuery } from '../../api/players.api';
import { useGetMatchesQuery } from '../../api/matches.api';
import Player from '../../components/Player';

function App() {
    const { data: playersData } = useGetPlayersQuery({});
    const { data: matchesData } = useGetMatchesQuery({});

    const { players } = playersData ?? { players: [] as TPlayer[] };
    const { matches } = matchesData ?? { matches: [] as TMatch[] };

    return (
        <div className="min-h-screen flex-col justify-center items-start">
            <h1 className="text-3xl font-bold text-blue-600" data-cy="title">
                Unattended Test
            </h1>
            <div className="grid grid-cols-1">
                {players.map((p) => (
                    <Player key={p.id} player={p} matches={matches} />
                ))}
            </div>
        </div>
    );
}

export default App;
