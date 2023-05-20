type TileProps = {
    stat: string;
    value: number;
};

const Tile: React.FC<TileProps> = ({ stat, value }) => {

    return (<div className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl shadow-purple-500/50 rounded-md">
        <div className="flex flex-col justify-between p-16">
            <div className="flex gap-8">
                <div className="flex flex-col items-center justify-center ">
                    <div className="text-white text-2xl">{value.toString()}</div>
                    <div className="text-white text-2xl">{stat.toString()}</div>
                </div>
            </div>
        </div>
    </div>)
}

export default Tile;
