import { Link } from 'react-router-dom';
import { displayHeight, displayWeight } from '../../utils/helpers';

const Player = ({
    player,
    matches,
}: {
    player: TPlayer;
    matches: TMatch[];
}) => {
    const totalMatches = matches.filter((m) =>
        m.players.some((p) => p.id === player.id)
    );
    const winningMatches = matches.filter((m) => m.winner.id === player.id);
    const { firstname, lastname, picture, country, stats } = player;

    return (
        <Link
            className="mt-5 flex space-x-3"
            to={`/players/${player.id}`}
            data-cy="player-link-container"
        >
            <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-lg shadow-lg p-3 max-w-xs md:max-w-xl border border-white bg-white">
                <div className="w-full md:w-1/3 grid place-items-start">
                    <img
                        src={picture.url}
                        alt="player picture"
                        className="rounded-lg w-full h-[250px] min-w-[150px]"
                    />
                </div>
                <div className="w-full md:w-2/3 flex flex-col  space-y-2 p-3">
                    <div className="flex justify-between item-center">
                        <p className="text-gray-500 font-medium hidden md:block">
                            {firstname} {lastname}
                        </p>
                        <img
                            src={country.picture.url}
                            alt="flag"
                            className="rounded w-8 h-5"
                        />
                    </div>
                    <h3
                        id="stats-list"
                        className="text-gray-500 text-left font-medium hidden md:block"
                    >
                        Stats:
                    </h3>
                    <ul
                        aria-labelledby="stats-list"
                        className="text-gray-500 text-left list-disc ml-10"
                    >
                        <li>Age: {stats.age}</li>
                        <li>Rank: {stats.rank}</li>
                        <li>Points: {stats.points}</li>
                        <li>Weight: {displayWeight(stats.weight)}</li>
                        <li>Height: {displayHeight(stats.height)}</li>
                    </ul>
                    <div className="flex justify-between item-center">
                        <h3
                            id="matches-list"
                            className="text-gray-500 text-left font-medium hidden md:block"
                        >
                            Total of played matches: {totalMatches.length}
                        </h3>
                    </div>
                    <ul
                        aria-labelledby="matches-list"
                        className="text-gray-500 text-left list-disc ml-10"
                    >
                        <li>Wins 🙌: {winningMatches.length}</li>
                        <li>
                            Loses 😭:{' '}
                            {totalMatches.length - winningMatches.length}
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    );
};

export default Player;
