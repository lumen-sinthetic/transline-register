const selfURL = process.env.NEXT_PUBLIC_SELF_URL;
if (!selfURL) {
  throw new Error("NEXT_PUBLIC_SELF_URL env not found");
}

const localeCookieKey = "NEXT_LOCALE";

export { selfURL, localeCookieKey };
