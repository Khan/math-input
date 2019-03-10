const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const folder = path.resolve(root, 'build/dist');

const __DEV__ = process.argv[2] === '--dev';

!fs.existsSync(folder) && fs.mkdirSync(folder);
fs.copyFileSync(path.resolve(root, 'node_modules/jquery/dist/jquery.min.js'), path.resolve(folder, 'jquery.min.js'));
fs.copyFileSync(path.resolve(root, 'node_modules/babel-polyfill/browser.js'), path.resolve(folder, 'babel-polyfill-browser.js'));

execSync('npm run css', { cwd: root, stdio: 'inherit' });
execSync(__DEV__ ? 'webpack --config webpack.config.dev.js --watch' : 'webpack --config webpack.config.js', { cwd: root, stdio: 'inherit' });

console.log('generated build successfully');
