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
        <div className="w-full bg-green-300 flex flex-col rounded-lg shadow-lg p-3 border border-white">
            <h3 className="text-gray-500 ml-10 text-left font-medium hidden md:block">
                Details of winning matches:
            </h3>
            <div className="grid grid-cols-4 gap-4">
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
