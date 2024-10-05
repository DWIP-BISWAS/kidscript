// Tab navigation
document.getElementById('tab-run').onclick = function() {
    document.getElementById('editor').classList.add('active');
    document.getElementById('learning').classList.remove('active');
    document.getElementById('contact').classList.remove('active');
    this.classList.add('active');
    document.getElementById('tab-learn').classList.remove('active');
    document.getElementById('tab-contact').classList.remove('active');
};

document.getElementById('tab-learn').onclick = function() {
    document.getElementById('learning').classList.add('active');
    document.getElementById('editor').classList.remove('active');
    document.getElementById('contact').classList.remove('active');
    this.classList.add('active');
    document.getElementById('tab-run').classList.remove('active');
    document.getElementById('tab-contact').classList.remove('active');
};

document.getElementById('tab-contact').onclick = function() {
    document.getElementById('contact').classList.add('active');
    document.getElementById('editor').classList.remove('active');
    document.getElementById('learning').classList.remove('active');
    this.classList.add('active');
    document.getElementById('tab-run').classList.remove('active');
    document.getElementById('tab-learn').classList.remove('active');
};

// KidScript interpreter
function runKidScript() {
    let code = document.getElementById('code').value;
    let output = document.getElementById('output');
    let errorMsg = document.getElementById('error-msg');
    output.innerHTML = ''; // Clear previous output
    errorMsg.style.display = 'none'; // Hide error message

    let variables = {};
    const lines = code.split('\n');

    try {
        for (let line of lines) {
            const words = line.trim().split(' ');

            if (words[0] === 'make') {
                let varName = words[1];
                let value = words.slice(2).join(' ');
                variables[varName] = isNaN(value) ? value.replace(/["']/g, '') : parseInt(value);
            } else if (words[0] === 'show') {
                let displayValue = words.slice(1).join(' ');
                displayValue = displayValue.replace(/([a-zA-Z_][a-zA-Z0-9_]*)/g, function(match) {
                    return variables[match] !== undefined ? variables[match] : match;
                });
                output.innerHTML += displayValue + '<br>';
            } else if (words[0] === 'repeat') {
                let times = parseInt(words[1]);
                let repeatCommand = words.slice(3).join(' ');
                for (let i = 0; i < times; i++) {
                    let repeatOutput = repeatCommand.replace(/([a-zA-Z_][a-zA-Z0-9_]*)/g, function(match) {
                        return variables[match] !== undefined ? variables[match] : match;
                    });
                    output.innerHTML += repeatOutput + '<br>';
                }
            }
        }
    } catch (error) {
        // Show error message and cartoon character
        errorMsg.innerHTML = 'Oops! There was a problem: ' + error.message;
        errorMsg.style.display = 'block';
    }
}

// Save and Load code using local storage
function saveCode() {
    const code = document.getElementById('code').value;
    localStorage.setItem('kidScriptCode', code);
    alert('Code saved!');
}

function loadCode() {
    const savedCode = localStorage.getItem('kidScriptCode');
    if (savedCode) {
        document.getElementById('code').value = savedCode;
    } else {
        alert('No saved code found.');
    }
      }

// Tab navigation code...

// KidScript interpreter
function runKidScript() {
    let code = document.getElementById('code').value;
    let output = document.getElementById('output');
    let errorMsg = document.getElementById('error-msg');
    output.innerHTML = ''; // Clear previous output
    errorMsg.style.display = 'none'; // Hide error message

    let variables = {};
    const commands = code.split('\n');

    try {
        commands.forEach(command => {
            const trimmedCommand = command.trim();

            if (trimmedCommand.startsWith("create")) {
                const [_, tag, attributes] = trimmedCommand.match(/create (\w+) with (.+)/);
                const element = document.createElement(tag);
                const attrs = JSON.parse(attributes.replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
                Object.keys(attrs).forEach(attr => element.setAttribute(attr, attrs[attr]));
                document.body.appendChild(element);
                variables[tag] = element; // Store the created element in variables
            } else if (trimmedCommand.startsWith("set")) {
                const [_, elementId, text] = trimmedCommand.match(/set (\w+) text to "(.+)"/);
                const element = variables[elementId];
                if (element) {
                    element.innerText = text;
                }
            } else if (trimmedCommand.startsWith("style")) {
                const [_, elementId, styles] = trimmedCommand.match(/style (\w+) with (.+)/);
                const element = variables[elementId];
                const styleObj = JSON.parse(styles.replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
                Object.assign(element.style, styleObj);
            } else if (trimmedCommand.startsWith("on")) {
                const [_, elementId, event, func] = trimmedCommand.match(/on (\w+) event (\w+) do { (.+) }/);
                const element = variables[elementId];
                if (element) {
                    element.addEventListener(event, eval(func));
                }
            } else if (trimmedCommand.startsWith("append")) {
                const [_, childId, parentId] = trimmedCommand.match(/append (\w+) to (\w+)/);
                const child = variables[childId];
                const parent = variables[parentId];
                if (child && parent) {
                    parent.appendChild(child);
                }
            }
        });
    }  
}

// Save and Load code functions...
        
