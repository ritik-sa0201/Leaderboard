import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { History, Clock, User } from "lucide-react";
import { axiosInstance } from "../lib/axois";

async function fetchHistory() {
  const response = await axiosInstance.get("/user/history");

  return response.data.claims;
}

export function ClaimHistory({ refreshTrigger }) {
  const {
    data: history = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["claim-history", refreshTrigger],
    queryFn: fetchHistory,
  });

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getPointsBadgeColor = (points) => {
    if (points >= 8) return "badge-primary";
    if (points >= 5) return "badge-secondary";
    return "badge-neutral";
  };

  if (isLoading) {
    return (
      <div className="card bg-base-200 shadow-md animate-pulse">
        <div className="card-body">
          <h2 className="card-title text-primary flex items-center gap-2">
            <History className="h-5 w-5" /> Recent Activity
          </h2>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-base-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-base-100"></div>
                  <div className="space-y-1">
                    <div className="w-20 h-3 bg-base-100 rounded"></div>
                    <div className="w-28 h-2 bg-base-100 rounded"></div>
                  </div>
                </div>
                <div className="w-10 h-5 bg-base-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    toast.error("❌ Failed to fetch claim history");
    return (
      <div className="text-center text-red-500">
        Error loading claim history
      </div>
    );
  }

  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body">
        <h2 className="card-title text-primary flex items-center gap-2">
          <History className="h-5 w-5" /> Recent Activity
        </h2>

        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No activity yet</p>
            <p className="text-sm">Start claiming points to see history!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 6).map((claim) => (
              <div
                key={claim._id}
                className="flex items-center justify-between p-3 rounded-lg bg-base-300 hover:bg-base-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">
                      Points Awarded: <em>{claim.pointsAwarded}</em>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(claim.claimedAt)}
                    </div>
                  </div>
                </div>
                <span
                  className={`badge ${getPointsBadgeColor(
                    claim.pointsAwarded
                  )}`}
                >
                  +{claim.pointsAwarded}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
