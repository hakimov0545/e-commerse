import getAllCategories from "../../hooks/useCategories";
import "./Category.css";

function Category() {
  const { data: categories, isLoading, error } = getAllCategories();

  console.log(categories);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    <div>Error fetching products</div>;
  }
  return (
    <div>
      {categories.map((c) => (
        <div key={c._id}>
          <h1>{c.na}</h1>
        </div>
      ))}
    </div>
  );
}

export default Category;
