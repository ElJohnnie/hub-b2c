import React, { useState } from "react";
import {
  ResponsiveLayout,
  Callout,
  MasterDetailLayout,
  Box,
  Stack,
  NegativeBox,
  Row,
  RowList,
  Title1,
  ButtonPrimary,
  Title3,
  FixedFooterLayout,
  ButtonLink,
} from "@telefonica/mistica";
import EmulatorForm from "../../../components/forms/EmulatorForm";
import { IApp } from "../interfaces/App.interface";

export const AppView = ({
  handleExecuteCommand,
  handleExecuteShellCommand,
  avdList,
  output,
  category,
  setCategory,
  avdName,
  setAvdName,
  gpuOption,
  setGpuOption,
  handleSubmit,
  isDesktopOrBigger,
}: IApp) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <FixedFooterLayout
      footer={
        isOpen &&
        !isDesktopOrBigger && (
          <ButtonLink onPress={() => setIsOpen(false)}>Voltar</ButtonLink>
        )
      }
    >
      <ResponsiveLayout fullWidth={true}>
        <Box padding={isDesktopOrBigger ? 80 : 4}>
          <MasterDetailLayout
            isOpen={isOpen}
            master={
              <div>
                <Box
                  paddingTop={isDesktopOrBigger ? 40 : 24}
                  paddingBottom={isDesktopOrBigger ? 80 : 24}
                >
                  <Stack space={isDesktopOrBigger ? 48 : 32}>
                    {[
                      {
                        categoryName: "Hub Automação B2C",
                        settings: [
                          {
                            title: "Tagueamentos",
                          },
                          { title: "Dashboard Kubernetes" },
                          {
                            title: "Emuladores",
                          },
                        ],
                      },
                    ].map((category) => (
                      <Stack key={category.categoryName} space={8}>
                        <Title1>{category.categoryName}</Title1>
                        <NegativeBox left right={!isDesktopOrBigger}>
                          <RowList>
                            {category.settings.map((setting) => (
                              <Row
                                key={setting.title}
                                title={setting.title}
                                onPress={() => {
                                  setCategory(setting.title);
                                  setIsOpen(true);
                                }}
                              />
                            ))}
                          </RowList>
                        </NegativeBox>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </div>
            }
            detail={
              <Box
                paddingTop={isDesktopOrBigger ? 40 : 4}
                paddingBottom={isDesktopOrBigger ? 80 : 4}
              >
                <Stack space={isDesktopOrBigger ? 48 : 4}>
                  <Stack space={isDesktopOrBigger ? 24 : 4}>
                    {(!category.length || category === "Tagueamentos") && (
                      <NegativeBox>
                        <Box
                          paddingX={12}
                          paddingTop={isDesktopOrBigger ? 0 : 40}
                        >
                          <Box paddingBottom={40}>
                            <Title3 as={"h1"}>
                              {category.toUpperCase() || "TAGUEAMENTOS"}
                            </Title3>
                          </Box>
                          <Box paddingBottom={40}>
                            <Title1>
                              {
                                "Clique aqui para acessar o terminal e validar os logs de tagueamento"
                              }
                            </Title1>
                          </Box>
                          <Box paddingBottom={40}>
                            <ButtonPrimary
                              onPress={() =>
                                handleExecuteShellCommand(
                                  "scripts",
                                  "tracking.sh"
                                )
                              }
                            >
                              Tagueamento
                            </ButtonPrimary>
                          </Box>
                        </Box>
                      </NegativeBox>
                    )}
                    {category === "Dashboard Kubernetes" && (
                      <NegativeBox>
                        <Box
                          paddingX={12}
                          paddingTop={isDesktopOrBigger ? 0 : 40}
                        >
                          <Box paddingBottom={40}>
                            <Title3 as={"h1"}>
                              {category.toUpperCase() || "DASHBOARD KUBERNETES"}
                            </Title3>
                          </Box>
                          <Box paddingBottom={40}>
                            <Title1>
                              {
                                "Clique aqui para acessar o Dashboard Kubernetes"
                              }
                            </Title1>
                          </Box>
                          <Box paddingBottom={40}>
                            <ButtonPrimary
                              onPress={() =>
                                handleExecuteCommand(
                                  "webdriver/kubernetes-b2c",
                                  "pip install -r requirements.txt && python3 kubernetes.py",
                                  "/bin/bash"
                                )
                              }
                            >
                              Acessar Dashboard K8s
                            </ButtonPrimary>
                          </Box>
                        </Box>
                      </NegativeBox>
                    )}
                    {category === "Emuladores" && (
                      <NegativeBox>
                        <Box
                          paddingX={12}
                          paddingTop={isDesktopOrBigger ? 0 : 40}
                        >
                          <Box paddingBottom={40}>
                            <Title3 as={"h1"}>
                              {category.toUpperCase() || "EMULADORES"}
                            </Title3>
                          </Box>
                          <Box paddingBottom={40}>
                            <Title1>
                              {"Clique aqui para acessar os seus emuladores"}
                            </Title1>
                          </Box>
                          <Box paddingBottom={40}>
                            <EmulatorForm
                              avdsList={avdList}
                              avdName={avdName}
                              setAvdName={setAvdName}
                              gpuOption={gpuOption}
                              setGpuOption={setGpuOption}
                              handleSubmit={handleSubmit}
                            />
                          </Box>
                        </Box>
                      </NegativeBox>
                    )}
                  </Stack>
                </Stack>
                {output && (
                  <Box>
                    <Callout description={output}></Callout>
                  </Box>
                )}
              </Box>
            }
          />
        </Box>
      </ResponsiveLayout>
    </FixedFooterLayout>
  );
};
