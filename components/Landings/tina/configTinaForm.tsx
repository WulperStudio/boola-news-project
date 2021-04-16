import Fab from "@material-ui/core/Fab"

const configTinaForm = [
  {
    label: "Primary Color",
    name: "primary_color",
    component: "color",
    widget: "block",
    colors: ["#613EEA", "#F6AD86", "#54D3AD", "#F25A5A", "#B2BEDA", "#3D3769"],
  },
  {
    name: "secondary_color",
    label: "Secondary Color",
    component: "color",
    widget: "sketch",
  },
  {
    name: "typography",
    label: "Typography",
    component: "select",
    options: ["Default", "Poppins"],
  },
  {
    name: "buttons_patterns",
    label: "Buttons Patterns",
    component: "select",
    options: ["Rounded buttons", "Square buttons"],
  },
  {
    name: "design",
    label: "Design",
    component: ({ input, meta, field }) => (
      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 8,
            color: "#433e52",
          }}
        >
          {field.label || field.name}
        </label>
        <div>
          <Fab color="primary" size="small">
            A
          </Fab>
          <Fab color="secondary" size="small">
            B
          </Fab>
        </div>
      </div>
    ),
  },
  {
    name: "landing_goal",
    label: "Landing Goal",
    component: "textarea",
  },
]

export default configTinaForm
