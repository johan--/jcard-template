/*
 * Interactive j-card template logic.
 */
var jcard = (function() {
    // find input elements in the controls module
    function findInputs(controls) {
        return {
            dualPrint:      controls.querySelector('#controls-dual-print'),
            allCaps:        controls.querySelector('#controls-all-caps'),
            labelCaps:      controls.querySelector('#controls-label-caps'),
            shortBack:      controls.querySelector('#controls-short-back'),

            cover:          controls.querySelector('#controls-cover'),
            cardColor:      controls.querySelector('#controls-card-color'),
            textColor:      controls.querySelector('#controls-text-color'),

            fontFamily:     controls.querySelector('#controls-font-family'),
            italic:         controls.querySelector('#controls-italic'),

            titleMain:      controls.querySelector('#controls-title-main'),
            titleSub:       controls.querySelector('#controls-title-sub'),
            titleMainSize:  controls.querySelector('#controls-title-main-size'),
            titleSubSize:   controls.querySelector('#controls-title-sub-size'),

            foot:           controls.querySelector('#controls-foot'),
            footSize:       controls.querySelector('#controls-foot-size'),

            noteUpper:      controls.querySelector('#controls-note-upper'),
            noteLower:      controls.querySelector('#controls-note-lower'),
            noteSize:       controls.querySelector('#controls-note-size'),

            sideA:          controls.querySelector('#controls-side-a'),
            sideB:          controls.querySelector('#controls-side-b'),
            frontSize:      controls.querySelector('#controls-front-size'),
            backSize:       controls.querySelector('#controls-back-size')
        }
    }

    // find output elements in the template module
    function findOutputs(template) {
        return {
            root:           template,
            boundaries:     template.querySelector('.template-boundaries'),
            cover:          template.querySelector('.template-cover'),
            titles:         [
                template.querySelector('.template-front-title'),
                template.querySelector('.template-spine-title')],
            subtitles:      [
                template.querySelector('.template-front-subtitle'),
                template.querySelector('.template-spine-subtitle')],
            tracks:         template.querySelector('.template-tracks'),
            type:           template.querySelector('.template-type'),
            noteGroup:      template.querySelector('.template-note-group'),
            noteUpper:      template.querySelector('.template-note-upper'),
            noteLower:      template.querySelector('.template-note-lower'),
            sideA:          template.querySelector('.template-side-a'),
            sideB:          template.querySelector('.template-side-b'),
            labels:         [
                template.querySelector('.template-side-a'),
                template.querySelector('.template-side-b')]
        }
    }

    // add listeners to inputs that toggle option classes
    function addOptionListeners(inputs, root) {
        addToggleListener(inputs.dualPrint, root, 'print-2');
    }

    // add listeners to inputs that update j-card outputs
    function addJCardListeners(inputs, outputs) {
        addToggleListener(inputs.shortBack, outputs.root, 'short-back');
        addToggleListener(inputs.allCaps, outputs.root, 'force-caps');
        addLabelCapsListener(inputs.labelCaps, outputs.labels, 0);
        addLabelCapsListener(inputs.labelCaps, outputs.labels, 1);

        addImageListener(inputs.cover, outputs.cover);
        addColorListener(inputs.textColor, outputs.root, 'color');
        addColorListener(inputs.cardColor, outputs.boundaries, 'backgroundColor');

        addFontListener(inputs.fontFamily, outputs.root);
        addToggleListener(inputs.italic, outputs.root, 'italic');

        outputs.titles.forEach(function(titleOutput) {
            addTextListener(inputs.titleMain, titleOutput);
            addSizeListener(inputs.titleMainSize, titleOutput);
        });
        outputs.subtitles.forEach(function(subtitleOutput) {
            addTextListener(inputs.titleSub, subtitleOutput);
            addSizeListener(inputs.titleSubSize, subtitleOutput);
        });

        addTextListener(inputs.foot, outputs.type);
        addSizeListener(inputs.footSize, outputs.type);

        addTextListener(inputs.noteUpper, outputs.noteUpper);
        addTextListener(inputs.noteLower, outputs.noteLower);
        addSizeListener(inputs.noteSize, outputs.noteGroup);

        addSideListener(inputs.sideA, outputs.sideA);
        addSideListener(inputs.sideB, outputs.sideB);
        addTracksListener([inputs.sideA, inputs.sideB], outputs.tracks);
        addSizeListener(inputs.frontSize, outputs.tracks);
        addSizeListener(inputs.backSize, outputs.sideA);
        addSizeListener(inputs.backSize, outputs.sideB);
    }

    // populate inputs with field values or defaults
    function populate(inputs, fields) {
        inputs.shortBack.checked = fields.short_back !== undefined ? fields.short_back : false;

        inputs.cardColor.value = fields.cardColor || 'white';
        inputs.textColor.value = fields.textColor || 'black';

        inputs.fontFamily.value = fields.fontFamily || 'Alte Haas Grotesk';

        inputs.titleMain.value = fields.titleMain || '';
        inputs.titleSub.value = fields.titleSub || '';
        inputs.titleMainSize.value = fields.titleMainSize || 12;
        inputs.titleSubSize.value = fields.titleSubSize || 12;

        inputs.foot.value = fields.foot || '';
        inputs.footSize.value = fields.footSize || 6.2;

        inputs.noteUpper.value = fields.noteUpper || '';
        inputs.noteLower.value = fields.noteLower || '';
        inputs.noteSize.value = fields.noteSize || 10;

        inputs.sideA.value = formatList(fields.sideA || []);
        inputs.sideB.value = formatList(fields.sideB || []);
        inputs.frontSize.value = fields.frontSize || 9;
        inputs.backSize.value = fields.backSize || 8;
    }

    // trigger listener calls on all fields
    function update(inputs) {
        for (name in inputs) {
            var input = inputs[name];
            var event = document.createEvent('Event');
            if (input.type === 'checkbox' || input.type === 'file')
                event.initEvent('change', true, true);
            else
                event.initEvent('input', true, true);
            input.dispatchEvent(event);
        }
    }

    // copy an input value to an output innerHTML on input change
    function addTextListener(input, output) {
        input.addEventListener('input', function(event) {
            output.innerHTML = input.value;
        });
    }

    // toggle a class on an output element when an input is checked
    function addToggleListener(input, output, toggleClass) {
        input.addEventListener('change', function(event) {
            if (input.checked)
                output.classList.add(toggleClass);
            else
                output.classList.remove(toggleClass);
        });
    }

    // set the font size of an output element to the input value on change
    function addSizeListener(input, output) {
        input.addEventListener('input', function(event) {
            output.style.fontSize = input.value + 'pt';
        });
    }

    // set a property of the output element's style to a color on change
    function addColorListener(input, output, property) {
        input.addEventListener('input', function(event) {
            output.style[property] = input.value;
        });
    }

    // set the src property of an image when a file is selected
    function addImageListener(input, output) {
        input.addEventListener('change', function(event) {
            var file = input.files[0];
            if (file) {
                output.src = URL.createObjectURL(file);
            }
        });
    }

    // format an input list and set an output innerHTML on input change
    function addSideListener(input, output) {
        input.addEventListener('input', function(event) {
            output.innerHTML = formatListText(input.value);
        });
    }

    // combine and format input lists and set output innerHTML on any input change
    function addTracksListener(inputs, output) {
        inputs.forEach(function(input) {
            input.addEventListener('input', function(event) {
                var rawSides = inputs.map(function(input) {
                    if (input.id === 'controls-side-b')
                        return '|' + input.value;
                    else
                        return input.value;
                });
                var rawTracks = formatList(rawSides);
                output.innerHTML = formatListPerSide(formatListText(rawTracks));
            });
        });
    }

    // toggles label caps classes
    function addLabelCapsListener(input, outputs, index) {
        toggleClass = index === 0 ? 'template-side-a-caps' : 'template-side-b-caps'
        input.addEventListener('change', function(event) {
            if (input.checked)
                outputs[index].classList.add('template-side-a-caps');
            else
                outputs[index].classList.remove('template-side-a-caps');
        });
    }

    // sets font family
    function addFontListener(input, output) {
        input.addEventListener('change', function(event) {
            output.style.fontFamily = input.value;
        });
    }

    // convert a list to a newline delimited string
    function formatList(list) {
        return list.join('\n');
    }

    // convert a newline delimited string to a '»' delimited string
    function formatListText(listText) {
        return listText.trim().replace(/\s*\n\s*/g, ' <b>»</b> ');
    }

    // replaces the side delimiter to its appropriate format
    function formatListPerSide(listText) {
        return '<b>A :</b> ' + listText
          .replace(' <b>»</b> |', '<br><b>B :</b> ');
    }

    return {
        init: function(selector, fields) {
            var root = document.querySelector(selector);

            // find controls
            var controls = root.querySelector('#controls');
            var inputs = findInputs(controls);

            // find preview template
            var previewTemplate = root.querySelector('.jcard-preview .template');
            var previewOutputs = findOutputs(previewTemplate);

            // create duplicate template to be shown only when printed
            var dupeContainer = root.querySelector('.jcard-duplicate');
            var dupeTemplate = previewTemplate.cloneNode(true);
            var dupeOutputs = findOutputs(dupeTemplate);
            dupeContainer.appendChild(dupeTemplate);

            // register listeners
            addOptionListeners(inputs, root);
            addJCardListeners(inputs, previewOutputs);
            addJCardListeners(inputs, dupeOutputs);

            // initialize inputs and templates
            populate(inputs, fields);
            update(inputs);
        }
    }
})();
