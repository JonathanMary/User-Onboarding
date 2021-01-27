import './App.css';
import React, { useState } from 'react';
import Form from './Form';
import schema from './Validation/formSchema';
import axios from 'axios';
import * as Yup from 'yup';

const initialFormValues = {
  name: "",
  email:"",
  password: "",
  tos: false,
}
const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  tos: false,
}

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([]);

  //run validation on changes, before saving it in form.
  const change = (name, value) => {
    Yup.reach(schema, name)
       .validate(value)
       .then(() => {
         setFormErrors({
           ...formErrors, [name]: "",
         });
       }).catch(err => {
         setFormErrors({
           ...formErrors,
           [name]: err.errors[0],
         });
       })
    setFormValues({
      ...formValues, [name]:value,
    });
  };

  //catch the values in the form, update it.
  const formChange = evt => {
    const { name, type, value, checked } = evt.target;
    const valueToUse = type === "checkbox"? checked:value;
    change(name, valueToUse);
  };

  //when a valid form is submitted, POST it
  const postNewUser = user => {
    axios
        .post(`https://reqres.in/api/users`, user)
        .then(res => {
          console.log("POST response: ", res.data)
          setUsers([res.data, ...users]);
        })
        .catch(err => console.log("err", err))
  };

  //action when submit button is pressed.
  const formSubmit = (evt) => {
    evt.preventDefault();
    schema.isValid(formValues).then( valid => {
      if(valid){
        const newUser = {
          name: formValues.name.trim(),
          email:formValues.email.trim(),
          password: formValues.password.trim(),
        };
        postNewUser(newUser);
        setFormValues(initialFormValues);
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form formChange={formChange} formSubmit={formSubmit} values={formValues} errors={formErrors} />
        {users.map(user => {
          return (
            <pre key={user.id}>
              {JSON.stringify(`name:${user.name}, email:${user.email}, id:${user.id}`)}
            </pre>
          )
        })}
      </header>
    </div>
  );
}

export default App;
