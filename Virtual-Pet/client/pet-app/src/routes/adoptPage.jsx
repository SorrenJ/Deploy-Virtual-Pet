import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SpeciesList from '../components/SpeciesList';
import PetsList from '../components/PetList';
import LoadingScreen from '../components/loadingScreen';

function AdoptPage() {
  const [speciesList, setSpeciesList] = useState([]);
  const [petsList, setPetsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speciesResponse = await fetch('/api/species');
        if (!speciesResponse.ok) throw new Error('Failed to fetch species');
        
        const species = await speciesResponse.json();
        console.log("Fetched species:", species);
    
        if (!Array.isArray(species)) {
          throw new Error('Invalid species data format');
        }
    
        setSpeciesList(species);
      } catch (error) {
        console.error('Error fetching species:', error);
        setError(error.message); // Display a user-friendly error message
      }
    };
    
    

    fetchData();
  }, []);

  const adoptPet = async (speciesId, petName, colorId) => {
    try {
      const response = await fetch('/api/adopt-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ species_id: speciesId, color_id: colorId }),
      });

      if (!response.ok) {
        throw new Error('Failed to adopt pet');
      }

      const adoptedPet = await response.json();

      const nameResponse = await fetch('/api/set-pet-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pet_id: adoptedPet.id, name: petName }),
      });

      if (!nameResponse.ok) {
        throw new Error('Failed to set pet name');
      }

      alert('Pet adopted and named successfully!');
      setLoading(true);
      setTimeout(() => {
        setIsTransitioning(true);
        navigate(`/home?newPetId=${adoptedPet.id}`);
      }, 4000);
    } catch (error) {
      console.error('Error adopting pet:', error);
      alert(error.message);
    }
  };

  // if (loading) {
  //   return <LoadingScreen isTransitioning={isTransitioning} />;
  // }

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <Helmet><title>Adopt</title></Helmet>
      <h1>Choose a species to adopt</h1>
      <SpeciesList speciesList={speciesList} adoptPet={adoptPet} />
      <PetsList petsList={petsList} />
    </div>
  );
}

export default AdoptPage;
