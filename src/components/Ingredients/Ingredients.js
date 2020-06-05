import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS");
  });

  const filteredIngredients = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []); //caches function so it servive rerender cycle.

  const addIngredientHandler = (ingredient) => {
    fetch("https://react-hooks-update-f638c.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredients} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
