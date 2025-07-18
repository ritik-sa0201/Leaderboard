import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Biohazard, GitGraph, LogOut } from "lucide-react";
import { logout } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import { useNavigate } from "react-router";

export function Header({ profileUrl }) {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const { mutate: LogoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
    },
  });
  const navigate = useNavigate();

  async function handleLogout() {
    console.log("hello");
    try {
      await LogoutMutation();
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return (
    <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-2xl">
            <GitGraph className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">Pointly</h1>
            <p className="text-sm text-gray-500">
              Compete, claim points, and climb the ranks!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Profile Picture */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary">
            <img
              src={profileUrl || "https://i.pravatar.cc/150?u=example"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            className="btn btn-sm btn-outline btn-error flex items-center gap-2"
            onClick={() => handleLogout()}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
