import { Anchor, Flex, Text, Title, Image, Divider } from "@mantine/core";
import { useParams } from "react-router-dom";
import planDeTable from "../public/plan_de_table.png";
import { colors } from "./colors";
import data from "./data.json";
import { useImageViewer } from "react-image-viewer-hook";
import { tables } from "./table";

export const TableDetails = () => {
  const params = useParams();
  // @ts-expect-error params
  const tableName: string = params.tableId;
  const tableData = tables.find((el) => el.tableName === tableName)!;

  const { getOnClick, ImageViewer } = useImageViewer();

  return (
    <>
      <Flex gap={"lg"} pl={"lg"} pr={"lg"} pt={"lg"} align={"center"}>
        <Anchor onClick={getOnClick(tableData.image)}>
          <Image src={tableData.image} h={100} w={100} radius={"md"} />
        </Anchor>
        <Flex direction={"column"}>
          <Title c={colors.secondary} fw={700} order={2}>
            {tableName}
          </Title>
          <Text c={colors.primary} size="md">
            {tableData.description}
          </Text>
        </Flex>
      </Flex>
      <Divider m="lg" />
      <Flex gap={"xs"} direction={"column"}>
        {data
          .filter((el) => el.tableid === tableData.tableId)
          .map((el) => (
            <Text ta={"center"} c={colors.primary} fs={"italic"}>
              {el.firstname}{" "}
              <b>
                {el.prefix == null ?? ""}
                {el.lastname}
              </b>
            </Text>
          ))}
      </Flex>

      <Divider m="lg" />
      <Anchor onClick={getOnClick(planDeTable)} c={colors.secondary}>
        <Flex justify={"center"} align={"center"} gap={2}>
          <Text c={colors.secondary}>Plan de la salle</Text>
          <LinkIcon />
        </Flex>
      </Anchor>
      <ImageViewer />
    </>
  );
};

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    // @ts-ignore
    class="icon icon-tabler icons-tabler-outline icon-tabler-link"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 15l6 -6" />
    <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
    <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
  </svg>
);
