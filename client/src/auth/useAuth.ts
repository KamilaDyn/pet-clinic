import axios, { AxiosResponse } from "axios";
import { axiosInstance } from "axiosInstance";
import { useUser } from "pages/SignIn/user/useUser";

export function useAuth() {
  const { updateUser } = useUser();
  async function authUser(
    urlEndpoint: string,
    email: string,
    password: string
  ) {
    try {
      const { data, status } = await axiosInstance({
        url: urlEndpoint,
        method: "POST",
        data: { email, password },
        headers: { "Content-Type": "application/json" },
      });

      if (status === 400) {
        const title = "message" in data ? data.message : " Unauthorized";
        console.log(title);
      }

      updateUser(data.user);
    } catch (err) {
      console.log(err);
    }
  }

  async function signUserIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    await authUser("/api/signin", email, password);
  }

  return { signUserIn };
}
