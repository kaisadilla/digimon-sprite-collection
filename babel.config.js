const path = require('path');

module.exports = {
    presets: [
        [
            '@babel/preset-react',
            {
                pragma: 'Ivy.new',
                pragmaFrag: 'Ivy.newFragment',
            }
        ],
        '@babel/preset-env'
    ],
    plugins: [
        [
            'module:babel-jsx-pragma-module-auto-import',
            {
                path: 'ivy/ivy',
                name: 'Ivy'
            }
        ]
    ]
}