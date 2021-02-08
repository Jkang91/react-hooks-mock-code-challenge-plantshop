import { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] = useState("")


  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(resp => resp.json())
      .then((plants) => {
        setPlants(plants)
      })
  }, [])

  function onAddPlant(brandNewPlant) {
    const updatedPlantList = [...plants, brandNewPlant]
    setPlants(updatedPlantList)
  }

  function handlePlantUpdate(updatedPlant) {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant
      } else {
        return plant
      }
    })
    setPlants(updatedPlants)
  }

  function handleDeletePlant(id) {
    const updatedPlants = plants.filter((plant) => plant.id !== id)
    setPlants(updatedPlants)
  }

  const displayedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <main>
      <NewPlantForm
        onAddPlant={onAddPlant}
      />
      <Search
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <PlantList
        plants={displayedPlants}
        onUpdatePlant={handlePlantUpdate}
        onDeletePlant={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
