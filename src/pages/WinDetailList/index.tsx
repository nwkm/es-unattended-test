import { useParams } from 'react-router-dom';
import { useGetMatchesQuery } from '../../api/matches.api';
import WinDetail from '../../components/WinDetail';
import { useGetPlayersQuery } from '../../api/players.api';

const WinDetails = () => {
    const params = useParams();
    const { data: matchesData } = useGetMatchesQuery({});
    const { data: playersData } = useGetPlayersQuery({});

    const { players } = playersData ?? { players: [] as TPlayer[] };
    const { matches } = matchesData ?? { matches: [] as TMatch[] };
    const winningMatches = matches.filter((m) => m.winner.id === params.id);

    return (
        <div className="w-full  flex flex-col rounded-lg shadow-lg p-3">
            <h3
                className="text-white text-left font-medium hidden md:block"
                data-cy="windetail-title"
            >
                Details of winning matches:
            </h3>
            <div
                className="grid grid-cols-4 gap-4"
                data-testid="windetail-list-container"
            >
                {winningMatches.map((match, idx) => {
                    return (
                        <WinDetail key={idx} match={match} players={players} />
                    );
                })}
            </div>
        </div>
    );
};

export default WinDetails;
