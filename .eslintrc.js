module.exports = {
    root: true,

    env: {
        node: true,
    },

    rules: {
        'brace-style':                  [1],
        'callback-return':              [2, ['callback', 'cb', 'next', 'done', 'proceed']],
        camelcase:                    [1, { properties: 'always' }],
        'comma-dangle':                 ['warn', 'always-multiline'],
        'comma-style':                  [2, 'last'],
        curly:                        [2],
        'eol-last':                     [1],
        eqeqeq:                       [2, 'smart'],
        'handle-callback-err':          [2],
        indent:                       [2, 4, { SwitchCase: 1 }],
        'linebreak-style':              [2, 'unix'],
        'no-console':                   ['error', { allow: ['warn','error','log'] }],
        'no-mixed-spaces-and-tabs':     [2, 'smart-tabs'],
        'no-return-assign':             [2, 'always'],
        'no-sequences':                 [2],
        'no-trailing-spaces':           [2],
        'no-undef':                     [0],
        'no-unexpected-multiline':      [1],
        'no-unused-vars':               ['warn', { args: 'after-used' }],
        'no-var':                       [1],
        'one-var':                      [2, 'never'],
        'object-curly-spacing':         [1, 'always'],
        semi:                         [2, 'always'],
        'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
        'vue/html-indent':              ['error', 4],
        'vue/attribute-hyphenation': 'off',
    },

    parserOptions: {
        parser: 'babel-eslint',
    },

    'extends': [
        'plugin:vue/recommended',
        'eslint:recommended',
    ],
};
