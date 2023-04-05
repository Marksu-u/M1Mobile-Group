import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import CalendarBox from '../calendar';
import { useDispatch, useSelector } from 'react-redux';
import { updateCalendar } from '../../actions/calendar';

const ModalCalendar = ({ exercise, visible, onClose }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const dispatch = useDispatch();
  const calendarData = useSelector((state) => state.calendar.calendar);

  useEffect(() => {}, [calendarData]);

  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  const handleAddToCalendar = () => {
    selectedDays.forEach((day) => {
      dispatch(updateCalendar(day, exercise, 'add'));
    });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{flex: 1, alignItems: 'center',}}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <CalendarBox onDayPress={handleDayToggle} />
          <TouchableOpacity onPress={handleAddToCalendar}>
            <Text>Add to Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCalendar;
