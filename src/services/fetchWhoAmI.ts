export const fetchWhoAmI = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error("Error fetching login");
    }

    return res;
  } catch (e) {
    throw new Error("Error fetching login");
  }
};
