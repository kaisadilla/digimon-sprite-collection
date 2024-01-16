import App from "App";
import "styles/elements/flag";

export interface FlagProps {
    id: string;
    maxWidth: number;
    className?: string;
}

export default function Flag ({
    id,
    maxWidth,
    className = "",
}: FlagProps) {
    const style = {
        maxWidth: `${maxWidth}px`,
        maxHeight: `${maxWidth * 0.666666}px`,
    }

    const displayName = App.data.countries[id]?.display_name ?? "Unknown";

    let classStr = "default-flag ";
    if (className) {
        classStr += className;
    }

    return (
        <img
            className={classStr}
            src={`img/flags/${id}.png`}
            alt={id}
            title={displayName}
            style={style}
        />
    )
}