import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAutofill, addText, addUsers } from "./redux";

function App() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const text = useSelector((state) => state.text);
  const autofill = useSelector((state) => state.autofill);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(addUsers(response.data));
    };
    getData();
  }, [dispatch]);

  const filterUsers = (users, text) => {
    dispatch(addText(text));
    if (text !== undefined && text.length > 0) {
      const normalizedFilter = text.toLowerCase().trim();

      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(normalizedFilter)
      );
      dispatch(addAutofill(filteredUsers));
    } else {
      dispatch(addAutofill([]));
    }
  };

  const autofillInput = (e) => {
    dispatch(addText(e.target.textContent));
    dispatch(addAutofill([]));
  };

  const hideAutofillList = () => {
    setTimeout(() => dispatch(addAutofill([])), 100);
  };

  return (
    <div className="App">
      <div className="container">
        <input
          className="input"
          type="text"
          onChange={(e) => filterUsers(users, e.target.value)}
          value={text}
          onBlur={() => hideAutofillList()}
        ></input>
        <div className="suggestionsContainer">
          {autofill.map(({ id, username }) => (
            <div
              className="suggestions"
              onClick={(e) => autofillInput(e)}
              key={id}
            >
              {username}
            </div>
          ))}
        </div>
      </div>
      <p className="someContent">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic dicta
        voluptas ipsum incidunt iure accusantium perspiciatis dolor. Saepe sequi
        excepturi quo animi. Ut optio provident molestiae, quisquam nam
        voluptas? Accusantium nihil aliquid, excepturi perspiciatis at mollitia
        quo asperiores error amet fugit necessitatibus sapiente, eos sed
        explicabo et voluptates vero nemo, fuga id omnis qui doloribus! Expedita
        corporis quisquam assumenda temporibus obcaecati consequuntur quia,
        accusamus recusandae praesentium a quo ut iste sed numquam rem
        aspernatur eum vel totam alias! Nam quis accusamus, molestias quam
        laboriosam animi cumque earum, repudiandae voluptates, sint distinctio
        veritatis alias quae quasi vel culpa! Aliquid, quam repellendus?
      </p>
    </div>
  );
}

export default App;
