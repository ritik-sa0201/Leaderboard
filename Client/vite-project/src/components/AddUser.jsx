import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../lib/api";

export function AddUser() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👀 Toggle

  const queryClient = useQueryClient();

  const { mutate: createUser, isLoading: adding } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success(`🎉 User added successfully!`);
      setFullName("");
      setEmail("");
      setPassword("");
      queryClient.invalidateQueries(["users", "ranking", "count"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "❌ Failed to add user");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error("⚠️ Please fill out all fields");
      return;
    }
    createUser({ fullName, email, password });
  };

  return (
    <div className="card bg-base-200 shadow-xl rounded-2xl">
      <div className="card-body space-y-5">
        <h2 className="card-title text-primary text-xl font-semibold">
          Add New User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="form-control">
            <label className="label font-medium text-base-content">
              Full Name
            </label>
            <input
              type="text"
              className="input input-bordered input-primary w-full"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={adding}
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label font-medium text-base-content">Email</label>
            <input
              type="email"
              className="input input-bordered input-primary w-full"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={adding}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label font-medium text-base-content">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered input-primary w-full pr-12"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={adding}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-primary hover:text-primary-focus"
              >
                {showPassword ? " Hide" : "👁 Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full rounded-full tracking-wide"
            disabled={adding}
          >
            {adding ? (
              <>
                <span className="loading loading-spinner" />
                Adding...
              </>
            ) : (
              <> Add User</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
