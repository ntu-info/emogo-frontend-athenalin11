import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      {/* Root stack controls screen transitions for the whole app */}
      <Stack>
        {/* The (tabs) group is one Stack screen with its own tab navigator */}
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        {/* Record screen for creating new entries */}
        <Stack.Screen
          name="record"
          options={{ 
            title: "新記錄",
            headerBackTitle: "返回",
          }}
        />
        {/* History screen for viewing past records */}
        <Stack.Screen
          name="history"
          options={{ 
            title: "歷史記錄",
            headerBackTitle: "返回",
          }}
        />
        {/* This screen is pushed on top of tabs when you navigate to /details */}
        <Stack.Screen
          name="details"
          options={{ title: "Details" }}
        />
      </Stack>
    </>
  );
}
