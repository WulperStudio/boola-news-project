export const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Dessert (100g serving)" },
  { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
  { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" }
]
export const dataRows = [
  { id: 1, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3, other: 500 },
  { id: 2, name: "Donut", calories: 452, fat: 25.0, carbs: 51, protein: 4.9, other: 200 },
  { id: 3, name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0, other: 300 },
  { id: 4, name: "Frozen yoghurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0, other: 500 },
  { id: 5, name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9, other: 100 },
  { id: 6, name: "Honeycomb", calories: 408, fat: 3.2, carbs: 87, protein: 6.5, other: 200 },
  { id: 7, name: "Ice cream sandwich", calories: 237, fat: 9.0, carbs: 37, protein: 4.3, other: 300 },
  { id: 8, name: "Jelly Bean", calories: 375, fat: 0.0, carbs: 94, protein: 0.0, other: 200 },
  { id: 9, name: "KitKat", calories: 518, fat: 26.0, carbs: 65, protein: 7.0, other: 100 },
  { id: 10, name: "Lollipop", calories: 392, fat: 0.2, carbs: 98, protein: 0.0, other: 600 },
  { id: 11, name: "Marshmallow", calories: 318, fat: 0, carbs: 81, protein: 2.0, other: 700 },
  { id: 12, name: "Nougat", calories: 360, fat: 19.0, carbs: 9, protein: 37.0, other: 100 },
  { id: 13, name: "Oreo", calories: 437, fat: 18.0, carbs: 63, protein: 4.0, other: 300 }
]

export const formatRows = [
  { key: "name" },
  { key: "calories", align: "right", chip: true },
  { key: "fat", align: "right", image: "https://material-ui.com/static/images/avatar/1.jpg" },
  { key: "carbs", align: "right" },
  { key: "protein", align: "right" }
]
