import React from 'react';

export default function Form (props) {

    const { formChange, formSubmit, values, errors } = props;


    return(
        <form>
            <div className="errors">
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
            </div>
            {/*Name
            Email
            Password
            Terms of Service (checkbox)
            A Submit button to send our form data to the server*/}
            <label>
                Name
                <input
                    name='name'
                    type='text'
                    onChange={formChange}
                    value={values.name}
                ></input>
            </label><br />
            <label>
                Email
                <input
                    name='email'
                    type='email'
                    onChange={formChange}
                    value={values.email}
                ></input>
            </label><br />
            <label>
                Password
                <input
                    name='password'
                    type='text'
                    onChange={formChange}
                    value={values.password}
                ></input>
            </label><br />
            <label>
                Terms of Service
                <input
                    name='tos'
                    type='checkbox'
                    onChange={formChange}
                    value={values.tos}
                ></input>
            </label><br />
            <button onClick={formSubmit}>Submit</button>
        </form>
    )
}