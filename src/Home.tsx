import { Table, Anchor, TextInput, Image } from "@mantine/core";
import MiniSearch from "minisearch";
import { useState } from "react";
import suire from "../public/suire.png";
import data from "./data.json";
import { Link } from "react-router-dom";

let miniSearch = new MiniSearch({
  fields: ["firstname", "lastname", "table"], // fields to index for full-text search
  storeFields: ["firstname", "lastname", "table"], // fields to return with search results
});

miniSearch.addAll(data);

export function HomeScreen() {
  const [textInputValue, setTextInputValue] = useState("");
  let searchResults = miniSearch.search(textInputValue, { prefix: true });
  const source = textInputValue.length === 0 ? data : searchResults;
  const rows = source.map((row) => {
    return (
      <Table.Tr key={row.firstname + row.lastname}>
        <Table.Td c={"#25737D"}>
          <i>
            {row.firstname} <b>{row.lastname}</b>
          </i>
        </Table.Td>
        <Table.Td>
          <Link to={"/table/" + row.table} style={{ textDecoration: "none" }}>
            <Anchor component="button" fz="sm" c={"#FF5757"}>
              <b>{row.table}</b>
            </Anchor>
          </Link>
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
        radius={2}
        placeholder="Tapez votre nom"
      />
      <Table>
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
