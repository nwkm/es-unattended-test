import dayjs from 'dayjs';

const WinDetail = ({
    match,
    players: allPlayers,
}: {
    match: TMatch;
    players: TPlayer[];
}) => {
    const { startTime, endTime, players } = match;
    return (
        <div className="rounded-sm text-left flex flex-col bg-white shadow p-3 gap-2">
            <p className="text-blue-600 font-semibold">Competition</p>

            <p className="text-sm text-gray-800 font-light">
                Start time: {dayjs(startTime).format('ddd DD/MM/YYYY HH:mm')}
            </p>
            <p className="text-sm text-gray-800 font-light">
                End time: {dayjs(endTime).format('ddd DD/MM/YYYY HH:mm')}
            </p>
            <p className="text-sm text-gray-800 font-light">Players:</p>
            <ul className="text-gray-800 text-left list-none ml-10">
                {players.map((p) => {
                    const player = allPlayers.find((ps) => ps.id === p.id);
                    return (
                        <li key={p.id}>
                            {player?.firstname} {player?.lastname}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default WinDetail;
