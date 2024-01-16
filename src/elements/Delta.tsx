import "styles/elements/delta";

export interface DeltaProps {
    value: number | null;
}

export default function Delta ({
    value
}: DeltaProps) {
    let deltaText, deltaClass;
    if (value === null || value === undefined) {
        deltaText = "";
        deltaClass = "default-delta";
    }
    else if (value < 0) {
        deltaText = `⯅${-value}`;
        deltaClass = "default-delta positive";
    }
    else if (value === 0) {
        deltaText = `–`;
        deltaClass = "default-delta neutral";
    }
    else {
        deltaText = `⯆${value}`;
        deltaClass = "default-delta negative";
    }

    return (
        <span className={deltaClass}>{deltaText}</span>
    )
}