import { useEffect, useState } from "react";
import { Board } from "../components/Board";
import { ClaimPoints } from "../components/ClaimPoints";
import { AddUser } from "../components/AddUser";
import { ClaimHistory } from "../components/ClaimHistory";
import { ClaimHistoryAdmin } from "../components/ClaimHistoryAdmin";

import { Trophy, Users, TrendingUp, Biohazard } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Header } from "../components/Header";
import useAuthUser from "../hooks/useAuthUser";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getCount } from "../lib/api";
import { ClaimPointsUser } from "../components/ClaimPointsUser";

export default function Index() {
  const { isLoading, authUser } = useAuthUser();
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    if (!isLoading) setisAdmin(authUser.role === "admin");
  }, [authUser]);

  const [count, setCount] = useState(0);

  const { data: countData, isLoading: CountLoading } = useQuery({
    queryKey: ["count"],
    queryFn: getCount,
  });

  useEffect(() => {
    if (!CountLoading && countData) setCount(countData);
  }, [countData]);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDataChange = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-primary/10">
      <Toaster position="top-center" />

      <Header profileUrl={authUser.profilePic} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Welcome {authUser.fullName}!
          </h1>
          <p className="text-base-content/70 text-lg">
            {isAdmin
              ? "Manage the leaderboard and track performance"
              : "Track your progress and compete with others"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Board />
          </div>

          <div className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl border border-primary/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="card-body p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/20 rounded-full">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      Total Players
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {count}+
                  </div>
                  <div className="text-sm text-base-content/60 mt-1">
                    Active members
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-success/10 to-success/5 shadow-xl border border-success/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="card-body p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-success/20 rounded-full">
                      <TrendingUp className="h-6 w-6 text-success" />
                    </div>
                    <span className="text-sm font-semibold text-success">
                      Status
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-success flex items-center gap-2">
                    Live
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-sm text-base-content/60 mt-1">
                    System online
                  </div>
                </div>
              </div>
            </div>

            {/* Action Cards Container */}
            <div className="card bg-base-100 shadow-xl border">
              <div className="card-body p-6">
                <h3 className="card-title text-lg mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  {isAdmin ? "Admin Actions" : "Player Actions"}
                </h3>
                <div className="space-y-4">
                  {isAdmin ? (
                    <>
                      <ClaimPoints />
                      <div className="divider my-2"></div>
                      <AddUser />
                    </>
                  ) : (
                    <ClaimPointsUser onPointsClaimed={handleDataChange} />
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
          </div>
        </div>

        {/* History Section */}
        <div className="mt-12">
          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6 flex items-center gap-2"></h2>
              {isAdmin ? (
                <ClaimHistoryAdmin refreshTrigger={refreshTrigger} />
              ) : (
                <ClaimHistory refreshTrigger={refreshTrigger} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl"></div>

        {/* Floating particles */}
        <div
          className="absolute top-20 right-20 w-4 h-4 bg-primary/30 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-32 left-32 w-3 h-3 bg-primary/40 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary/20 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  );
}
