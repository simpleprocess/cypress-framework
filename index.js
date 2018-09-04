//const cypress = require('./node_modules/.bin/cypress');
const cypress = require('cypress');
//console.log('cypress is', cypress);
const fs = require('fs');
const program = require('commander');

var configName = "config.json";
var configBaseDir = './';
var specs = [];
var specBasePath = './cypress/integration/specs';
var config = require(getConfig());


function getConfig() {
    var configPath = configBaseDir + '/' + configName;
    if (fs.existsSync(configPath)) {
        return configPath;
    } else {
        console.log('Config path ' + configPath + ' doesnt exist');
        process.exit(1);
    }
}

async function specRunner(specs, config) {
    var tasks = []
    for ( var s in specs) {
        var c = {
            spec: specs[s],
            key: config['record-key'],
            record: true,
            browser: "chrome",
            headed: false
        }

        tasks.push(cypress.run(c));
    }
    
    var result = await Promise.all(tasks);
}

async function threadRunner(specs, config) {
    var n = 0;
    
    while( n < specs.length) {
        var s = [];
        var i = 0
        while(i < config['thread-count']) {
            if(typeof(specs[n]) !== 'undefined') {
                s.push(specs[n]);
                i += 1;
                n += 1;
            } else {
                break;
            }
            
        } 
        
        await specRunner(s, config);
    }
}

program
    .option('--spec', 'Specify the spec file to run.')
    .parse(process.argv);

if (typeof(program.spec) !== 'undefined') {
    specs.push(program.spec);
} else {
    if (fs.existsSync(specBasePath)) {
        fs.readdirSync(specBasePath).forEach(filename => {
            specs.push(specBasePath + '/' + filename);
        })
    } else {
        console.log("Spec base directory " + specBasePath + " doesn't exist");
        process.exit(1);
    }
}

threadRunner(specs, config);