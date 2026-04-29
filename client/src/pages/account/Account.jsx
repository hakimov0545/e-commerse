import { useUser } from "../../hooks/useProfile";
import style from "./Account.module.css";

function Account() {
  const { data, isLoading, error } = useUser();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}

export default Account;
