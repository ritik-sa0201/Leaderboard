import axios from "axios";
import { axiosInstance } from "./axois";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
};

export const rankings = async () => {
  const response = await axiosInstance.get("/leaderboard/standings");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");

    return res.data;
  } catch (error) {
    console.log("error in getauth user");
  }
};

export async function getCount() {
  const resposne = await axiosInstance.get("/leaderboard/totalUsers");

  return resposne.data.count;
}

export async function addPointsUser(id) {
  const response = await axiosInstance.post("/user/addPoints");
  return response.data;
}

export async function getPointsUser() {
  const response = await axiosInstance.get("/user/totalPoints");

  return response.data.points;
}

export async function getUsers() {
  const response = await axiosInstance.get("/admin/users");
  return response.data.users;
}

export async function addAdminPoints(selectedUserId) {
  const response = await axiosInstance.post("/admin/addPoints", {
    selectedId: selectedUserId,
  });
  return response.data;
}

export async function addUser({ fullName, email, password }) {
  const res = await axiosInstance.post("/admin/addUser", {
    fullName,
    email,
    password,
  });
  return res.data;
}
