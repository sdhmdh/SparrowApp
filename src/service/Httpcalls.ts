import sparrowServer from "./api";
import type { User, Lender } from "../types";

interface ApiResponse<T> {
  data: T;
  status: number;
}

const getAuthToken = () => localStorage.getItem("authToken");

export const loginUser = async (
  email: string,
  password: string
): Promise<ApiResponse<{ token: string; user: User }>> => {
  try {
    const res = await sparrowServer.post("/login", { email, password });
    return res;
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw new Error(
      "Failed to log in. Please check your credentials and try again."
    );
  }
};

export const getPrequalifiedLenders = async (): Promise<
  ApiResponse<Lender[]>
> => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("Authorization token not found. Please log in again.");
  }

  try {
    const res = await sparrowServer.get("/lenders", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res;
  } catch (error: any) {
    console.error("Error fetching lenders:", error.message);
    throw new Error("Unable to retrieve lenders data. Please try again later.");
  }
};

export const setLenderBookmark = async (
  lenderId: string,
  bookmarked: boolean
): Promise<ApiResponse<Lender>> => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("Authorization token not found. Please log in again.");
  }

  try {
    const res = await sparrowServer.post(
      `/lenders/bookmark`,
      { lenderId, bookmarked },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return res;
  } catch (error: any) {
    console.error("Error setting lender bookmark:", error.message);
    throw new Error(
      "Unable to update bookmark status. Please try again later."
    );
  }
};
