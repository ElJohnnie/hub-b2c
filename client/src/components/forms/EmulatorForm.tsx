import React, { useEffect, useState } from "react";
import { commandController } from "../../controllers/commandController";

interface EmulatorFormProps {
  onSubmit: (command: string) => void;
}

export default function EmulatorForm({ onSubmit }: EmulatorFormProps) {
  const [avdName, setAvdName] = useState<string>("");
  const [gpuOption, setGpuOption] = useState<string>("off");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const command = `~/Android/Sdk/emulator/emulator -avd ${avdName} -gpu ${gpuOption}`;

    onSubmit(command);
  };

  useEffect(() => {
    (async () => {
      const controller = await commandController.executeEmulatorList();
      console.log(controller);
    })();
  });

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-purple-900 mb-4">
        Iniciar Emulador Android
      </h2>
      <label
        className="block text-purple-800 text-sm font-medium mb-2"
        htmlFor="avdName"
      >
        Nome do AVD (Emulador):
      </label>
      <input
        type="text"
        id="avdName"
        name="avdName"
        value={avdName}
        onChange={(e) => setAvdName(e.target.value)}
        required
        placeholder="Digite o nome do AVD"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
      />

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
