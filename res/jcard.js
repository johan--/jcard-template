/*
 * Interactive j-card template logic.
 *
 * Prettified at prettier.io
 */
var jcard = (function() {
  // finds input elements in the controls module
  function findInputs(controls) {
    let c = controls;
    return {
      backContentsAlignment: c.querySelector(
        "#controls-back-contents-alignment"
      ),
      backSize: c.querySelector("#controls-back-size"),
      bold: c.querySelector("#controls-bold"),
      cardColor: c.querySelector("#controls-card-color"),
      contentsSeparator: c.querySelector("#controls-contents-separator"),
      coverImage: c.querySelector("#controls-cover-image"),
      fillCover: c.querySelector("#controls-fill-cover"),
      fontFamily: c.querySelector("#controls-font-family"),
      footer: c.querySelector("#controls-footer"),
      footerAlignment: c.querySelector("#controls-footer-alignment"),
      footerSize: c.querySelector("#controls-footer-size"),
      forceCaps: c.querySelector("#controls-force-caps"),
      frontContentsAlignment: c.querySelector(
        "#controls-front-contents-alignment"
      ),
      frontContentsVisible: c.querySelector("#controls-front-contents-visible"),
      frontSize: c.querySelector("#controls-front-size"),
      frontTitleAlignment: c.querySelector("#controls-front-title-alignment"),
      frontTitleVisible: c.querySelector("#controls-front-title-visible"),
      italicize: c.querySelector("#controls-italicize"),
      loadFile: c.querySelector("#controls-load-file"),
      noteAlignment: c.querySelector("#controls-note-alignment"),
      noteLower: c.querySelector("#controls-note-lower"),
      noteSize: c.querySelector("#controls-note-size"),
      noteUpper: c.querySelector("#controls-note-upper"),
      print2: c.querySelector("#controls-print-2"),
      shortBack: c.querySelector("#controls-short-back"),
      sideAContents: c.querySelector("#controls-side-a-contents"),
      sideALabel: c.querySelector("#controls-side-a-label"),
      sideBContents: c.querySelector("#controls-side-b-contents"),
      sideBLabel: c.querySelector("#controls-side-b-label"),
      spineTitleAlignment: c.querySelector("#controls-spine-title-alignment"),
      spineTitleVisible: c.querySelector("#controls-spine-title-visible"),
      textColor: c.querySelector("#controls-text-color"),
      titleLower: c.querySelector("#controls-title-lower"),
      titleLowerSize: c.querySelector("#controls-title-lower-size"),
      titleUpper: c.querySelector("#controls-title-upper"),
      titleUpperSize: c.querySelector("#controls-title-upper-size")
    };
  }

  // finds output elements in the template module
  function findOutputs(template) {
    let t = template;
    return {
      root: t,
      back: t.querySelector(".template-back"),
      boundaries: t.querySelector(".template-boundaries"),
      contents: t.querySelector(".template-contents"),
      coverImage: t.querySelector(".template-cover-image"),
      footer: t.querySelector(".template-footer"),
      front: t.querySelector(".template-front"),
      frontTitleGroup: t.querySelector(".template-front-title-group"),
      frontTitleLower: t.querySelector(".template-front-title-lower"),
      frontTitleUpper: t.querySelector(".template-front-title-upper"),
      noteGroup: t.querySelector(".template-note-group"),
      noteLower: t.querySelector(".template-note-lower"),
      noteUpper: t.querySelector(".template-note-upper"),
      sideAContents: t.querySelector(".template-side-a-contents"),
      sideALabel: t.querySelector(".template-side-a-label"),
      sideBContents: t.querySelector(".template-side-b-contents"),
      sideBLabel: t.querySelector(".template-side-b-label"),
      spine: t.querySelector("template-spine"),
      spineTitleGroup: t.querySelector(".template-spine-title-group"),
      spineTitleLower: t.querySelector(".template-spine-title-lower"),
      spineTitleUpper: t.querySelector(".template-spine-title-upper")
    };
  }

  // finds action elements in the controls module
  function findActions(controls) {
    return {
      load: controls.querySelector("#controls-load"),
      save: controls.querySelector("#controls-save")
    };
  }

  // adds listeners to inputs that toggle option classes
  function addOptionListeners(inputs, root) {
    addToggleListener(inputs.print2, root, "print-2");
  }

  // adds listeners to inputs that update j-card outputs
  function addJCardListeners(inputs, outputs) {
    let i = inputs,
      o = outputs;
    addImageListener(i.coverImage, o.coverImage);
    addSideListener(
      [i.sideAContents, i.contentsSeparator, i.shortBack],
      o.sideAContents
    );
    addSideListener(
      [i.sideBContents, i.contentsSeparator, i.shortBack],
      o.sideBContents
    );
    addSizeListener(i.titleUpperSize, o.frontTitleUpper);
    addSizeListener(i.titleUpperSize, o.spineTitleUpper);
    addSizeListener(i.titleLowerSize, o.frontTitleLower);
    addSizeListener(i.titleLowerSize, o.frontTitleLower);
    addSizeListener(i.footerSize, o.footer);
    addSizeListener(i.noteSize, o.noteGroup);
    addSizeListener(i.frontSize, o.contents);
    addSizeListener(i.backSize, o.back);
    addStyleListener(i.cardColor, o.boundaries, "backgroundColor");
    addStyleListener(i.textColor, o.root, "color");
    addStyleListener(i.fontFamily, o.root, "fontFamily");
    addStyleListener(i.frontTitleAlignment, o.frontTitleGroup, "textAlign");
    addStyleListener(i.spineTitleAlignment, o.spineTitleGroup, "textAlign");
    addStyleListener(i.footerAlignment, o.footer, "textAlign");
    addStyleListener(i.noteAlignment, o.noteGroup, "textAlign");
    addStyleListener(i.frontContentsAlignment, o.contents, "textAlign");
    addStyleListener(i.backContentsAlignment, o.sideALabel, "textAlign");
    addStyleListener(i.backContentsAlignment, o.sideAContents, "textAlign");
    addStyleListener(i.backContentsAlignment, o.sideBLabel, "textAlign");
    addStyleListener(i.backContentsAlignment, o.sideBContents, "textAlign");
    addTextListener(i.titleUpper, o.frontTitleUpper);
    addTextListener(i.titleUpper, o.spineTitleUpper);
    addTextListener(i.titleLower, o.frontTitleLower);
    addTextListener(i.titleLower, o.spineTitleLower);
    addTextListener(i.footer, o.footer);
    addTextListener(i.noteUpper, o.noteUpper);
    addTextListener(i.noteLower, o.noteLower);
    addTextListener(i.sideALabel, o.sideALabel);
    addTextListener(i.sideBLabel, o.sideBLabel);
    addToggleListener(i.bold, o.root, "bold");
    addToggleListener(i.italicize, o.root, "italicize");
    addToggleListener(i.forceCaps, o.root, "force-caps");
    addToggleListener(i.shortBack, o.root, "short-back");
    addToggleListener(i.fillCover, o.coverImage, "fill");
    addToggleListener(i.frontTitleVisible, o.frontTitleGroup, "hidden", true);
    addToggleListener(i.spineTitleVisible, o.spineTitleGroup, "hidden", true);
    addToggleListener(i.frontContentsVisible, o.contents, "hidden", true);
    addTracksListener(
      [i.sideAContents, i.sideBContents, i.contentsSeparator],
      o.contents
    );
    addFrontTitleOnlyListener(i.frontContentsVisible, o.frontTitleGroup);
  }

  // populates inputs with field values or defaults
  function populate(inputs, fields) {
    let i = inputs,
      f = fields;
    i.bold.checked = f.bold !== undefined ? f.bold : false;
    i.italicize.checked = f.italicize !== undefined ? f.italicize : false;
    i.forceCaps.checked = f.forceCaps !== undefined ? f.forceCaps : true;
    i.fontFamily.value = f.fontFamily || "Alte Haas Grotesk";
    i.coverImage.value = f.coverImage || "";
    i.cardColor.value = f.cardColor || "#ffffff";
    i.textColor.value = f.textColor || "#000000";
    i.print2.checked = f.print2 !== undefined ? f.print2 : false;
    i.shortBack.checked = f.shortBack !== undefined ? f.shortBack : false;
    i.fillCover.checked = f.fillCover !== undefined ? f.fillCover : false;
    i.titleUpper.value = f.titleUpper || "";
    i.titleLower.value = f.titleLower || "";
    i.titleUpperSize.value = f.titleUpperSize || 12;
    i.titleLowerSize.value = f.titleLowerSize || 12;
    i.frontTitleAlignment.value = f.frontTitleAlignment || "center";
    i.spineTitleAlignment.value = f.spineTitleAlignment || "left";
    i.frontTitleVisible.checked =
      f.frontTitleVisible !== undefined ? f.frontTitleVisible : true;
    i.spineTitleVisible.checked =
      f.spineTitleVisible !== undefined ? f.spineTitleVisible : true;
    i.footer.value = f.footer || "";
    i.footerSize.value = f.footerSize || 10;
    i.footerAlignment.value = f.footerAlignment || "center";
    i.noteUpper.value = f.noteUpper || "";
    i.noteLower.value = f.noteLower || "";
    i.noteSize.value = f.noteSize || 10;
    i.noteAlignment.value = f.noteAlignment || "right";
    i.sideALabel.value = f.sideALabel || "Side A";
    i.sideAContents.value = f.sideAContents || "";
    i.sideBLabel.value = f.sideBLabel || "Side B";
    i.sideBContents.value = f.sideBContents || "";
    i.frontSize.value = f.frontSize || 9;
    i.backSize.value = f.backSize || 8;
    i.contentsSeparator.value = f.contentsSeparator || "&nbsp;• ";
    i.frontContentsAlignment.value = f.frontContentsAlignment || "left";
    i.backContentsAlignment.value = f.backContentsAlignment || "left";
    i.frontContentsVisible.checked =
      f.frontContentsVisible !== undefined ? f.frontContentsVisible : true;
  }

  // triggers listener calls on all input fields
  function update(inputs) {
    for (name in inputs) {
      let input = inputs[name];
      let event = document.createEvent("Event");
      if (input.type === "checkbox" || input.type === "file")
        event.initEvent("change", true, true);
      else event.initEvent("input", true, true);
      input.dispatchEvent(event);
    }
  }

  // copies an input value to an output innerHTML on input change
  function addTextListener(input, output) {
    input.addEventListener("input", function(event) {
      output.innerHTML = input.value.replace(/\s*\n\s*/g, "<br>");
    });
  }

  // toggles a class on an output element when an input is checked
  function addToggleListener(input, output, toggleClass, invert) {
    input.addEventListener("change", function(event) {
      if ((!input.checked && invert) || (input.checked && !invert))
        output.classList.add(toggleClass);
      else output.classList.remove(toggleClass);
    });
  }

  // sets an output element font size to the input value on change
  function addSizeListener(input, output) {
    input.addEventListener("input", function(event) {
      output.style.fontSize = input.value + "pt";
    });
  }

  // sets an output element style property to the input value on change
  function addStyleListener(input, output, property) {
    input.addEventListener("input", function(event) {
      output.style[property] = input.value;
    });
  }

  // sets the src property of an image when a file is selected
  function addImageListener(input, output) {
    input.addEventListener("change", function(event) {
      let file = input.files[0];
      if (file) output.src = URL.createObjectURL(file);
    });
  }

  function addSideListener(inputs, output) {
    let label = inputs[0].previousElementSibling,
      tracks = inputs[0],
      separator = inputs[1],
      shortBack = inputs[2],
      f = function(event) {
        if (!tracks.value && !label.value) output.innerHTML = "";
        else if (shortBack.checked)
          output.innerHTML =
            "<b>" +
            label.value +
            ":&nbsp;&nbsp;</b>" +
            formatListText(tracks.value, separator.value);
        else output.innerHTML = formatListText(tracks.value, separator.value);
      };
    tracks.addEventListener("input", f);
    label.addEventListener("input", f);
    // TODO: the following must be run only once, but
    separator.addEventListener("input", f);
    shortBack.addEventListener("input", f);
  }

  // combine and format input lists and set output innerHTML on any input change
  function addTracksListener(inputs, output) {
    inputs.forEach(function(input) {
      input.addEventListener("input", function(event) {
        let rawSides = [inputs[0], inputs[1]].map(function(input) {
          return input.value;
        });
        let rawTracks = formatList(rawSides);
        output.innerHTML = formatListText(rawTracks, inputs[2].value);
      });
    });
  }

  function addFrontTitleOnlyListener(input, output) {
    input.addEventListener("change", function(event) {
      if (!input.checked) output.style["margin-top"] = "0.4in";
      else output.style["margin-top"] = "unset";
    });
  }

  // performs the appropriate serialization task on action input click
  function addSerializationListeners(actions, inputs) {
    let i = inputs;
    actions.save.addEventListener("click", function(event) {
      let data = {
        bold: i.bold.checked,
        italicize: i.italicize.checked,
        forceCaps: i.forceCaps.checked,
        fontFamily: i.fontFamily.value,
        //coverImage: i.coverImage.value,
        cardColor: i.cardColor.value,
        textColor: i.textColor.value,
        print2: i.print2.checked,
        shortBack: i.shortBack.checked,
        fillCover: i.fillCover.checked,
        titleUpper: i.titleUpper.value,
        titleLower: i.titleLower.value,
        titleUpperSize: i.titleUpperSize.value,
        titleLowerSize: i.titleLowerSize.value,
        frontTitleAlignment: i.frontTitleAlignment.value,
        spineTitleAlignment: i.spineTitleAlignment.value,
        frontTitleVisible: i.frontTitleVisible.checked,
        spineTitleVisible: i.spineTitleVisible.checked,
        footer: i.footer.value,
        footerSize: i.footerSize.value,
        footerAlignment: i.footerAlignment.value,
        noteUpper: i.noteUpper.value,
        noteLower: i.noteLower.value,
        noteSize: i.noteSize.value,
        noteAlignment: i.noteAlignment.value,
        sideALabel: i.sideALabel.value,
        sideAContents: i.sideAContents.value,
        sideBLabel: i.sideBLabel.value,
        sideBContents: i.sideBContents.value,
        frontSize: i.frontSize.value,
        backSize: i.backSize.value,
        contentsSeparator: i.contentsSeparator.value,
        frontContentsAlignment: i.frontContentsAlignment.value,
        backContentsAlignment: i.backContentsAlignment.value,
        frontContentsVisible: i.frontContentsVisible.checked
      };
      let element = document.createElement("a");
      element.href =
        "data:application/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(data));
      let filename;
      if (data.titleUpper) filename = data.titleUpper;
      else if (data.titleLower) filename = data.titleLower;
      else filename = "Unnamed J-Card";
      element.download = filename + ".jcard.json";
      element.hidden = true;
      document.body.append(element);
      element.click();
      document.body.removeChild(element);
    });
    actions.load.addEventListener("click", function(event) {
      let reader = new FileReader();
      let files = i.loadFile.files;
      if (files.length === 0) {
        alert("Nothing to load.");
        return;
      }
      reader.onload = event => {
        try {
          let data = JSON.parse(event.target.result);
          populate(i, data);
          update(i, data);
        } catch (error) {
          alert("[Load Failed]\n\n" + error.name + ": " + error.message);
        }
      };
      reader.readAsText(files[0]);
    });
  }

  // converts a list to a newline delimited string
  function formatList(list) {
    return list.join("\n");
  }

  // converts a newline delimited string to a separator delimited string
  function formatListText(listText, separator) {
    return listText.trim().replace(/\s*\n\s*/g, separator);
  }

  return {
    init: function(selector, fields) {
      let root = document.querySelector(selector);

      // find controls
      let controls = root.querySelector("#controls");
      let inputs = findInputs(controls);
      let actions = findActions(controls);

      // find preview template
      let previewTemplate = root.querySelector(".jcard-preview .template");
      let previewOutputs = findOutputs(previewTemplate);

      // create duplicate template to be shown only when printed
      let dupeContainer = root.querySelector(".jcard-duplicate");
      let dupeTemplate = previewTemplate.cloneNode(true);
      let dupeOutputs = findOutputs(dupeTemplate);
      dupeContainer.appendChild(dupeTemplate);

      // register listeners
      addOptionListeners(inputs, root);
      addJCardListeners(inputs, previewOutputs);
      addJCardListeners(inputs, dupeOutputs);
      addSerializationListeners(actions, inputs);

      // initialize inputs and templates
      populate(inputs, fields);
      update(inputs);
    }
  };
})();

jcard.init("#jcard", {
  titleUpper: "The Numbers Game",
  titleLower: "Dark Mathematicians",
  footer: "Stereo Tape",
  noteUpper: "Recorded",
  noteLower: "August 2017",
  sideALabel: "Side A",
  sideAContents: "One of Us\nTwo is the Shoe\nThree for Me\nFour Out the Door",
  sideBLabel: "Side B",
  sideBContents:
    "Five is a Hive\nSix Movie Flicks\nSeven Ate Nine\nEight My Good Mate"
});
