import { store } from "../App/store";
import {v4} from 'uuid';

const names = store.getState();

const getRandomName = (personType) => {
  switch (personType) {
    case "client":
      const client = names.dentalSchedule.clients[Math.floor(Math.random() * 50)];
      return `${client.first_name} ${client.last_name}`;
    case "dentist":
      const dentist = names.dentalSchedule.dentists[Math.floor(Math.random() * 4)];
      return `${dentist.first_name} ${dentist.last_name}`;
    case "assistant":
      const assistant = names.dentalSchedule.clients[Math.floor(Math.random() * 2)];
      return `${assistant.first_name} ${assistant.last_name}`;
    default:
      return "";
  }
};

const getRandomTime = () => {
  let hour;
  while (true) {
    hour = Math.floor(Math.random() * 24);
    if (hour > 7 && hour < 19) {
      return hour;
    }
  }
};

const getRandomDay = () => Math.floor(Math.random() * 28) + 1;

const generateRandomAppointment = () => ({
  day: getRandomDay(),
  time: getRandomTime(),
  patient: getRandomName("client"),
  dentist: getRandomName("dentist"),
  assistant: getRandomName("assistant"),
  id: v4()
});

const generateRandomAppointments = (num) => {
  let tempArray = new Array(num).fill(0);

  let veriArray = [];  
  
  let newTempArray = tempArray.map((e) => {
      let appointment = generateRandomAppointment();
      let filteredArray = veriArray.filter((e) => e.day === appointment.day && e.time === appointment.time);
      veriArray.push(appointment)
      let conflictsInApointments = filteredArray.some((e) => e.dentist === appointment.dentist || e.assistant === appointment.assistant || e.client === appointment.client);
      if (conflictsInApointments) {
        return generateRandomAppointment();
      } else return appointment
    });
  return newTempArray;
  }

export default generateRandomAppointments;
