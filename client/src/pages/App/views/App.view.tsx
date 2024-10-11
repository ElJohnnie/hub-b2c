import React from "react";
import {
  ResponsiveLayout,
  Grid,
  GridItem,
  Text4,
  skinVars,
  BoxedRowList,
  BoxedRow,
  Callout,
} from "@telefonica/mistica";
import EmulatorForm from "../../../components/forms/EmulatorForm";
import NavBar from "../../../components/nav-bar/NavBar";
import { IApp } from "../interfaces/App.interface";

export const AppView = ({
  handleExecuteCommand,
  handleExecuteEmulator,
  handleExecuteShellCommand,
  avdList,
  output,
}: IApp) => {
  return (
    <ResponsiveLayout>
      <NavBar />
      <div className="mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Grid columns={3} rows={1} gap={12}>
          <GridItem>
            <Text4 weight="regular" color={skinVars.colors.backgroundBrand}>
              Janelas
            </Text4>
            <BoxedRowList>
              <BoxedRow
                title=""
                description={"Dashboard Kubernetes"}
                onPress={() =>
                  handleExecuteCommand(
                    "webdriver/kubernetes-b2c",
                    "pip install -r requirements.txt && python3 kubernetes.py",
                    "/bin/bash"
                  )
                }
              />
            </BoxedRowList>
          </GridItem>
          <GridItem>
            <Text4 weight="regular" color={skinVars.colors.backgroundBrand}>
              Terminais
            </Text4>
            <BoxedRowList>
              <BoxedRow
                title=""
                description={"Tagueamentos"}
                onPress={() =>
                  handleExecuteShellCommand("scripts", "tracking.sh")
                }
              />
            </BoxedRowList>
          </GridItem>
          <GridItem>
            <Text4 weight="regular" color={skinVars.colors.backgroundBrand}>
              Emulador
            </Text4>
            <BoxedRowList>
              <EmulatorForm
                onSubmit={handleExecuteEmulator}
                avdsList={avdList}
              />
            </BoxedRowList>
          </GridItem>
        </Grid>
        <div className="mb-8" />
        <Callout description={output}></Callout>
      </div>
    </ResponsiveLayout>
  );
};
