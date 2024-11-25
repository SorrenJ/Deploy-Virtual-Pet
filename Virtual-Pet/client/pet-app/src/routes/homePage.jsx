import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import UserFoodTable from '../components/UserFoodTable';
import UserToiletriesTable from '../components/UserToiletriesTable';
import UserToysTable from '../components/UserToysTable';
import Sentiment from 'sentiment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../styles/home.scss';
import '../styles/progressBars.scss';
import '../styles/background.scss';

const sentimentAnalyzer = new Sentiment();

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petStats, setPetStats] = useState(null);
  const [sprite, setSprite] = useState('');
  const [moodId, setMoodId] = useState(null);
  const [visibleComponent, setVisibleComponent] = useState(1);
  const [userFood, setUserFood] = useState([]);
  const [userToiletries, setUserToiletries] = useState([]);
  const [userToys, setUserToys] = useState([]);
  const [forceRender, setForceRender] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const spriteRef = useRef(null);

  const [isUpdated, setIsUpdated] = useState(false); // State to track updates

  // Fetch general pet and user data on mount
  useEffect(() => {
    const savedSelectedPetId = localStorage.getItem('selectedPetId');
    fetchGeneralData(savedSelectedPetId);
  }, []);

  const fetchGeneralData = async (savedSelectedPetId) => {
    try {
      const response = await fetch('/api/home');
      const data = await response.json();

      if (!data || !data.pets) throw new Error('Invalid API response');

      setPets(data.pets);
      setUserFood(data.userFood || []);
      setUserToiletries(data.userToiletries || []);
      setUserToys(data.userToys || []);

      if (data.pets.length > 0) {
        const restoredPet = data.pets.find(p => p.pet_id === parseInt(savedSelectedPetId));
        const firstPet = restoredPet || data.pets[0];
        setSelectedPet(firstPet);
      }
    } catch (error) {
      console.error('Error fetching general data:', error);
    }
  };

  const fetchPetStats = async (petId) => {
    try {
      const response = await fetch(`/api/pets-stats/${petId}`);
      const data = await response.json();

      if (!data) throw new Error('Invalid pet stats response');

      setPetStats(data);
      const colorId = data.color_id;
      const moodOptions = calculateMoodOptions(data);
      const newMoodId = moodOptions[0].id;

      if (newMoodId !== moodId) {
        setMoodId(newMoodId);
        await updatePetMood(petId, newMoodId);
        await fetchPetSprite(petId, newMoodId, colorId);
      }
    } catch (error) {
      console.error('Error fetching pet stats:', error);
    }
  };

  const fetchPetSprite = async (petId, moodId, colorId) => {
    try {
      const spriteResponse = await fetch(`/api/pets-stats/pet-sprite/${petId}?mood_id=${moodId}&color_id=${colorId}`);
      const spriteData = await spriteResponse.json();

      if (!spriteData.image_url) throw new Error('Sprite not found');

      const spriteWithCacheBuster = `${spriteData.image_url}?v=${new Date().getTime()}`;
      if (sprite !== spriteData.image_url) {
        setSprite(spriteWithCacheBuster);
      }
    } catch (error) {
      console.error('Error fetching sprite:', error);
    }
  };

  const updatePetMood = async (petId, newMoodId) => {
    try {
      const response = await fetch(`/api/pets-stats/update-mood/${petId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood_id: newMoodId }),
      });

      if (!response.ok) throw new Error('Failed to update mood');
    } catch (error) {
      console.error('Error updating mood:', error);
    }
  };

  const calculateMoodOptions = (data) => {
    const moodOptions = [
      { stat: 'hunger', value: data.hunger, id: data.hunger < 30 ? 5 : 1 },
      { stat: 'energy', value: data.energy, id: data.energy < 30 ? 6 : 1 },
      { stat: 'happiness', value: data.happiness, id: data.happiness < 30 ? 12 : 1 },
      { stat: 'cleanliness', value: data.cleanliness, id: data.cleanliness < 30 ? 9 : 1 },
    ];

    moodOptions.sort((a, b) => a.value - b.value || a.id - b.id);
    return moodOptions;
  };


  const feedPet = async (petId, foodId) => {
    try {
      const response = await fetch('/api/feed-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ petId, foodId }),
      });
  
      if (!response.ok) throw new Error('Failed to feed pet');
  
      const data = await response.json();
      if (data.success) {
        alert('Pet fed successfully!');
        setIsUpdated(prev => !prev);
      }
    } catch (error) {
      console.error('Error feeding pet:', error);
    }
  };
  
  const cleanPet = async (petId, toiletriesId) => {
    try {
      const response = await fetch('/api/clean-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ petId, toiletriesId }),
      });
  
      if (!response.ok) throw new Error('Failed to clean pet');
  
      const data = await response.json();
      if (data.success) {
        alert('Pet cleaned successfully!');
        setIsUpdated(prev => !prev);
      }
    } catch (error) {
      console.error('Error cleaning pet:', error);
    }
  };
  
  const playWithPet = async (petId, toyId) => {
    try {
      const response = await fetch('/api/play-with-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ petId, toyId }),
      });
  
      if (!response.ok) throw new Error('Failed to play with pet');
  
      const data = await response.json();
      if (data.success) {
        alert('Pet played successfully!');
        setIsUpdated(prev => !prev);
      }
    } catch (error) {
      console.error('Error playing with pet:', error);
    }
  };
  

  const renderTable = () => {
    if (visibleComponent === 4) {
      return (
        <>
          <UserFoodTable userFood={userFood} feedPet={feedPet} selectedPet={selectedPet} />
          <UserToiletriesTable userToiletries={userToiletries} cleanPet={cleanPet} selectedPet={selectedPet} />
          <UserToysTable userToys={userToys} playWithPet={playWithPet} selectedPet={selectedPet} />
        </>
      );
    }

    switch (visibleComponent) {
      case 1:
        return <UserFoodTable userFood={userFood} feedPet={feedPet} selectedPet={selectedPet} />;
      case 2:
        return <UserToiletriesTable userToiletries={userToiletries} cleanPet={cleanPet} selectedPet={selectedPet} />;
      case 3:
        return <UserToysTable userToys={userToys} playWithPet={playWithPet} selectedPet={selectedPet} />;
      default:
        return null;
    }
  };

  return (
    <div className="homepage-container">
      <div className="overlay"></div>
      <div className="light-clouds"></div>
      <Helmet><title>Adopt</title></Helmet>

      {pets.length > 0 ? (
        <>
          <h1>Welcome {pets[0]?.user_name}</h1>
          <h2>Select Your Pet</h2>
          <select
  id="petSelector"
  value={selectedPet?.pet_id || ''}
  onChange={(e) => {
    const pet = pets.find((p) => p.pet_id === parseInt(e.target.value));
    setSelectedPet(pet);
  }}
>
  {pets.map((pet) => (
    <option key={pet.pet_id || pet.id} value={pet.pet_id}>
      {pet.pet_name}
    </option>
  ))}
</select>
          <div className="pet-details-container">
            {/* Render other sections */}
            {renderTable()}
          </div>
        </>
      ) : (
        <p>No pets available at the moment.</p>
      )}
    </div>
  );
};

export default HomePage;
