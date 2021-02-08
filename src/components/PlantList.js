import PlantCard from "./PlantCard";

function PlantList({ plants, onUpdatePlant, onDeletePlant }) {
  const somePlants = plants.map((plant) => {
    return (
      <PlantCard
        key={plant.id}
        plant={plant}
        onUpdatePlant={onUpdatePlant}
        onDeletePlant={onDeletePlant}
      />
    )
  })

  return (
    <ul className="cards">
      {somePlants}
    </ul>
  );
}

export default PlantList;
