import { FC } from "react";

import { Text } from "@shared/ui/Text/index";

export const TextTemplate: FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <Text size={"s"}>Test text</Text>
        <Text size={"m"}>Test text</Text>
        <Text size={"l"}>Test text</Text>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Text
          size={"s"}
          boldness={"medium"}
        >
          Test text
        </Text>
        <Text
          size={"m"}
          boldness={"medium"}
        >
          Test text
        </Text>
        <Text
          size={"l"}
          boldness={"medium"}
        >
          Test text
        </Text>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Text
          size={"s"}
          boldness={"bold"}
        >
          Test text
        </Text>
        <Text
          size={"m"}
          boldness={"bold"}
        >
          Test text
        </Text>
        <Text
          size={"l"}
          boldness={"bold"}
        >
          Test text
        </Text>
      </div>
      ALTERNATIVE:
      <div style={{ display: "flex", gap: "8px" }}>
        <Text
          size={"s"}
          boldness={"normal"}
          fontStyle={"alternative"}
        >
          Test text
        </Text>
        <Text
          size={"m"}
          boldness={"normal"}
          fontStyle={"alternative"}
        >
          Test text
        </Text>
        <Text
          size={"l"}
          boldness={"normal"}
          fontStyle={"alternative"}
        >
          Test text
        </Text>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Text
          size={"s"}
          boldness={"bold"}
          fontStyle={"alternative"}
        >
          Test text
        </Text>
        <Text
          size={"m"}
          boldness={"bold"}
          fontStyle={"alternative"}
        >
          Test text
        </Text>
        <Text
          size={"l"}
          boldness={"bold"}
          fontStyle={"alternative"}
        >
          Test text
        </Text>
      </div>
    </div>
  );
};
