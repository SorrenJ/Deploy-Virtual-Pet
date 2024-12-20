import React, { useEffect, useState } from 'react';
import PetMoodUpdater from '../components/petMoodUpdater';

const PetPage = () => {
  const userId = 1;  // Replace with correct logic for fetching userId
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`https://virtual-pet-backend-3nat.onrender.com/api/user-pets/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    if (userId) { // Ensure that userId is defined
      fetchPets();
    } else {
      console.error("User ID is undefined!");
    }
  }, [userId]);

  return (
    <div>
      <h1>Your Pets</h1>
      {pets.length > 0 ? (
        pets.map((pet) => (
          <div key={pet.id}>
            <h2>{pet.name}</h2>
            <img src={pet.pet_image_url} alt={`${pet.name}`} />
            <PetMoodUpdater 
              userId={userId} 
              petId={pet.id} 
              currentImage={pet.pet_image_url} // Pass current image URL
              setPetImage={(newImage) => {
                // Update the pet image in the pets state dynamically
                setPets((prevPets) => 
                  prevPets.map((p) => 
                    p.id === pet.id ? { ...p, pet_image_url: newImage } : p
                  )
                );
              }}
            />
          </div>
        ))
      ) : (
        <p>No pets found.</p>
      )}
    </div>
  );
};

export default PetPage;
