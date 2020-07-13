const path = require('path');
const fs = require('fs');
const packageFile = require('../package.json');

const libDir = path.join(__dirname, '..');
const nodesDir = path.join(libDir, 'nodes');

const getFilesByExtension = (dir, ext) => {
  const filteredFiles = [];
  const filter = RegExp(`\\.${ext}$`);
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filename = path.join(dir, file);
    if (fs.lstatSync(filename).isDirectory()) {
      filteredFiles.push(...getFilesByExtension(filename, ext));
    } else if (filter.test(file)) {
      filteredFiles.push(filename);
    }
  });
  return filteredFiles;
};

const getNodeName = file => file.replace('nodes/', '').replace('/', '-').replace(/\..+$/, '');

const files = getFilesByExtension(nodesDir, 'js').map(file => file.replace(`${libDir}/`, ''));
const nodes = files
  .map(file => ({ [getNodeName(file)]: file }))
  .reduce((a, b) => ({ ...a, ...b }), {});

packageFile['node-red'] = { nodes };
fs.writeFileSync(path.join(__dirname, '..', 'package.json'), JSON.stringify(packageFile, null, 2));
