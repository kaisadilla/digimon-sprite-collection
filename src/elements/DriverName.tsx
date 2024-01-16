export interface DriverNameProps {
    name: string
};

interface NameFragment {
    string: string;
    highlight: boolean;
}

export default function DriverName ({
    name
}: DriverNameProps) {
    const fragments = parseName(name);

    const $div = <></>;

    for (const f of fragments) {
        if (f.highlight) {
            $div.appendChild(<strong>{f.string}</strong>);
        }
        else {
            $div.appendChild(document.createTextNode(f.string));
        }
    }

    return $div;
}

function parseName (name: string) : NameFragment[] {
    let begin = 0;
    let cursor = 0;

    const fragments: NameFragment[] = [];

    while (cursor < name.length) {
        if (name[cursor] === "[" || name[cursor] === "]") {
            _pushSubstring(name[cursor] === "]");

            cursor++;
            begin = cursor;
        }

        cursor++;
    }

    if (begin < name.length) {
            _pushSubstring(false);
    }

    return fragments;

    function _pushSubstring (highlight: boolean) {
        const substr = name.substring(begin, cursor).replace(/ /g, "\u00a0");

        fragments.push({
            string: substr,
            highlight: highlight,
        });
    }
}