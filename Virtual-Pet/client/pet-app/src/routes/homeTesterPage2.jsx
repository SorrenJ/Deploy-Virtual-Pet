import React, { useState, useEffect } from 'react';
import UserToysTable from '../components/UserToysTable';
import UserToiletriesTable from '../components/UserToiletriesTable';
import UserFoodTable from '../components/UserFoodTable';

const HomePageTester2 = () => {
    const [playGame, setPlayGame] = useState(false); // State to control game visibility
    const [pets, setPets] = useState([]); // To store all pets and their stats
    const [selectedPet, setSelectedPet] = useState(null);
    const [petStats, setPetStats] = useState(null); // Store stats separately
    const [userFood, setUserFood] = useState([]); // To store user food data
    const [foodCount, setFoodCount] = useState(0); // To store food count
    const [userToiletries, setUserToiletries] = useState([]);
    const [toiletriesCount, setToiletriesCount] = useState(0);
    const [userToys, setUserToys] = useState([]);
    const [toysCount, setToysCount] = useState(0);
    const [visibleComponent, setVisibleComponent] = useState(null); // To handle component visibility

    // Fetch general pet and user data on mount
    useEffect(() => {
        fetchGeneralData(); // Fetch data on component mount

        // Set up a periodic update for pet stats (every 60 seconds)
        const intervalId = setInterval(() => {
            if (selectedPet) {
                fetchPetStats(selectedPet.pet_id); // Fetch stats for the currently selected pet
            }
        }, 60000); // 60 seconds

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [selectedPet]); // Run when selectedPet changes

    // Fetch general data (pets and user resources)
    const fetchGeneralData = async () => {
        try {
            const response = await fetch(`https://virtual-pet-backend-3nat.onrender.com/api/home`);
            const data = await response.json();
            console.log('General data received:', data);
            setPets(data.pets || []);
            setFoodCount(data.foodCount || 0);
            setUserFood(data.userFood || []);
            setToiletriesCount(data.toiletriesCount || 0);
            setUserToiletries(data.userToiletries || []);
            setToysCount(data.toysCount || 0);
            setUserToys(data.userToys || []);

            if (!selectedPet && data.pets.length > 0) {
                setSelectedPet(data.pets[0]); // Select the first pet if none is selected
            }
        } catch (error) {
            console.error('Error fetching general data:', error);
        }
    };

    // Fetch stats for the currently selected pet
    const fetchPetStats = async (petId) => {
        try {
            console.log(`Fetching stats for petId: ${petId}`);

             // Ensure petId is valid and defined
        if (!petId) {
            throw new Error('Invalid petId');
          }
            const response = await fetch(`/api/pets-stats/${petId}`);
            const stats = await response.json();
            console.log(`Stats for pet ${petId}:`, stats);
            setPetStats(stats); // Update pet stats separately
        } catch (error) {
            console.error(`Error fetching stats for pet ${petId}:`, error);
        }
    };

    // UseEffect to fetch stats when selected pet changes
    useEffect(() => {
        if (selectedPet) {
            fetchPetStats(selectedPet.pet_id); // Fetch stats for the selected pet
        }
    }, [selectedPet]); // Trigger when the selected pet changes

    // Function to handle feeding the pet
    const feedPet = async (petId, foodId) => {
        try {
            console.log('Feeding pet:', petId, 'with food:', foodId);
            if (!petId || !foodId) {
                throw new Error('Missing petId or foodId');
            }

            const response = await fetch('/api/feed-pet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ petId, foodId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert(`Error: ${errorData.error}`);
                return;
            }

            const data = await response.json();
            if (data.success) {
                alert('Pet fed successfully!');
                fetchPetStats(petId); // Fetch updated stats after feeding
            }
        } catch (error) {
            console.error('Error feeding pet:', error);
        }

    };
    
        // Function to handle cleaning the pet
        const cleanPet = async (petId, toiletriesId) => {
            try {
                console.log('Cleaning pet:', petId, 'with toiletry:', toiletriesId);
                if (!petId || !toiletriesId) {
                    throw new Error('Missing petId or toiletriesId');
                }
    
                const response = await fetch('/api/clean-pet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ petId, toiletriesId }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    alert(`Error: ${errorData.error}`);
                    return;
                }
    
                const data = await response.json();
                if (data.success) {
                    alert('Pet cleaned successfully!');
                    
                }
            } catch (error) {
                console.error('Error cleaning pet:', error);
            }
        };
    
        // Function to handle playing with the pet
        const playWithPet = async (petId, toyId) => {
            try {
                console.log('Playing with pet:', petId, 'with toy:', toyId);
                if (!petId || !toyId) {
                    throw new Error('Missing petId or toyId');
                }
    
                const response = await fetch('/api/play-with-pet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ petId, toyId }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    alert(`Error: ${errorData.error}`);
                    return;
                }
    
                const data = await response.json();
                if (data.success) {
                    alert('Pet played successfully!');
                  
                }
            } catch (error) {
                console.error('Error playing with pet:', error);
            }
        
    
    
    
         };

    return (
        <div>
            {/* Display the pet details */}
            {pets.length > 0 ? (
                <>
                    <h1>Welcome {pets[0]?.user_name}</h1>

                    <h2>Select Your Pet</h2>
                    <select
                        id="petSelector"
                        value={selectedPet?.pet_id || ''}
                        onChange={(e) => {
                            const pet = pets.find(p => p.pet_id === parseInt(e.target.value));
                            setSelectedPet(pet);
                        }}
                    >
                        {pets.map((pet) => (
                            <option key={pet.pet_id} value={pet.pet_id}>
                                {pet.pet_name}
                            </option>
                        ))}
                    </select>

                    {selectedPet && petStats && (
                        <div id="petDetails">
                            <h2>Meet {selectedPet.pet_name}</h2>
                            <img src={selectedPet.pet_image} alt={selectedPet.pet_name} />
                            <br />
                            <p>Energy: {petStats.energy}</p>
                            <p>Happiness: {petStats.happiness}</p>
                            <p>Hunger: {petStats.hunger}</p>
                            <p>Cleanliness: {petStats.cleanliness}</p>
                            <br />
                            <p>Species: {selectedPet.species_name}</p>
                            <p>Diet: {selectedPet.diet_desc}</p>
                            <p>Personality: {selectedPet.personality_name}</p>
                        </div>
                    )}
                </>
            ) : (
                <p>No pets available at the moment.</p>
            )}

            {/* Button to toggle Component One */}
            <div>
                <h2>Inventory</h2>
                <button onClick={() => setVisibleComponent(1)} disabled={visibleComponent === 1}>
                    Pet Treats
                </button>
                <button onClick={() => setVisibleComponent(2)} disabled={visibleComponent === 2}>
                    Pet Toiletries
                </button>
                <button onClick={() => setVisibleComponent(3)} disabled={visibleComponent === 3}>
                    Pet Toys
                </button>
            </div>

            {/* Render UserFoodTable if visibleComponent is 1 */}
            <div style={{ marginTop: '20px' }}>
                {visibleComponent === 1 && (
                    <UserFoodTable userFood={userFood} feedPet={feedPet} selectedPet={selectedPet} />
                )}

                {visibleComponent === 2 && (
                    <UserToiletriesTable userToiletries={userToiletries} cleanPet={cleanPet} selectedPet={selectedPet} />
                )}

                {visibleComponent === 3 && (
                    <UserToysTable userToys={userToys} playWithPet={playWithPet} selectedPet={selectedPet} />
                )}
            </div>
        </div>
    );
};

export default HomePageTester2;
