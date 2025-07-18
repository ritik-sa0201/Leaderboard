import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPointsUser, getPointsUser } from "../lib/api";

export function ClaimPointsUser() {
  const { authUser } = useAuthUser();
  const [user, setUser] = useState(authUser);
  const [totalPoints, setPoints] = useState(0);
  const [claiming, setClaiming] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: handleClaims, isLoading } = useMutation({
    mutationFn: addPointsUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["ranking", "points", "claim-history"]);
    },
  });

  const { data: Points, isLoading: pointsLoading } = useQuery({
    queryKey: ["points", user._id],
    queryFn: () => getPointsUser(user._id),
    enabled: !!user._id,
  });

  useEffect(() => {
    if (!pointsLoading && Points) {
      setPoints(Points);
    }
  }, [Points, pointsLoading]);

  const handleClaim = () => {
    setClaiming(true);
    handleClaims(user._id);
    toast.success(`🎉you earned some points!`);
    setClaiming(false);
  };

  return (
    <div className="card bg-base-200 shadow-lg flex flex-row items-center p-4">
      {/* Left: Profile Picture */}
      <div className="flex-shrink-0">
        <img
          src={user.profilePic}
          alt={user.fullName}
          className="w-24 h-24 rounded-full border-4 border-primary"
        />
      </div>

      {/* Right: User Info and Button */}
      <div className="ml-6 flex flex-col flex-1">
        <h2 className="text-2xl font-bold text-primary">{user.fullName}</h2>
        <p className="text-lg text-gray-600">
          🪙 <span className="font-semibold">{totalPoints}</span> points
        </p>

        <button
          onClick={handleClaim}
          disabled={claiming}
          className="btn btn-primary mt-4 w-40"
        >
          {claiming ? (
            <>
              <span className="loading loading-spinner"></span> Claiming...
            </>
          ) : (
            <>✨ Claim Points</>
          )}
        </button>
      </div>
    </div>
  );
}
