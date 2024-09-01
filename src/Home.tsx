import { Table, Anchor, TextInput, Image, Text } from "@mantine/core";
import MiniSearch from "minisearch";
import { useState } from "react";
import suire from "../public/suire.png";
import data from "./data.json";
import { Link } from "react-router-dom";
import { tables } from "./table";

const consolidateData = data.map((el) => ({
  ...el,
  tableName: tables.find((t) => t.tableId === el.tableid)!.tableName,
}));

const miniSearch = new MiniSearch({
  fields: ["firstname", "lastname", "tableName"], // fields to index for full-text search
  storeFields: ["firstname", "lastname", "tableName"], // fields to return with search results
});

miniSearch.addAll(consolidateData);

export function HomeScreen() {
  const [textInputValue, setTextInputValue] = useState("");

  let searchResults = miniSearch.search(textInputValue, { prefix: true });
  const source = textInputValue.length === 0 ? consolidateData : searchResults;
  const rows = source.map((row) => {
    return (
      <Table.Tr key={row.firstname + row.lastname}>
        <Table.Td c={"#25737D"}>
          <Text lineClamp={1} fs={"italic"}>
            {row.firstname} <b>{row.lastname}</b>
          </Text>
        </Table.Td>
        <Table.Td style={{ width: "50%" }}>
          <Anchor
            component={Link}
            to={"/table/" + row.tableName}
            fz="sm"
            c={"#FF5757"}
          >
            <Text fw={700} lineClamp={1}>
              {row.tableName}
            </Text>
          </Anchor>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Image src={suire} h={200} fit="cover" />
      <TextInput
        value={textInputValue}
        onChange={(e) => {
          setTextInputValue(e.currentTarget.value);
        }}
        ml={"sm"}
        mr={"sm"}
        mb={"sm"}
        mt={"xl"}
        radius={8}
        placeholder="Tapez votre nom"
      />
      <Table verticalSpacing={"sm"}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nom</Table.Th>
            <Table.Th>Nom de table</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
