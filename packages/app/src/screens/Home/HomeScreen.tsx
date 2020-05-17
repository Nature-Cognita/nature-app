import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import * as SQLite from "expo-sqlite";

// TODO: Share common types between apps
type SensorRecord = {
  id: string;
  value: Number;
};

export const HomeScreen: React.FC = () => {
  const uploadData = () => {
    console.log("Uploding data!");

    const db = SQLite.openDatabase("plantsData");

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * from data;",
        [],
        (_tx, result) => {
          for (let i = 0; i < result.rows.length; i++) {
            const item = result.rows.item(i);

            const date = item["date"];
            const sensorValues: Array<SensorRecord> = JSON.parse(
              item["sensor_values"]
            );

            sensorValues.forEach((record) => {
              // TODO: Run GQL insert
            });

            console.log(sensorValues);
          }
        },
        (_tx, error) => {
          console.log(error);
          return true;
        }
      );
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button icon="upload" mode="contained" onPress={uploadData}>
        Upload Collected Data
      </Button>
    </View>
  );
};
