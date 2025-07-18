import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2, UserCircle2 } from "lucide-react";
import { addAdminPoints, getUsers } from "../lib/api";
import { useState } from "react";

export function ClaimPoints({ onPointsClaimed }) {
  const [selectedUserId, setSelectedUserId] = useState("");
  const queryClient = useQueryClient();

  // ✅ Fetch users
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // ✅ Mutation for claiming points
  const { mutate: claimPoints, isLoading: claiming } = useMutation({
    mutationFn: addAdminPoints,
    onSuccess: (data) => {
      toast.success(`🎉 ${data.message}`);
      queryClient.invalidateQueries([
        "users",
        "ranking",
        "claim-history-admin",
      ]);
      if (onPointsClaimed) onPointsClaimed();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "❌ Failed to claim points");
    },
  });

  const handleClaim = () => {
    if (!selectedUserId) {
      toast.error("⚠️ Please select a user first");
      return;
    }
    claimPoints(selectedUserId);
  };

  if (usersLoading) {
    return (
      <div className="card bg-base-200 shadow-md p-4 text-center">
        <Loader2 className="animate-spin mx-auto h-8 w-8 text-primary" />
        <p className="text-gray-500 mt-2">Loading users...</p>
      </div>
    );
  }

  if (usersError) {
    toast.error("❌ Failed to load users");
    return (
      <div className="card bg-base-200 shadow-md p-4 text-center">
        <p className="text-red-500">Error loading users.</p>
      </div>
    );
  }

  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body space-y-4">
        <h2 className="card-title text-primary text-lg flex items-center gap-2">
          🪙 Claim Points
        </h2>

        <div className="space-y-2">
          <label className="label font-medium text-gray-700">
            Select a user
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullName} ({user.totalPoints} pts)
              </option>
            ))}
          </select>
        </div>

        {selectedUserId && (
          <div className="flex items-center gap-3 p-3 bg-base-300 rounded-lg">
            <UserCircle2 className="w-8 h-8 text-primary" />
            <div>
              <p className="font-semibold">
                {users.find((u) => u._id === selectedUserId)?.fullName}
              </p>
              <p className="text-xs text-gray-500">
                {users.find((u) => u._id === selectedUserId)?.email}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleClaim}
          disabled={!selectedUserId || claiming}
          className={`btn btn-primary w-full ${claiming && "btn-disabled"}`}
        >
          {claiming ? (
            <>
              <span className="loading loading-spinner"></span> Claiming...
            </>
          ) : (
            <>✨ Claim Random Points (1-10)</>
          )}
        </button>

        <p className="text-xs text-center text-gray-500">
          Award random points to the selected user.
        </p>
      </div>
    </div>
  );
}
