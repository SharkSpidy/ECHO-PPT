/** Literature Review rows, taken verbatim from Table 2.2 of the ECHO Project Phase I report. */
export interface LiteratureRow {
  ref: string;
  paper: string;
  authors: string;
  advantage: string;
  limitation: string;
  relevance: string;
}

export const literature: LiteratureRow[] = [
  {
    ref: "[1]",
    paper: "INVys: Indoor Navigation System for Persons with Visual Impairment Using RGB-D Camera",
    authors: "Widyawan, Saputra & Santosa",
    advantage: "Auto-Adaptive Double Thresholding splits Kinect depth into left/middle/right zones for obstacle detection (50.2 mm mean error).",
    limitation: "Macro-navigation depends on printed optical glyphs; accuracy drops sharply with distance and camera tilt.",
    relevance: "Directly shaped ECHO’s left/middle/right obstacle-zone design and motivates markerless localisation.",
  },
  {
    ref: "[2]",
    paper: "A Wearable Navigation Device for Visually Impaired People Based on Real-Time Semantic Visual Localization",
    authors: "Chen, Liu, Kojima, Huang & Arai",
    advantage: "Real-time semantic visual localisation (feature tracking + CNN segmentation) speaks scene descriptions at roughly 25 fps with centimetre-level accuracy.",
    limitation: "Pure visual odometry drifts over time and needs GPU-class embedded hardware plus IMU/GPS fusion.",
    relevance: "Main comparison point for ECHO’s localisation approach; the documented drift and hardware cost inform the trade-off.",
  },
  {
    ref: "[3]",
    paper: "Navigation Systems for the Blind and Visually Impaired: Past Work, Challenges, and Open Problems",
    authors: "Real & Araujo",
    advantage: "Seven-decade survey of ETAs, sensory substitution and vision-based localisation; proposes a positioning–monitoring–interface framework.",
    limitation: "Review only – no original implementation or comparative evaluation of localisation strategies.",
    relevance: "Positions ECHO within the research landscape and supports splitting feedback across haptic and audio channels.",
  },
  {
    ref: "[4]",
    paper: "Vision-Based Mobile Indoor Assistive Navigation Aid for Blind People (ISANA)",
    authors: "Li, Munoz, Rong, Chen, Xiao, Tian, Arditi & Yousuf",
    advantage: "Field-tested CAD-map + visual-positioning-service localisation with Kalman-filter obstacle tracking; showed no drift compared with raw odometry.",
    limitation: "Relies on the discontinued Google Tango platform, a pre-built CAD model and about 1.5 hours of battery life.",
    relevance: "Strongest supporting reference for ECHO’s architecture; validates pairing localisation with dual-modality feedback.",
  },
  {
    ref: "[5]",
    paper: "Landmarks Detection to Assist the Navigation of Visually Impaired People",
    authors: "Costa, Fernandes, Vasconcelos, Coelho, Barroso & Hadjileontiadis",
    advantage: "Peano–Hilbert curve + EEMD landmark detection compresses image data to 1D, mapped to a five-direction haptic interface.",
    limitation: "Built for outdoor sidewalks and still needs physically installed markers; validation is only qualitative.",
    relevance: "Confirms landmark-based navigation as an established strategy and informs ECHO’s directional haptic scheme.",
  },
  {
    ref: "[6]",
    paper: "Integrating Wearable Haptics and Obstacle Avoidance for the Visually Impaired in Indoor Navigation",
    authors: "Barontini, Catalano, Pallottino, Leporini & Bianchi",
    advantage: "User-centred CUFF device gives squeeze and skin-stretch cues; Safe/Right/Left obstacle zoning reached 97% directional accuracy.",
    limitation: "Cannot distinguish moving from stationary obstacles, and fails in the dark because it relies on RGB only.",
    relevance: "Corroborates ECHO’s hands-free haptic wristband and zoned obstacle structure; informs camera-range and update-rate specifications.",
  },
  {
    ref: "[7]",
    paper: "Exploiting the Haptic and Audio Channels to Improve Orientation and Mobility Apps for the Visually Impaired",
    authors: "Paratore & Leporini",
    advantage: "GeoJSON map layer pairs distinct vibration patterns with per-category text-to-speech; users preferred combined haptic + audio feedback.",
    limitation: "Users reliably told apart only 3–4 of 6 vibration patterns; targets outdoor GPS pre-visit exploration, not real-time indoor use.",
    relevance: "Supports ECHO’s dual audio + haptic design and warns against an overly large vibration vocabulary.",
  },
  {
    ref: "[8]",
    paper: "Multiple Object Recognition Using OpenCV",
    authors: "Kavitha, Rishi Kiran, Niteesh & Praveen",
    advantage: "HSV colour-space analysis with cascaded HAAR-feature classifiers in OpenCV reached about 98% detection accuracy live.",
    limitation: "Limited to a small predefined object set; uses dated cascade classifiers rather than modern deep learning; not VI-specific.",
    relevance: "Supports OpenCV as a viable, low-cost foundation for ECHO’s detection component.",
  },
  {
    ref: "[9]",
    paper: "Analysis and Design Framework for the Development of Indoor Scene Understanding Assistive Solutions for the Person with Visual Impairment/Blindness",
    authors: "Valipoor, de Antonio & Cabrera",
    advantage: "Systematic framework defines use cases (scene description, object finding, obstacle avoidance, text reading) and a reference architecture.",
    limitation: "Framework only, with no working implementation; leaves open problems such as LLM scene-description hallucination unresolved.",
    relevance: "Justifies ECHO’s indoor-only scope and its focus on obstacle avoidance and route-following.",
  },
  {
    ref: "[10]",
    paper: "Knowledge Driven Indoor Object-Goal Navigation Aid for Visually Impaired People",
    authors: "Hou, Zhao, Wang & Liu",
    advantage: "Helmet-mounted RGB-D system uses a learned object-relation knowledge graph with visual localisation to guide users to target objects.",
    limitation: "Needs a full visual mapping pipeline and Jetson-class GPU hardware, with roughly 258 ms of mapping latency per frame.",
    relevance: "Useful contrast case – ECHO’s simpler route-following task does not need full mapping infrastructure.",
  },
];
