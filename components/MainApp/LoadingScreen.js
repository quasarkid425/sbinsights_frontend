import React from "react";
import { Grid, Text, Stack } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <Grid placeItems={"center"} height={"70vh"}>
      <Stack align={"center"}>
        <Text>Getting things ready</Text>
        <BeatLoader color="#1B455B" />
      </Stack>
    </Grid>
  );
};

export default LoadingScreen;
