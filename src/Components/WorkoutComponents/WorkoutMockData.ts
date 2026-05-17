type Exercise = {
  exerciseId: string
  name: string
  gifUrl: string
  targetMuscles: string[],
  bodyParts: string[]
  equipments: string[],
  secondaryMuscles: string[]
  instructions: string[]
}

export const exercises: Exercise[] = [
  {
    "exerciseId": "TR12345",
    "name": "tricep pushdown",
    "gifUrl": "https://static.exercisedb.dev/media/TR12345.gif",
    "targetMuscles": ["triceps"],
    "bodyParts": ["triceps"],
    "equipments": ["cable machine"],
    "secondaryMuscles": ["forearms"],
    "instructions": [
      "Step:1 Stand facing the cable machine...",
      "Step:2 Grip the handle with elbows tucked...",
      "Step:3 Push downward until arms are straight...",
      "Step:4 Squeeze triceps at the bottom...",
      "Step:5 Return slowly..."
    ]
  },

  {
    "exerciseId": "TR67890",
    "name": "overhead dumbbell extension",
    "gifUrl": "https://static.exercisedb.dev/media/TR67890.gif",
    "targetMuscles": ["triceps"],
    "bodyParts": ["triceps"],
    "equipments": ["dumbbell"],
    "secondaryMuscles": ["shoulders"],
    "instructions": [
      "Step:1 Hold a dumbbell overhead with both hands...",
      "Step:2 Lower the weight behind your head...",
      "Step:3 Keep elbows close to your head...",
      "Step:4 Extend arms back upward...",
      "Step:5 Repeat with control..."
    ]
  },

  {
    "exerciseId": "BI12345",
    "name": "barbell curl",
    "gifUrl": "https://static.exercisedb.dev/media/BI12345.gif",
    "targetMuscles": ["biceps"],
    "bodyParts": ["biceps"],
    "equipments": ["barbell"],
    "secondaryMuscles": ["forearms"],
    "instructions": [
      "Step:1 Stand upright holding the barbell...",
      "Step:2 Keep elbows close to your body...",
      "Step:3 Curl the bar upward...",
      "Step:4 Squeeze biceps at the top...",
      "Step:5 Lower slowly to starting position..."
    ]
  },

  {
    "exerciseId": "BI67890",
    "name": "hammer curl",
    "gifUrl": "https://static.exercisedb.dev/media/BI67890.gif",
    "targetMuscles": ["biceps"],
    "bodyParts": ["biceps"],
    "equipments": ["dumbbell"],
    "secondaryMuscles": ["forearms"],
    "instructions": [
      "Step:1 Hold dumbbells at your sides...",
      "Step:2 Keep palms facing inward...",
      "Step:3 Curl the weights upward...",
      "Step:4 Pause briefly at the top...",
      "Step:5 Lower slowly..."
    ]
  },

  {
    "exerciseId": "BK12345",
    "name": "lat pulldown",
    "gifUrl": "https://static.exercisedb.dev/media/BK12345.gif",
    "targetMuscles": ["back"],
    "bodyParts": ["back"],
    "equipments": ["cable machine"],
    "secondaryMuscles": ["biceps", "rear delts"],
    "instructions": [
      "Step:1 Sit down and secure your legs...",
      "Step:2 Grab the bar with a wide grip...",
      "Step:3 Pull the bar toward your upper chest...",
      "Step:4 Squeeze your back muscles...",
      "Step:5 Slowly return to starting position..."
    ]
  },

  {
    "exerciseId": "BK67890",
    "name": "barbell row",
    "gifUrl": "https://static.exercisedb.dev/media/BK67890.gif",
    "targetMuscles": ["back"],
    "bodyParts": ["back"],
    "equipments": ["barbell"],
    "secondaryMuscles": ["biceps", "lats"],
    "instructions": [
      "Step:1 Bend forward while keeping your back straight...",
      "Step:2 Hold the barbell with overhand grip...",
      "Step:3 Pull the bar toward your stomach...",
      "Step:4 Squeeze your shoulder blades together...",
      "Step:5 Lower the bar slowly..."
    ]
  },

  {
    "exerciseId": "CH12345",
    "name": "barbell bench press",
    "gifUrl": "https://static.exercisedb.dev/media/CH12345.gif",
    "targetMuscles": ["chest"],
    "bodyParts": ["chest"],
    "equipments": ["barbell"],
    "secondaryMuscles": ["triceps", "shoulders"],
    "instructions": [
      "Step:1 Lie flat on the bench with feet planted firmly...",
      "Step:2 Grip the bar slightly wider than shoulder width...",
      "Step:3 Lower the bar slowly to your chest...",
      "Step:4 Press the bar upward until arms are extended...",
      "Step:5 Repeat with controlled movement..."
    ]
  },

  {
    "exerciseId": "CH67890",
    "name": "incline dumbbell press",
    "gifUrl": "https://static.exercisedb.dev/media/CH67890.gif",
    "targetMuscles": ["chest"],
    "bodyParts": ["chest"],
    "equipments": ["dumbbell"],
    "secondaryMuscles": ["shoulders", "triceps"],
    "instructions": [
      "Step:1 Set the bench to an incline position...",
      "Step:2 Hold dumbbells at chest level...",
      "Step:3 Press the weights upward together...",
      "Step:4 Lower slowly until elbows are below chest...",
      "Step:5 Repeat for desired reps..."
    ]
  },

  {
    "exerciseId": "AB12345",
    "name": "cable crunch",
    "gifUrl": "https://static.exercisedb.dev/media/AB12345.gif",
    "targetMuscles": ["abs"],
    "bodyParts": ["abs"],
    "equipments": ["cable machine"],
    "secondaryMuscles": ["obliques"],
    "instructions": [
      "Step:1 Kneel in front of the cable machine...",
      "Step:2 Hold the rope near your head...",
      "Step:3 Crunch downward using your abs...",
      "Step:4 Pause briefly at the bottom...",
      "Step:5 Return slowly..."
    ]
  },

  {
    "exerciseId": "AB67890",
    "name": "hanging leg raise",
    "gifUrl": "https://static.exercisedb.dev/media/AB67890.gif",
    "targetMuscles": ["abs"],
    "bodyParts": ["abs"],
    "equipments": ["pull-up bar"],
    "secondaryMuscles": ["hip flexors"],
    "instructions": [
      "Step:1 Hang from the pull-up bar...",
      "Step:2 Keep legs straight...",
      "Step:3 Raise legs until parallel to the floor...",
      "Step:4 Lower slowly with control...",
      "Step:5 Repeat for desired reps..."
    ]
  },

  {
    "exerciseId": "SH12345",
    "name": "dumbbell shoulder press",
    "gifUrl": "https://static.exercisedb.dev/media/SH12345.gif",
    "targetMuscles": ["shoulders"],
    "bodyParts": ["shoulders"],
    "equipments": ["dumbbell"],
    "secondaryMuscles": ["triceps"],
    "instructions": [
      "Step:1 Sit upright holding dumbbells at shoulder level...",
      "Step:2 Press the weights overhead...",
      "Step:3 Extend arms fully without locking elbows...",
      "Step:4 Lower weights slowly...",
      "Step:5 Repeat with control..."
    ]
  },

  {
    "exerciseId": "SH67890",
    "name": "lateral raise",
    "gifUrl": "https://static.exercisedb.dev/media/SH67890.gif",
    "targetMuscles": ["shoulders"],
    "bodyParts": ["shoulders"],
    "equipments": ["dumbbell"],
    "secondaryMuscles": ["traps"],
    "instructions": [
      "Step:1 Stand holding dumbbells at your sides...",
      "Step:2 Raise arms out to shoulder height...",
      "Step:3 Keep a slight bend in elbows...",
      "Step:4 Pause briefly at the top...",
      "Step:5 Lower weights slowly..."
    ]
  },

  {
    "exerciseId": "LG12345",
    "name": "barbell squat",
    "gifUrl": "https://static.exercisedb.dev/media/LG12345.gif",
    "targetMuscles": ["legs"],
    "bodyParts": ["legs"],
    "equipments": ["barbell"],
    "secondaryMuscles": ["glutes", "hamstrings"],
    "instructions": [
      "Step:1 Place the barbell on your upper back...",
      "Step:2 Stand with feet shoulder width apart...",
      "Step:3 Lower your body by bending knees...",
      "Step:4 Go down until thighs are parallel...",
      "Step:5 Push through heels to return up..."
    ]
  },

  {
    "exerciseId": "LG67890",
    "name": "romanian deadlift",
    "gifUrl": "https://static.exercisedb.dev/media/LG67890.gif",
    "targetMuscles": ["legs"],
    "bodyParts": ["legs"],
    "equipments": ["barbell"],
    "secondaryMuscles": ["glutes", "lower back"],
    "instructions": [
      "Step:1 Hold the barbell in front of your thighs...",
      "Step:2 Hinge at the hips while keeping back straight...",
      "Step:3 Lower until hamstrings are stretched...",
      "Step:4 Drive hips forward to stand up...",
      "Step:5 Repeat with control..."
    ]
  }
];