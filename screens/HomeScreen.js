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
  // const dispatch = useDispatch();
  // const { meals } = useSelector((state) => state.meals);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   dispatch(mealAction.loadMeals())
  //     .then(() => setIsLoading(false))
  //     .catch(() => setIsLoading(false));
  //   const date = new Date();
  //   console.log(date.toISOString().split("T")[0]);

  //   console.log(">>>>testing", meals);
  // }, [dispatch]);

  // console.log(">>>>testing2", meals.title);
  // if (isLoading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size={"large"} />
  //     </View>
  //   );
  // }

  const currentDay = moment();

  const [selectedDay, setSelectedDay] = React.useState(
    currentDay.format("YYYY-MM-DD")
  );

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
      <CalendarProvider
        date={selectedDay}
        onDateChanged={selectDay}
        disabledOpacity={0.6}
      >
        <ExpandableCalendar
          minDate={moment()
            .subtract(6, "M")
            .startOf("month")
            .format("YYYY-MM-DD")}
          maxDate={moment().format("YYYY-MM-DD")}
          showWeekNumbers
          disableWeekScroll={true}
          firstDay={6}
          pastScrollRange={6}
          futureScrollRange={0}
          markingType={"custom"}
          calendarHeight={374}
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
