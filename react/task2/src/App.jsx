import React, { useState } from "react";

const employeeData = {
  content: "cpb\nCPB SOFTWARE (GERMANY) GMBH Im Bruch 3...",
  pages: [
    {
      page_number: 1,
      width: 8.2639,
      height: 11.6806,
      words: [
        {
          content: "cpb",
          polygon: [5.0192, 0.3802, 6.4235, 0.3802, 6.4235, 1.0417, 5.0192, 1.0444],
          confidence: 0.962,
          spans: null
        }
      ],
      lines: [
        {
          content: "cpb",
          polygon: [5.0192, 0.3853, 6.388, 0.3802, 6.4185, 1.0444, 5.0344, 1.0444],
          confidence: null,
          spans: [
            {
              offset: 0,
              length: 3
            }
          ]
        }
      ],
      selection_marks: null
    }
  ],
  tables: [],
  figures: [],
  fields: null
};

const DisplayJSON = ({ data, label, showLabel = true, parentKey = "" }) => {
  const [expanded, setExpanded] = useState(true);

  const isArray = Array.isArray(data);
  const isObject = data && typeof data === "object" && !isArray;

  const toggle = () => setExpanded(!expanded);

  // const shouldHideKey = (key, value) => {
  //   const shouldSkipContent =
  //     key === "content" && (parentKey === "" || parentKey === "fields");
  //   return (
  //     shouldSkipContent ||
  //     key === "spans" ||
  //     key === "confidence"
  //   );
  // };

  if (isObject && label === "Employee Data" && data.content) {
    return (
      <div style={{ paddingBottom: "10px", fontSize: "16px" }}>
        <strong>Content:</strong> {data.content}
        <DisplayJSON
          data={{ ...data, content: undefined }}
          showLabel={false}
          parentKey="root"
        />
      </div>
    );
  }

  if (isArray) {
    return (
      <div style={{ marginLeft: "1em", borderLeft: "2px solid #ccc", paddingLeft: "1em" }}>
        {showLabel && (
          <div style={{ fontWeight: "bold", cursor: "pointer" }} onClick={toggle}>
            <span>{expanded ? "▼" : "▶"} </span>
            {label}
          </div>
        )}
        {expanded && (
          data.length > 0 ? (
            data.map((item, index) => (
              <div key={index}>
                <DisplayJSON data={item} showLabel={false} parentKey={label} />
              </div>
            ))
          ) : (
            <div style={{ fontStyle: "italic", color: "#666", marginLeft: "1em" }}>
              [ empty ]
            </div>
          )
        )}
      </div>
    );
  }

  if (isObject) {
    return (
      <div style={{ marginLeft: "1em", borderLeft: "2px solid #ccc", paddingLeft: "1em" }}>
        {showLabel && (
          <div style={{ fontWeight: "bold", cursor: "pointer" }} onClick={toggle}>
            <span>{expanded ? "▼" : "▶"} </span>
            {label}
          </div>
        )}
        {expanded &&
          Object.entries(data).map(([key, value]) => {
            // if (shouldHideKey(key, value)) return null;
            if (typeof value === "undefined") return null;

            if (value === null) {
              return (
                <div key={key}>
                  <strong>{key}:</strong> null
                </div>
              );
            }

            if (Array.isArray(value) && value.length === 0) {
              // empty arrays 
              return (
                <DisplayJSON
                  key={key}
                  data={value}
                  label={key}
                  showLabel={true}
                  parentKey={key}
                />
              );
            }

            return (
              <div key={key}>
                {typeof value === "object" ? (
                  <DisplayJSON
                    data={value}
                    showLabel={true}
                    label={key}
                    parentKey={key}
                  />
                ) : (
                  <div>
                    <strong>{key}:</strong> {String(value)}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    );
  }

  return <div>{String(data)}</div>;
};



function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Employee JSON Viewer</h2>
      <DisplayJSON data={employeeData} label="Employee Data" />
    </div>


  );
}

export default App;
