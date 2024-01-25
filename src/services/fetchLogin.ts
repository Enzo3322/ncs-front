export const fetchLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/session`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!res || !res.ok) {
      throw new Error("Email ou senha incorretos");
    }

    return res;
  } catch (e) {
    throw new Error("Error fetching login");
  }
};
