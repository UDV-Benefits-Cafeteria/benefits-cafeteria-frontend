import React from "react";

import { Title } from "@shared/ui/Title/index";

const TitleTemplate: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <Title type={"page"}>Test title</Title>
        <Title type={"block"}>Test title</Title>
        <Title type={"element"}>Test title</Title>
      </div>
      ALTERNATIVE:
      <div style={{ display: "flex", gap: "8px" }}>
        <Title
          type={"page"}
          fontStyle={"alternative"}
        >
          Test title
        </Title>
        <Title
          type={"block"}
          fontStyle={"alternative"}
        >
          Test title
        </Title>
        <Title
          type={"element"}
          fontStyle={"alternative"}
        >
          Test title
        </Title>
      </div>
    </div>
  );
};

export default TitleTemplate;
