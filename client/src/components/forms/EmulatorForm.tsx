import React, { useState } from "react";
import { detectOS } from "../../utils/detect-os";
import {
  Select,
  Form,
  FixedFooterLayout,
  ButtonPrimary,
  Box,
} from "@telefonica/mistica";

interface EmulatorFormProps {
  onSubmit: (command: string) => void;
  avdsList: string[];
}

export default function EmulatorForm({
  onSubmit,
  avdsList,
}: EmulatorFormProps) {
  const [avdName, setAvdName] = useState<string>("");
  const [gpuOption, setGpuOption] = useState<string>("");

  const handleSubmit = (): void => {
    let command = "";
    const os = detectOS();
    if (os === "Windows") {
      command = `%USERPROFILE%\\AppData\\Local\\Android\\Sdk\\emulator\\emulator -avd ${avdName} -gpu ${gpuOption}`;
    }
    if (os === "Linux") {
      command = `~/Android/Sdk/emulator/emulator -avd ${avdName} -gpu ${gpuOption}`;
    }

    onSubmit(command);
  };

  // return (
  // <Form
  //   initialValues={{
  //     avdName: "",
  //   }}
  //   onSubmit={() => {}}
  //   autoJump
  // >
  //   <Select name="country" label="country" options={avdsListUsage} />
  // </Form>
  // );
  return (
    <Form
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <FixedFooterLayout
        footer={
          <Box padding={16}>
            <ButtonPrimary submit>Aceitar</ButtonPrimary>
          </Box>
        }
      >
        <Box padding={2}>
          <Select
            id="avdSelect"
            name="avdSelect"
            value={avdName}
            onChangeValue={setAvdName}
            options={avdsList.map((avd) => ({
              value: avd,
              text: avd,
            }))}
            label={"Dispositivos virtuais criados"}
          />
        </Box>
        <Box padding={2} paddingTop={16}>
          <Select
            id="gpuOption"
            name="gpuOption"
            value={gpuOption}
            onChangeValue={setGpuOption}
            options={[
              { value: "off", text: "Desativado" },
              { value: "on", text: "Ativado" },
            ]}
            label={"Ativar GPU"}
          />
        </Box>
      </FixedFooterLayout>
    </Form>
  );
}
