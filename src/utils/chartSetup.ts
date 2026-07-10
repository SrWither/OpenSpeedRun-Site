// Chart.js is tree-shakeable but requires explicitly registering whichever
// controllers/elements/plugins you use. Centralized here and imported once
// (from each chart component) so the registration list lives in one place.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
)

export { ChartJS }
