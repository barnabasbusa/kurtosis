import { Box, Flex } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { isDefined } from "../../../utils";

export type LogStatus = "info" | "error";

export type LogLineProps = {
  timestamp?: DateTime;
  message?: string;
  status?: LogStatus;
};

const logFontFamily = "Menlo, Monaco, Inconsolata, Consolas, Courier, monospace"

export const LogLine = ({ timestamp, message, status }: LogLineProps) => {
  const statusToColor = (status?: LogStatus) => {
    switch (status) {
      case "error":
        return "red.400";
      case "info":
        return "gray.100";
      default:
        return "white";
    }
  };

  return (
    <Flex borderBottom={"1px solid #444444"} p={"14px 0"} m={"0 16px"} gap={"8px"} alignItems={"center"}>
      {isDefined(timestamp) && (
        <Box
          as={"pre"}
          whiteSpace={"pre-wrap"}
          fontSize={"xs"}
          lineHeight="2"
          fontWeight={600}
          fontFamily={logFontFamily}
          color={"grey"}
        >
          {timestamp.toLocal().toFormat("yyyy-MM-dd HH:MM:ss.SSS ZZZZ")} |
        </Box>
      )}
      <Box
        as={"pre"}
        whiteSpace={"pre-wrap"}
        fontSize={"xs"}
        lineHeight="2"
        fontWeight={400}
        fontFamily={logFontFamily}
        color={statusToColor(status)}
      >
        {message || <i>No message</i>}
      </Box>
    </Flex>
  );
};