import { useEffect, useState } from "react";

const GetInbox = (url) => {
  const [inboxfetch, setinboxfetch] = useState();

  useEffect(() => {
    const inboxInterval = setInterval(async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        setinboxfetch(data);
      } catch (err) {
        alert(err.message);
      }
    }, 2000);
  }, [url]);

  return inboxfetch;
};
export default GetInbox;
