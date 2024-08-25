import {
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  TextInput,
  Image,
} from "@mantine/core";
import classes from "./Home.module.css";
import { distance, closest } from "fastest-levenshtein";
import { useState } from "react";
import suire from "../public/suire.png";
import data from "./data.json";
import { Link } from "react-router-dom";

export function HomeScreen() {
  const [visibleData, setVisibleData] = useState(data);
  const [textInputValue, setTextInputValue] = useState("");
  const rows = visibleData
    .map((el) => ({
      ...el,
      distance: Math.min(
        distance(textInputValue, el.firstname.toLowerCase()),
        distance(textInputValue, el.lastname.toLowerCase()),
        distance(
          textInputValue,
          el.firstname.toLowerCase() + " " + el.lastname.toLowerCase()
        )
      ),
    }))
    .filter((el) => {
      if (textInputValue.length > 0) {
        return el.distance <= 3;
      } else {
        return true;
      }
    })
    .toSorted((a, b) => {
      return a.distance >= b.distance ? 1 : -1;
    })
    .map((row) => {
      return (
        <>
          <Table.Tr key={row.firstname + row.lastname}>
            <Table.Td c={"#25737D"}>
              <i>
                {row.firstname} <b>{row.lastname}</b>
              </i>
            </Table.Td>
            <Table.Td>
              <Link
                to={"/table/" + row.table}
                style={{ textDecoration: "none" }}
              >
                <Anchor component="button" fz="sm" c={"#FF5757"}>
                  <b>{row.table}</b>
                </Anchor>
              </Link>
            </Table.Td>
          </Table.Tr>
        </>
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
