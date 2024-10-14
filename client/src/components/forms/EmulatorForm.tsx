import React from "react";
import {
  Select,
  Form,
  ButtonPrimary,
  Box,
  NegativeBox,
} from "@telefonica/mistica";

interface EmulatorFormProps {
  avdsList: string[];
  avdName: string;
  setAvdName: (avdName: string) => void;
  gpuOption: string;
  setGpuOption: (gpuOption: string) => void;
  handleSubmit: () => void;
}

export default function EmulatorForm({
  avdsList,
  avdName,
  setAvdName,
  gpuOption,
  setGpuOption,
  handleSubmit,
}: EmulatorFormProps) {
  return (
    <Box paddingLeft={2}>
      <Form
        className="bg-white p-6 rounded-lg shadow-lg max-w-md"
        onSubmit={handleSubmit}
      >
        <NegativeBox>
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
          <Box padding={16}>
            <ButtonPrimary submit>Abrir emulador</ButtonPrimary>
          </Box>
        </NegativeBox>
      </Form>
    </Box>
  );
}
