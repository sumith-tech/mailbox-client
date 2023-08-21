import { useEffect, useState } from "react";
import axios from "axios";
const SentMails = (url, changes) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        const data = await response.data;
        setData(data);
      } catch (err) {
        alert(err);
      }
    };
    getData();
  }, [url, changes]);
  return [data];
};
export default SentMails;
