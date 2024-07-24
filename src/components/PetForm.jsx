// src/components/PetForm.jsx

import { useState, useEffect } from 'react';

const PetForm = (props) => {
    const initialState = {
        name: '',
        age: '',
        breed: ''
      }
    const [formData, setFormData] = useState(initialState)

    useEffect(() => {
        if (props.selected) {
            setFormData({
              name: props.selected.name,
              age: props.selected.age,
              breed: props.selected.breed,
            });
          } else {
            setFormData(initialState);
          }
        }, [props.selected]);

        const handleChange = (evt) => {
            const { name, value } = evt.target;
            setFormData(prevState => ({
              ...prevState,
              [name]: value
            }));
          };

          const handleSubmit = (evt) => {
            evt.preventDefault();
            const { name, age, breed } = formData;
            const petData = { name, age, breed };
        
            if (props.selected) {
              console.log('Updating pet with ID:', props.selected._id);  
              props.handleUpdatePet(petData, props.selected._id);
            } else {
              props.handleAddPet(petData);
            }
          };
        
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Name </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="age"> Age </label>
        <input
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <label htmlFor="breed"> Breed </label>
        <input
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
        <button type="submit">{props.selected ? 'Update Pet' : 'Add New Pet'}</button>
      </form>
    </div>
  );
};

export default PetForm;
