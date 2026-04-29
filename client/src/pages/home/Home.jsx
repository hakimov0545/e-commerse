import "./Home.css";
import getAllProducts from "../../hooks/useProducts";
import { useMutation } from "@tanstack/react-query";
import mainService from "../../service/main.service";

function Home() {
  const { data: products, isLoading, error } = getAllProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    <div>Error fetching products</div>;
  }

  return (
    <div className="container">
      <div className="cards">
        {products.map((e) => (
          <div key={e._id} className="card">
            <h2>{e.name}</h2>
            <p>{e.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
