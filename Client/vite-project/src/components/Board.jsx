import { useState, useEffect } from "react";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { rankings } from "../lib/api";

export function Board() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    data: RankingsData,
    isLoading: RankingsLoading,
    refetch,
  } = useQuery({
    queryKey: ["ranking"],
    queryFn: rankings,
  });

  useEffect(() => {
    if (!RankingsLoading && RankingsData) {
      setUsers(RankingsData.data);
      setLoading(false);
    }
  }, [RankingsData, RankingsLoading]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-8 w-8 text-yellow-400 drop-shadow-lg" />;
      case 2:
        return <Trophy className="h-7 w-7 text-gray-400 drop-shadow-md" />;
      case 3:
        return <Medal className="h-7 w-7 text-yellow-700 drop-shadow-md" />;
      default:
        return <Award className="h-5 w-5 text-gray-400" />;
    }
  };

  const getBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return "badge badge-warning text-white font-bold text-lg px-4 py-2";
      case 2:
        return "badge badge-neutral text-white font-semibold text-lg px-4 py-2";
      case 3:
        return "badge badge-accent text-white font-semibold text-lg px-4 py-2";
      default:
        return "badge badge-outline";
    }
  };

  const getTopThreeBackground = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-2 border-yellow-400/50";
      case 2:
        return "bg-gradient-to-r from-gray-300/20 to-gray-500/20 border-2 border-gray-400/50";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-amber-800/20 border-2 border-amber-600/50";
      default:
        return "bg-base-300";
    }
  };

  if (loading) {
    return (
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-primary flex items-center gap-2 text-2xl">
            <Trophy className="h-6 w-6" /> Leaderboard
          </h2>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-base-300 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-base-100"></div>
                  <div className="w-24 h-3 bg-base-100 rounded"></div>
                </div>
                <div className="w-16 h-3 bg-base-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const topThree = users.slice(0, 3);
  const restOfUsers = users.slice(3, 10);

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-primary flex items-center gap-2 text-2xl mb-6">
          <Trophy className="h-6 w-6" /> Leaderboard
        </h2>

        {/* Top 3 Podium Section */}
        {topThree.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* 2nd Place */}
              {topThree[1] && (
                <div className="order-1 md:order-1">
                  <div
                    className={`${getTopThreeBackground(
                      2
                    )} rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg`}
                  >
                    <div className="flex justify-center mb-3">
                      {getRankIcon(2)}
                    </div>
                    <div className="avatar mb-3">
                      <div className="w-16 h-16 rounded-full border-4 border-gray-400">
                        <img src={topThree[1].profilePic} alt="Profile" />
                      </div>
                    </div>
                    <div className="font-bold text-lg">
                      {topThree[1].fullName}
                    </div>
                    <div className="text-sm opacity-70 mb-2">2nd Place</div>
                    <div className={getBadgeColor(2)}>
                      {topThree[1].totalPoints} pts
                    </div>
                  </div>
                </div>
              )}

              {/* 1st Place */}
              {topThree[0] && (
                <div className="order-2 md:order-2">
                  <div
                    className={`${getTopThreeBackground(
                      1
                    )} rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-2xl relative`}
                  >
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">👑</span>
                    </div>
                    <div className="flex justify-center mb-3">
                      {getRankIcon(1)}
                    </div>
                    <div className="avatar mb-3">
                      <div className="w-20 h-20 rounded-full border-4 border-yellow-400">
                        <img src={topThree[0].profilePic} alt="Profile" />
                      </div>
                    </div>
                    <div className="font-bold text-xl">
                      {topThree[0].fullName}
                    </div>
                    <div className="text-sm opacity-70 mb-2">🏆 Champion</div>
                    <div className={getBadgeColor(1)}>
                      {topThree[0].totalPoints} pts
                    </div>
                  </div>
                </div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <div className="order-3 md:order-3">
                  <div
                    className={`${getTopThreeBackground(
                      3
                    )} rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg`}
                  >
                    <div className="flex justify-center mb-3">
                      {getRankIcon(3)}
                    </div>
                    <div className="avatar mb-3">
                      <div className="w-16 h-16 rounded-full border-4 border-amber-600">
                        <img src={topThree[2].profilePic} alt="Profile" />
                      </div>
                    </div>
                    <div className="font-bold text-lg">
                      {topThree[2].fullName}
                    </div>
                    <div className="text-sm opacity-70 mb-2">3rd Place</div>
                    <div className={getBadgeColor(3)}>
                      {topThree[2].totalPoints} pts
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rest of the users */}
        {restOfUsers.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Other Rankings
            </h3>
            {restOfUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4 rounded-lg border hover:border-primary transition-all duration-200 bg-base-300 hover:bg-base-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(user.rank)}
                  </div>
                  <div>
                    <div className="flex flex-row items-center justify-center gap-4">
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-full">
                          <img src={user.profilePic} alt="Profile" />
                        </div>
                      </div>
                      <div className="font-semibold">{user.fullName}</div>
                      <div className="text-sm text-gray-500">
                        Rank #{user.rank}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`${getBadgeColor(user.rank)} px-3 py-1`}>
                    {user.totalPoints} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
