import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../actions/favorites";
import { addExerciseToDay, removeExerciseFromDay } from "../../actions/calendar";

import { CardContainer } from './styles';
import CardHeader from '../cardHeader';
import CardBody from '../cardBody';
import FavoriteButton from '../favoriteButton';
import DaysSelector from '../daySelector';

const Card = ({ name, type, muscle, equipment, difficulty, instructions, isFavorite, onFavoriteChange }) => {
  const [favorite, setIsFavorite] = useState(isFavorite);
  const dispatch = useDispatch();
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    setIsFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavoriteChange = (newFavorite) => {
    setIsFavorite(newFavorite);
    onFavoriteChange && onFavoriteChange(newFavorite);

    if (!favorite) {
      dispatch(addToFavorites({
        name,
        type,
        muscle,
        equipment,
        difficulty,
        instructions,
      }));
    } else {
      dispatch(removeFromFavorites(name));
    }
  };

  const handleAddToDays = (selectedItems) => {
    const newDays = selectedItems.filter((day) => !selectedDays.includes(day));
    const removedDays = selectedDays.filter((day) => !selectedItems.includes(day));
  
    newDays.forEach(day => {
      dispatch(addExerciseToDay(day, { name, type, muscle, equipment, difficulty, instructions }));
    });
  
    removedDays.forEach(day => {
      dispatch(removeExerciseFromDay(day, name));
    });
  
    setSelectedDays(selectedItems);
  };

  return (
    <CardContainer>
      <CardHeader name={name} type={type} />
      <CardBody muscle={muscle} equipment={equipment} difficulty={difficulty} instructions={instructions} />
      <FavoriteButton isFavorite={favorite} onFavoriteChange={handleFavoriteChange} />
      <DaysSelector selectedDays={selectedDays} onSelectedItemsChange={handleAddToDays} />
    </CardContainer>
  );
};

export default Card;
