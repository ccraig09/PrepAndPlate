import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MealTypeSelector from "./MealTypeSelector";

const MealScheduleModal = ({ visible, onClose, onSchedule }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleClose = () => {
    // setShowDatePicker(false);
    setSelectedDate(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={handleClose}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Schedule Your Meal</Text>
          <Button
            title={selectedDate ? "Edit Date" : "Pick a Date"}
            onPress={() => setShowDatePicker(true)}
          />
          {selectedDate && (
            <Text
              style={{
                alignSelf: "center",
                marginVertical: 10,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Date: {selectedDate.toLocaleDateString()}
            </Text>
          )}
          {showDatePicker && (
            <View style={styles.dateContainer}>
              <DateTimePicker
                value={selectedDate ? selectedDate : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            </View>
          )}
          <MealTypeSelector onTypeSelect={setTimeOfDay} />
          <Button
            title="Schedule"
            onPress={() => onSchedule(selectedDate, timeOfDay)}
          />
          <Button title="Close" onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
};

export default MealScheduleModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    height: 300,
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
