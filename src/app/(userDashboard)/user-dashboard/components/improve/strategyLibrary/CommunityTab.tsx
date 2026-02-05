import { Button } from "antd";
import { FaCopy, FaStar } from "react-icons/fa";

export default function CommunityTab() {
  const items = [
    {
      name: "Institutional Gap Fill",
      author: "TraderPro",
      win: "72.5%",
      trades: 155,
      rating: 4.8,
      segment: "Indian Stocks",
      followers: "1240",
      clones: "342",
    },
    {
      name: "Options Iron Condor",
      author: "OptionsGuru",
      win: "68.2%",
      trades: 89,
      rating: 4.6,
      segment: "F&O",
      followers: "980",
      clones: "267",
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-primary/10 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 flex flex-col lg:flex-row justify-between gap-6 shadow-sm"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg dark:text-white">{item.name}</h3>
              <span className="bg-purple-600 text-[10px] text-white px-1.5 py-0.5 rounded font-bold">
                PRO
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-4">by {item.author}</p>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-xs text-slate-400">Win Rate</p>
                <p className="font-bold text-teal-500 text-lg">{item.win}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Trades</p>
                <p className="font-bold dark:text-white text-lg">
                  {item.trades}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Rating</p>
                <p className="font-bold dark:text-white text-lg flex items-center gap-1">
                  <FaStar
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />{" "}
                  {item.rating}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Segment</p>
                <p className="font-bold dark:text-white text-lg">
                  {item.segment}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center min-w-50">
            <Button type="primary" className="bg-purple-600 h-11 font-semibold">
              View Strategy
            </Button>
            <Button
              icon={<FaCopy size={16} />}
              className="h-11 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
            >
              Clone to My Strategies
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
