import logo from "../../logo.svg";
import "../../App.css";
import { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";

// I want to ahve sign-up and sign in buttons
// Clicking Sign Up will review the Sign Up will will post
// Clicking Sign In will review do a get request, and if the get is ok, the next action will be a redirection
// Or Maybe it wont be a redirect, but the hidden div with the functionalty to use the app will go away
// Then I want to create a side bar that  Or just a buttont hat say old recipes.

export const PrimaryBackground = () => {
  <div
    className="background"
    style={{
      backgroundColor: "#F9EFDC",
      minHeight: "100hv",
      textAlign: "center",
    }}
  ></div>;
};

export const LogoIntro = () => {
  // State is set at the highest level of the component, "App"
  // const [inputIngredients, setInputIngredients] = useState("");
  // const [recipe, setRecipe] = useState(""); // what ever is passed into setAvice will be set to advice
  // const [count, setCount] = useState(0); // whatever is passed
  // const [recipeName, setRecipeName] = useState("");
  // const [recipeDisplay, setRecipeDisplay] = useState("none");
  // const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Async function to save Receipt
  // async function saveRecipe() {}

  // const clearRecipe = () => {
  //   setInputIngredients("");
  //   toggleSaveRecipeDisplay();
  // };

  // function toggleSaveRecipeDisplay() {
  //   recipeDisplay == "inline"
  //     ? setRecipeDisplay("none")
  //     : setRecipeDisplay("inline");
  // }

  // const toggleAccordion = () => {
  //   setIsAccordionOpen(!isAccordionOpen);
  // };

  // Async function that returns a promise that will call an API to get ChatGPT response
  // async function getRecipe() {
  //   const preLoadedPrompText =
  //     "Given the items provided below, I want to create a recipe that includes those items. In the response, I want the recipe name first, then I want a 'what i have' list which includes the items that I provided, and if the recipe requires anything more than the items, then I want a shopping list under the 'what i have' list to show me what additional ingredients i need to buy. My preference is for recipes that require no more than 3-4 ingredients to buy, with the least additional ingredients, the better. then I want the 'instructions' for how to prepare the receipe. Here are the ingredients I have below (so obviously I want to see them in the 'what I have list')";
  //   const fullGPTPrompt = preLoadedPrompText + inputIngredients;
  //   const request = {
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       {
  //         role: "user",
  //         content: fullGPTPrompt,
  //       },
  //     ],
  //   };
  //   const url = "https://api.openai.com/v1/chat/completions";

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization:
  //           "Bearer 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",
  //       },
  //       body: JSON.stringify(request),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error("HTTP error! Status:" + response.status);
  //       console.log(result);
  //     }

  //     // This will go away and be replaced by an API call to get a recipe
  //     // const result = await response.json(); // turn response to json
  //     setRecipe(result.choices[0].message.content);
  //     if (recipeDisplay == "none") {
  //       toggleSaveRecipeDisplay();
  //     } // ther esults of the API call will be set to advice by being passed into setAdvice method as a parameter
  //     setCount(count + 1); // each time getAdvice is called, the count will be increased by 1 because of the setCount method which has count + 1 as a parameter
  //     // setCount does not need to be passed into the function as a parameter be, because it is a constant defined in the useState method and can be used throughout the component. state should be set at the highest level of the component, like in the App component.
  //   } catch (error) {
  //     console.error("Failed to fetch Receipt from ChatGPT", error);
  //     setRecipe("Failed to get receipt due to error" + error);
  //   }
  // }

  return (
    <div
      className="background"
      style={{
        backgroundColor: "#F9EFDC",
        textAlign: "center",
      }}
    >
      {/* <nav
        style={{
          height: "50px",
          width: "100%",
          color: "brown",
          backgroundColor: "brown",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button onClick={toggleAccordion}>Menu</button>
        </div>
      </nav>
      {isAccordionOpen && (
        <div
          style={{
            width: "200px",
            background: "lightgray",
            position: "absolute",
            top: "50px",
            right: "0",
            zIndex: "999",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <a href="/">My Profile</a>
            </li>
            <li>
              <a href="/">Sign Out</a>
            </li>
          </ul>
        </div>
      )} */}

      {/* <h1> What Goes With This Bread?</h1> */}
      <br />
      <img
        src="logo-what-goes-with-this-bread.png"
        alt="logo"
        style={{ width: 350, height: "auto" }}
      />
      <br />
      <br />
      <p style={{ marginBotton: "10px" }}>
        Got random food items in your kitchen, but don't know what to make?
        <br />
        Use <strong>What Gos With This Bread?</strong> to turn any ingredients
        <br />
        you have laying around the kitchen into a quick, delicious meal.
        <br />
        <br />
        {/* Yep, we're powered by OpenAI. And nope, bread is not required.
        <br />
        {/* Just drop your ingredients below and lets make something <i>gooood</i>. */}
        {/* Just login below and lets make something <i>gooood</i>. */}
      </p>
      {/* <input
        type="text"
        value={inputIngredients}
        class="centered-placeholder form-control form-control-lg w-50 mx-auto"
        placeholder="Add your ingredients here"
        onChange={(e) => setInputIngredients(e.target.value)}
        style={{ marginTop: "30px", textAlign: "center", fontSize: "30px" }}
      />
      <br />
      <Container
        style={{
          display: recipeDisplay,
          width: "600px",
          borderRadius: "2px",
        }}
      >
        <br />
        <div
          style={{
            // color: "#ED8F51",
            color: "#C78941",
            display: recipeDisplay,
            width: "600px",
            borderRadius: "2px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              whiteSpace: "pre-line",
              backgroundColor: "white",
              borderRadius: "30px",
              textAlign: "center",
              maxWidth: "700px",
              margin: "auto",
              fontSize: "16px",
              paddingBottom: "20px",
              paddingTop: "10px",
              fontWeight: "bold",
            }}
          >
            {recipe}
          </p>
        </div>
        <br />
        <input
          type="text"
          value={recipeName == inputIngredients ? inputIngredients : recipeName}
          class="form-control-med w-10"
          placeholder={`Enter recipe name (ie. ${inputIngredients})`}
          onChange={(e) => setRecipeName(e.target.value)}
          style={{
            display: recipeDisplay,
            height: "40px",
            borderColor: "tan",
            borderRadius: "10px",
            paddingLeft: "5px",
            fontSize: "13px",
            width: "250px",
          }}
        />
        <Button
          onClick={saveRecipe}
          style={{
            display: recipeDisplay,
            width: "100px",
            backgroundColor: "#E0A629",
            color: "white",
            fontSize: "12.5px",
            borderColor: "tan",
            borderWidth: "0.5px",
            height: "40px",
            marginBottom: "5px",
            marginLeft: "2px",
          }}
        >
          Save Recipe
        </Button>
        <Button
          onClick={clearRecipe}
          style={{
            display: recipeDisplay,
            width: "100px",
            backgroundColor: "#C78941",
            color: "white",
            fontSize: "12.5px",
            borderColor: "tan",
            borderWidth: "0.5px",
            height: "40px",
            marginBottom: "5px",
            marginLeft: "2px",
            paddingBottom: "10px",
            paddingTop: "-30px",
          }}
        >
          Clear Recipe
        </Button>

        <br />
        <br />
      </Container>
      <br />
      <Button
        variant="success"
        onClick={getRecipe}
        style={{
          width: "230px",
          backgroundColor: "#6EAB4D",
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: "10px",
        }}
      >
        Let's Eat
      </Button>
      <Message howMany={count} /> */}
    </div>
  );
};

// Creating a second componeent for the message, as we typically break down messages.
// Any data we want to pass to the Message component, we pass it as props
// The specific data we want to pass is how many.
// function Message(props) {
//   return (
//     <p>
//       Recipes generated <strong>{props.howMany}</strong>
//     </p>
//   );
// }
