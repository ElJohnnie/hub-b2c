import { ListboxOptions } from "@headlessui/react";
import React, { useState } from "react";
import { detectOS } from "../../utils/detect-os";

interface EmulatorFormProps {
  onSubmit: (command: string) => void;
  avdsList: string[];
}

export default function EmulatorForm({
  onSubmit,
  avdsList,
}: EmulatorFormProps) {
  const [avdName, setAvdName] = useState<string>("");
  const [gpuOption, setGpuOption] = useState<string>("off");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
    <form
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-purple-900 mb-4">
        Iniciar Emulador Android
      </h2>
      <select
        id="avdSelect"
        name="avdSelect"
        value={avdName}
        onChange={(e) => setAvdName(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
      >
        <option value="" disabled>
          Selecione um AVD
        </option>
        {avdsList.map((avd, index) => (
          <option key={index} value={avd}>
            {avd}
          </option>
        ))}
      </select>
      <label
        className="block text-purple-800 text-sm font-medium mb-2"
        htmlFor="gpuOption"
      >
        Ativar GPU:
      </label>
      <select
        id="gpuOption"
        name="gpuOption"
        value={gpuOption}
        onChange={(e) => setGpuOption(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
      >
        <option value="off">Desativado</option>
        <option value="on">Ativado</option>
      </select>

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
      >
        Iniciar Emulador
      </button>
    </form>
  );
}
