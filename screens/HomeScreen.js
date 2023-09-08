import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadCard from "../components/HeadCard";
import {
  Calendar,
  Agenda,
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
} from "react-native-calendars";
import moment from "moment";

import * as mealAction from "../redux/actions/mealsAction";

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => state.meals);
  const [isLoading, setIsLoading] = useState(false);

  const currentDay = moment();
  const [selectedDay, setSelectedDay] = useState(
    currentDay.format("YYYY-MM-DD")
  );

  // useEffect(() => {
  //   setIsLoading(true);

  //   dispatch(mealAction.loadMeals())
  //     .then((res) => {
  //       console.log("then res", res);
  //       setIsLoading(false);
  //     })
  //     .catch(() => setIsLoading(false));
  //   const date = new Date();
  //   console.log(date.toISOString().split("T")[0]);

  //   console.log(">>>>testing", meals);
  // }, [dispatch]);

  // console.log(">>>>testing2", meals.title);
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  const data = [
    {
      title: "2022-12-01",
      data: [
        {
          date: "2022-12-01T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-02",
      data: [
        {
          date: "2022-12-02T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-03",
      data: [
        {
          date: "2022-12-03T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-04",
      data: [
        {
          date: "2022-12-04T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-05",
      data: [
        {
          date: "2022-12-05T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-06",
      data: [
        {
          date: "2022-12-06T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-07",
      data: [
        {
          date: "2022-12-07T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-08",
      data: [
        {
          date: "2022-12-08T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-09",
      data: [
        {
          date: "2022-12-09T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-10",
      data: [
        {
          date: "2022-12-10T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-11",
      data: [
        {
          date: "2022-12-11T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-12",
      data: [
        {
          date: "2022-12-12T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-13",
      data: [
        {
          date: "2022-12-13T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-14",
      data: [
        {
          date: "2022-12-14T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-15",
      data: [
        {
          date: "2022-12-15T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-16",
      data: [
        {
          date: "2022-12-16T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-17",
      data: [
        {
          date: "2022-12-17T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-18",
      data: [
        {
          date: "2022-12-18T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-19",
      data: [
        {
          date: "2022-12-19T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-20",
      data: [
        {
          date: "2022-12-20T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-21",
      data: [
        {
          date: "2022-12-21T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-22",
      data: [
        {
          date: "2022-12-22T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-23",
      data: [
        {
          date: "2022-12-23T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-24",
      data: [
        {
          date: "2022-12-24T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-25",
      data: [
        {
          date: "2022-12-25T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-26",
      data: [
        {
          date: "2022-12-26T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-27",
      data: [
        {
          date: "2022-12-27T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-28",
      data: [
        {
          date: "2022-12-28T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-29",
      data: [
        {
          date: "2022-12-29T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-30",
      data: [
        {
          date: "2022-12-30T06:00:00.000Z",
        },
      ],
    },
    {
      title: "2022-12-31",
      data: [
        {
          date: "2022-12-31T06:00:00.000Z",
        },
      ],
    },
  ];

  const selectDay = (value) => {
    setSelectedDay(value);
  };

  const renderItem = (item) => {
    //console.log('--render item---', moment().format('MM/DD/YYYY HH:mm:ss A'));
    const index = moment(item.item.date).format("YYYY-MM-DD");
    return (
      <View
        key={index}
        style={{ margin: 30, height: 150, backgroundColor: "red" }}
      >
        <Text style={{ fontSize: 50 }}>{index}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <HeadCard
        navigation={props.navigation}
        title={meals[0].title}
        image={meals[0].image}
        prepTime={meals[0].readyInMinutes}
        healthScore={meals[0].healthScore}
        id={meals[0].id}
      /> */}
      <CalendarProvider
        date={selectedDay}
        onDateChanged={selectDay}
        disabledOpacity={0.6}
      >
        <ExpandableCalendar
          // minDate={moment()
          //   .subtract(6, "M")
          //   .startOf("month")
          //   .format("YYYY-MM-DD")}
          showWeekNumbers
          disableWeekScroll={true}
          markingType={"custom"}
          calendarHeight={300}
          weekHeading={"dateAndTimes.weekBig"}
        />
        <AgendaList sections={data} renderItem={renderItem} />
      </CalendarProvider>
    </SafeAreaView>
    // <View style={styles.container}>
    // 	{/* <Calendar
    // 		onDayPress={(day) => {
    // 			console.log("selected day", day);
    // 		}}
    // 	/> */}
    // 	<Agenda />
    // 	{/* <FlatList
    // 		data={meals}
    // 		keyExtractor={(item) => item.id}
    // 		renderItem={({ item }) => (
    // 			<HeadCard
    // 				navigation={props.navigation}
    // 				title={item.title}
    // 				image={item.image}
    // 				prepTime={item.readyInMinutes}
    // 				healthScore={item.healthScore}
    // 				id={item.id}
    // 			/>
    // 		)}
    // 	/> */}
    // </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// import React from "react";
// import { View, Text, FlatList, Image, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome"; // You can choose any icon library you prefer

// const data = [
//   {
//     day: "Today",
//     meals: [
//       {
//         id: 1,
//         title: "Breakfast",
//         // image: require("./images/breakfast.jpg"),
//         calories: 350,
//         prepTime: "20 mins",
//         servings: 2,
//       },
//       // Add more meal items for Today
//     ],
//   },
//   {
//     day: "Tomorrow",
//     meals: [
//       {
//         id: 2,
//         title: "Lunch",
//         // image: require("./images/lunch.jpg"),
//         calories: 450,
//         prepTime: "30 mins",
//         servings: 3,
//       },
//       // Add more meal items for Tomorrow
//     ],
//   },
//   // Add more days with meals for Days to Come
// ];

// const HomeScreen = () => {
//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Image source={item.image} style={styles.image} />
//       <View style={styles.info}>
//         <Text style={styles.title}>{item.title}</Text>
//         <View style={styles.detailsContainer}>
//           <View style={styles.detailItem}>
//             <Icon name="clock-o" size={18} color="#888" />
//             {/* Icon for Prep Time */}
//             <Text style={styles.detailText}>{item.prepTime}</Text>
//           </View>
//           <View style={styles.detailItem}>
//             <Icon name="users" size={18} color="#888" />
//             {/* Icon for Serving Count */}
//             <Text style={styles.detailText}>{item.servings}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.day}
//         renderItem={({ item }) => (
//           <>
//             <Text style={styles.day}>{item.day}</Text>
//             <FlatList
//               data={item.meals}
//               keyExtractor={(meal) => meal.id.toString()}
//               renderItem={renderItem}
//               horizontal
//             />
//           </>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#F5F5F5",
//   },
//   day: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   card: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     borderRadius: 8,
//     padding: 16,
//     margin: 8,
//     alignItems: "center",
//     elevation: 4,
//     shadowColor: "black",
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 16,
//   },
//   info: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   details: {
//     fontSize: 12,
//     color: "#888",
//   },
//   detailsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 8,
//   },
//   detailItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   detailText: {
//     fontSize: 12,
//     color: "#888",
//     marginLeft: 4,
//   },
// });

// export default HomeScreen;
