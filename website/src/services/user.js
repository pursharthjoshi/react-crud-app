import publicReq, { privateReq } from "./axiosConfig";

export const registerService = (data) => publicReq.post("/register", data);
export const loginService = (data) => publicReq.post("/login", data);
export const updateProfileService = (data) => privateReq.post("/update-profile", data);
export const getProfileService = () => privateReq.get("/get-profile");

export const getAllUsersService = () => privateReq.get("/get-all-users");
export const deleteUserService = (id) => privateReq.delete('/delete-user/' + id)