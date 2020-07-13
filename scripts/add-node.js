const path = require('path');
const fs = require('fs');

const [type, node] = process.argv.slice(2);
const dir = path.join(__dirname, '..', 'nodes', type);
const fileJs = path.join(dir, `${node}.js`);
const fileHtml = path.join(dir, `${node}.html`);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const pascalCase = str =>
  str.replace(/./, l => l.toUpperCase()).replace(/-./g, l => l[1].toUpperCase());

const templateJs = `module.exports = RED => {
  function ${pascalCase(node)}(config) {
    RED.nodes.createNode(this, config);
  }

  RED.nodes.registerType('${node}', ${pascalCase(node)});
};
`;

const templateHtml = `<script type="text/javascript">
  RED.nodes.registerType('${node}', {
    category: '',
    color: '#43b53f',
    icon: 'knot.svg',
  });
</script>

<script type="text/html" data-template-name="${node}">
  <div class="form-row">
    <label for="node-input-<prop>"><i class="fa fa-<icon>"></i> Property</label>
    <input type="text" id="node-input-<prop>">
  </div>
</script>

<script type="text/html" data-help-name="${node}">
  <p></p>
</script>
`;

fs.writeFileSync(fileJs, templateJs);
fs.writeFileSync(fileHtml, templateHtml);
