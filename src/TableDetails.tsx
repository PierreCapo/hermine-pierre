import { Grid, Image, Text, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import planDeTable from "../public/plan_de_table.png";
import { colors } from "./colors";
import data from "./data.json";
import { useImageViewer } from "react-image-viewer-hook";

export const TableDetails = () => {
  const params = useParams();
  // @ts-ignore
  const tableId: string = params.tableId;

  const { getOnClick, ImageViewer } = useImageViewer();

  return (
    <>
      <a href="image1.jpg" onClick={getOnClick(planDeTable)}>
        <Image src={planDeTable} h={200} fit="contain" />
      </a>
      <Title
        c={colors.secondary}
        ta="center"
        mb={"lg"}
        mt={"lg"}
        fw={700}
        order={2}
      >
        {tableId}
      </Title>
      <Grid>
        {data
          .filter((el) => el.table === tableId)
          .slice(0, 8)
          .map((el) => (
            <Grid.Col span={6}>
              <Text ta={"center"} c={colors.primary} fs={"italic"}>
                {el.firstname} <b>{el.lastname}</b>
              </Text>
            </Grid.Col>
          ))}
      </Grid>
      <ImageViewer />
    </>
  );
};
