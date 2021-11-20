import React from "react";
import { Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CustomMapView from "./CustomMapView";
import Ranking from "./Ranking";
import AddSubmission from "./AddSubmission";
import AddGiveawayForm from "./AddGiveawayForm";
import UserProfile from "./UserProfile";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AddSubmissionNavigation = ({ navigation, db }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddForm"
        options={{
          title: "Submit a giveaway",
          headerLeft: () => (
            <Button
              title="Back"
              onPress={() => navigation.navigate("MapView")}
            ></Button>
          ),
        }}
      >
        {(props) => <AddGiveawayForm {...props} db={db} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AddSubmissionSuccessNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddSubmission"
        component={AddSubmission}
        options={{
          title: "Submission Rewards",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function DrawerNavigation({ db }) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="MapView"
        options={{
          title: "Home",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      >
        {(props) => <CustomMapView {...props} db={db} />}
      </Drawer.Screen>
      <Drawer.Screen name="Leaderboard" component={Ranking} />
      <Drawer.Screen name="User Profile" component={UserProfile} />
      <Drawer.Screen
        name="AddGiveaway"
        options={{
          drawerItemStyle: { height: 0 },
          headerShown: false,
          swipeEnabled: false,
        }}
      >
        {(props) => <AddSubmissionNavigation {...props} db={db} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Submission"
        component={AddSubmissionSuccessNavigation}
        options={{
          drawerItemStyle: { height: 0 },
          headerShown: false,
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
}
