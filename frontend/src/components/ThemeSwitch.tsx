import { useColorScheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
	type ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeSwitch(props: ToggleButtonGroupProps) {
	const { mode, setMode } = useColorScheme();
	if (!mode) {
		return null;
	}
	return (
		<ToggleButtonGroup
			{...props}
			fullWidth
			value={mode}
			onChange={(_, value) =>
				setMode(value as "system" | "light" | "dark")
			}
			exclusive
			color="primary"
		>
			<ToggleButton value="light">
				<LightModeIcon />
			</ToggleButton>
			<ToggleButton value="system">
				<AutoModeIcon />
			</ToggleButton>
			<ToggleButton value="dark">
				<DarkModeIcon />
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
