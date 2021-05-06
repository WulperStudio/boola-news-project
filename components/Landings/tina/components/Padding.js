import React, { useState, useEffect } from "react"

export const Padding = ({ input, meta, field }) => {
  const initialValues = input.value
    ? input.value.replace(/ /g, "").split("px")
    : [0, 0, 0, 0]
  const [top, setTop] = useState(initialValues[0])
  const [right, setRight] = useState(initialValues[1])
  const [bottom, setBottom] = useState(initialValues[2])
  const [left, setLeft] = useState(initialValues[3])

  useEffect(() => {
    input.onChange(`${top}px ${right}px ${bottom}px ${left}px`)
  }, [top, right, bottom, left])
  return (
    <div
      className="FieldWrapper-sc"
      style={{ marginBottom: "var(--tina-padding-big)" }}
    >
      <label
        for="blocks.1.paddingBottom"
        className="FieldLabel-sc"
        style={{
          display: "block",
          fontFamily: "Inter,sans-serif",
          display: "block",
          fontSize: "var(--tina-font-size-1)",
          fontWeight: 600,
          color: "var(--tina-color-grey-8)",
          marginBottom: 8,
        }}
      >
        {field.label || field.name} (Top, Right, Bottom, Left) px
      </label>
      <input
        type="number"
        class="Input-sc-isiqg8 iRoiws"
        value={top}
        onChange={event => setTop(event.target.value)}
        style={{ width: "25%" }}
      />
      <input
        type="number"
        class="Input-sc-isiqg8 iRoiws"
        value={right}
        onChange={event => setRight(event.target.value)}
        style={{ width: "25%" }}
      />
      <input
        type="number"
        class="Input-sc-isiqg8 iRoiws"
        value={bottom}
        onChange={event => setBottom(event.target.value)}
        style={{ width: "25%" }}
      />
      <input
        type="number"
        class="Input-sc-isiqg8 iRoiws"
        onChange={event => setLeft(event.target.value)}
        value={left}
        style={{ width: "25%" }}
      />
    </div>
  )
}
