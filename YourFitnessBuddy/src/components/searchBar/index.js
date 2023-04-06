import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';

import {
  SearchContainer,
  SearchInput,
  SearchButton,
  Text,
  RadioContainer,
  RadioLabel,
  RadioText,
  InputGroup,
} from './styles';

import { fetchExercises, fetchExercisesByMuscleAndDifficulty } from '../../api/routes';

import { searchBar } from '../../actions/search';
import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('beginner');
  const diff = ['beginner', 'intermediate', 'expert'];

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleInputChange = (text) => {
    setQuery(text);
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
  };

  const handleSearch = async () => {
    let data;
    if (query) {
      data = await fetchExercisesByMuscleAndDifficulty(query, difficulty);
    } else {
      data = await fetchExercises();
    }

    dispatch(searchBar(data));
    onSearch(data);
  };

  return (
    <SearchContainer>
      <Text>
        {t('title.chooseMuscle')}
      </Text>
      <InputGroup>
        <SearchInput
          placeholder="'biceps'"
          value={query}
          onChangeText={handleInputChange}
        />
        <RadioContainer>
          <RadioButton.Group
            onValueChange={handleDifficultyChange}
            value={difficulty}
          >
            {diff.map((option) => (
              <RadioLabel key={option}>
                <RadioButton
                  value={option}
                  status={difficulty === option ? 'checked' : 'unchecked'}
                />
                <RadioText>{option}</RadioText>
              </RadioLabel>
            ))}
          </RadioButton.Group>
        </RadioContainer>
      </InputGroup>
      <SearchButton title={t('message.yeahBuddy')} onPress={handleSearch} />
    </SearchContainer>
  );
};

export default SearchBar;