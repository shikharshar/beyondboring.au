import {
  asciiAlpha,
  asciiAlphanumeric,
  asciiControl,
  blankLine,
  classifyCharacter,
  codes,
  combineExtensions,
  constants,
  factorySpace,
  markdownLineEnding,
  markdownLineEndingOrSpace,
  markdownSpace,
  normalizeIdentifier,
  resolveAll,
  splice,
  toString,
  types,
  unicodePunctuation,
  unicodeWhitespace
} from "./chunk-EKYTZKNY.js";
import {
  EXIT,
  convert,
  ok,
  visit,
  visitParents
} from "./chunk-GJRDPSFK.js";
import "./chunk-2TUXWMP5.js";

// node_modules/ccount/index.js
function ccount(value, character) {
  const source = String(value);
  if (typeof character !== "string") {
    throw new TypeError("Expected character");
  }
  let count = 0;
  let index = source.indexOf(character);
  while (index !== -1) {
    count++;
    index = source.indexOf(character, index + character.length);
  }
  return count;
}

// node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// node_modules/mdast-util-find-and-replace/lib/index.js
function findAndReplace(tree, list2, options) {
  const settings = options || {};
  const ignored = convert(settings.ignore || []);
  const pairs = toPairs(list2);
  let pairIndex = -1;
  while (++pairIndex < pairs.length) {
    visitParents(tree, "text", visitor);
  }
  function visitor(node, parents) {
    let index = -1;
    let grandparent;
    while (++index < parents.length) {
      const parent = parents[index];
      const siblings = grandparent ? grandparent.children : void 0;
      if (ignored(
        parent,
        siblings ? siblings.indexOf(parent) : void 0,
        grandparent
      )) {
        return;
      }
      grandparent = parent;
    }
    if (grandparent) {
      return handler(node, parents);
    }
  }
  function handler(node, parents) {
    const parent = parents[parents.length - 1];
    const find = pairs[pairIndex][0];
    const replace2 = pairs[pairIndex][1];
    let start = 0;
    const siblings = parent.children;
    const index = siblings.indexOf(node);
    let change = false;
    let nodes = [];
    find.lastIndex = 0;
    let match = find.exec(node.value);
    while (match) {
      const position = match.index;
      const matchObject = {
        index: match.index,
        input: match.input,
        stack: [...parents, node]
      };
      let value = replace2(...match, matchObject);
      if (typeof value === "string") {
        value = value.length > 0 ? { type: "text", value } : void 0;
      }
      if (value === false) {
        find.lastIndex = position + 1;
      } else {
        if (start !== position) {
          nodes.push({
            type: "text",
            value: node.value.slice(start, position)
          });
        }
        if (Array.isArray(value)) {
          nodes.push(...value);
        } else if (value) {
          nodes.push(value);
        }
        start = position + match[0].length;
        change = true;
      }
      if (!find.global) {
        break;
      }
      match = find.exec(node.value);
    }
    if (change) {
      if (start < node.value.length) {
        nodes.push({ type: "text", value: node.value.slice(start) });
      }
      parent.children.splice(index, 1, ...nodes);
    } else {
      nodes = [node];
    }
    return index + nodes.length;
  }
}
function toPairs(tupleOrList) {
  const result = [];
  if (!Array.isArray(tupleOrList)) {
    throw new TypeError("Expected find and replace tuple or list of tuples");
  }
  const list2 = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [tupleOrList];
  let index = -1;
  while (++index < list2.length) {
    const tuple = list2[index];
    result.push([toExpression(tuple[0]), toFunction(tuple[1])]);
  }
  return result;
}
function toExpression(find) {
  return typeof find === "string" ? new RegExp(escapeStringRegexp(find), "g") : find;
}
function toFunction(replace2) {
  return typeof replace2 === "function" ? replace2 : function() {
    return replace2;
  };
}

// node_modules/mdast-util-gfm-autolink-literal/lib/index.js
var inConstruct = "phrasing";
var notInConstruct = ["autolink", "link", "image", "label"];
function gfmAutolinkLiteralFromMarkdown() {
  return {
    transforms: [transformGfmAutolinkLiterals],
    enter: {
      literalAutolink: enterLiteralAutolink,
      literalAutolinkEmail: enterLiteralAutolinkValue,
      literalAutolinkHttp: enterLiteralAutolinkValue,
      literalAutolinkWww: enterLiteralAutolinkValue
    },
    exit: {
      literalAutolink: exitLiteralAutolink,
      literalAutolinkEmail: exitLiteralAutolinkEmail,
      literalAutolinkHttp: exitLiteralAutolinkHttp,
      literalAutolinkWww: exitLiteralAutolinkWww
    }
  };
}
function gfmAutolinkLiteralToMarkdown() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct,
        notInConstruct
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct,
        notInConstruct
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct,
        notInConstruct
      }
    ]
  };
}
function enterLiteralAutolink(token) {
  this.enter({ type: "link", title: null, url: "", children: [] }, token);
}
function enterLiteralAutolinkValue(token) {
  this.config.enter.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkHttp(token) {
  this.config.exit.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkWww(token) {
  this.config.exit.data.call(this, token);
  const node = this.stack[this.stack.length - 1];
  ok(node.type === "link");
  node.url = "http://" + this.sliceSerialize(token);
}
function exitLiteralAutolinkEmail(token) {
  this.config.exit.autolinkEmail.call(this, token);
}
function exitLiteralAutolink(token) {
  this.exit(token);
}
function transformGfmAutolinkLiterals(tree) {
  findAndReplace(
    tree,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), findEmail]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function findUrl(_, protocol, domain2, path2, match) {
  let prefix = "";
  if (!previous(match)) {
    return false;
  }
  if (/^w/i.test(protocol)) {
    domain2 = protocol + domain2;
    protocol = "";
    prefix = "http://";
  }
  if (!isCorrectDomain(domain2)) {
    return false;
  }
  const parts = splitUrl(domain2 + path2);
  if (!parts[0]) return false;
  const result = {
    type: "link",
    title: null,
    url: prefix + protocol + parts[0],
    children: [{ type: "text", value: protocol + parts[0] }]
  };
  if (parts[1]) {
    return [result, { type: "text", value: parts[1] }];
  }
  return result;
}
function findEmail(_, atext, label, match) {
  if (
    // Not an expected previous character.
    !previous(match, true) || // Label ends in not allowed character.
    /[-\d_]$/.test(label)
  ) {
    return false;
  }
  return {
    type: "link",
    title: null,
    url: "mailto:" + atext + "@" + label,
    children: [{ type: "text", value: atext + "@" + label }]
  };
}
function isCorrectDomain(domain2) {
  const parts = domain2.split(".");
  if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
    return false;
  }
  return true;
}
function splitUrl(url) {
  const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
  if (!trailExec) {
    return [url, void 0];
  }
  url = url.slice(0, trailExec.index);
  let trail2 = trailExec[0];
  let closingParenIndex = trail2.indexOf(")");
  const openingParens = ccount(url, "(");
  let closingParens = ccount(url, ")");
  while (closingParenIndex !== -1 && openingParens > closingParens) {
    url += trail2.slice(0, closingParenIndex + 1);
    trail2 = trail2.slice(closingParenIndex + 1);
    closingParenIndex = trail2.indexOf(")");
    closingParens++;
  }
  return [url, trail2];
}
function previous(match, email) {
  const code3 = match.input.charCodeAt(match.index - 1);
  return (match.index === 0 || unicodeWhitespace(code3) || unicodePunctuation(code3)) && // If it’s an email, the previous character should not be a slash.
  (!email || code3 !== 47);
}

// node_modules/mdast-util-gfm-footnote/lib/index.js
footnoteReference.peek = footnoteReferencePeek;
function enterFootnoteCallString() {
  this.buffer();
}
function enterFootnoteCall(token) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, token);
}
function enterFootnoteDefinitionLabelString() {
  this.buffer();
}
function enterFootnoteDefinition(token) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    token
  );
}
function exitFootnoteCallString(token) {
  const label = this.resume();
  const node = this.stack[this.stack.length - 1];
  ok(node.type === "footnoteReference");
  node.identifier = normalizeIdentifier(
    this.sliceSerialize(token)
  ).toLowerCase();
  node.label = label;
}
function exitFootnoteCall(token) {
  this.exit(token);
}
function exitFootnoteDefinitionLabelString(token) {
  const label = this.resume();
  const node = this.stack[this.stack.length - 1];
  ok(node.type === "footnoteDefinition");
  node.identifier = normalizeIdentifier(
    this.sliceSerialize(token)
  ).toLowerCase();
  node.label = label;
}
function exitFootnoteDefinition(token) {
  this.exit(token);
}
function footnoteReferencePeek() {
  return "[";
}
function footnoteReference(node, _, state, info) {
  const tracker = state.createTracker(info);
  let value = tracker.move("[^");
  const exit2 = state.enter("footnoteReference");
  const subexit = state.enter("reference");
  value += tracker.move(
    state.safe(state.associationId(node), { after: "]", before: value })
  );
  subexit();
  exit2();
  value += tracker.move("]");
  return value;
}
function gfmFootnoteFromMarkdown() {
  return {
    enter: {
      gfmFootnoteCallString: enterFootnoteCallString,
      gfmFootnoteCall: enterFootnoteCall,
      gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
      gfmFootnoteDefinition: enterFootnoteDefinition
    },
    exit: {
      gfmFootnoteCallString: exitFootnoteCallString,
      gfmFootnoteCall: exitFootnoteCall,
      gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
      gfmFootnoteDefinition: exitFootnoteDefinition
    }
  };
}
function gfmFootnoteToMarkdown(options) {
  let firstLineBlank = false;
  if (options && options.firstLineBlank) {
    firstLineBlank = true;
  }
  return {
    handlers: { footnoteDefinition, footnoteReference },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function footnoteDefinition(node, _, state, info) {
    const tracker = state.createTracker(info);
    let value = tracker.move("[^");
    const exit2 = state.enter("footnoteDefinition");
    const subexit = state.enter("label");
    value += tracker.move(
      state.safe(state.associationId(node), { before: value, after: "]" })
    );
    subexit();
    value += tracker.move("]:");
    if (node.children && node.children.length > 0) {
      tracker.shift(4);
      value += tracker.move(
        (firstLineBlank ? "\n" : " ") + state.indentLines(
          state.containerFlow(node, tracker.current()),
          firstLineBlank ? mapAll : mapExceptFirst
        )
      );
    }
    exit2();
    return value;
  }
}
function mapExceptFirst(line, index, blank) {
  return index === 0 ? line : mapAll(line, index, blank);
}
function mapAll(line, index, blank) {
  return (blank ? "" : "    ") + line;
}

// node_modules/mdast-util-gfm-strikethrough/lib/index.js
var constructsWithoutStrikethrough = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
handleDelete.peek = peekDelete;
function gfmStrikethroughFromMarkdown() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: enterStrikethrough },
    exit: { strikethrough: exitStrikethrough }
  };
}
function gfmStrikethroughToMarkdown() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: constructsWithoutStrikethrough
      }
    ],
    handlers: { delete: handleDelete }
  };
}
function enterStrikethrough(token) {
  this.enter({ type: "delete", children: [] }, token);
}
function exitStrikethrough(token) {
  this.exit(token);
}
function handleDelete(node, _, state, info) {
  const tracker = state.createTracker(info);
  const exit2 = state.enter("strikethrough");
  let value = tracker.move("~~");
  value += state.containerPhrasing(node, {
    ...tracker.current(),
    before: value,
    after: "~"
  });
  value += tracker.move("~~");
  exit2();
  return value;
}
function peekDelete() {
  return "~";
}

// node_modules/markdown-table/index.js
function defaultStringLength(value) {
  return value.length;
}
function markdownTable(table, options) {
  const settings = options || {};
  const align = (settings.align || []).concat();
  const stringLength = settings.stringLength || defaultStringLength;
  const alignments = [];
  const cellMatrix = [];
  const sizeMatrix = [];
  const longestCellByColumn = [];
  let mostCellsPerRow = 0;
  let rowIndex = -1;
  while (++rowIndex < table.length) {
    const row2 = [];
    const sizes2 = [];
    let columnIndex2 = -1;
    if (table[rowIndex].length > mostCellsPerRow) {
      mostCellsPerRow = table[rowIndex].length;
    }
    while (++columnIndex2 < table[rowIndex].length) {
      const cell = serialize(table[rowIndex][columnIndex2]);
      if (settings.alignDelimiters !== false) {
        const size = stringLength(cell);
        sizes2[columnIndex2] = size;
        if (longestCellByColumn[columnIndex2] === void 0 || size > longestCellByColumn[columnIndex2]) {
          longestCellByColumn[columnIndex2] = size;
        }
      }
      row2.push(cell);
    }
    cellMatrix[rowIndex] = row2;
    sizeMatrix[rowIndex] = sizes2;
  }
  let columnIndex = -1;
  if (typeof align === "object" && "length" in align) {
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = toAlignment(align[columnIndex]);
    }
  } else {
    const code3 = toAlignment(align);
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = code3;
    }
  }
  columnIndex = -1;
  const row = [];
  const sizes = [];
  while (++columnIndex < mostCellsPerRow) {
    const code3 = alignments[columnIndex];
    let before = "";
    let after = "";
    if (code3 === 99) {
      before = ":";
      after = ":";
    } else if (code3 === 108) {
      before = ":";
    } else if (code3 === 114) {
      after = ":";
    }
    let size = settings.alignDelimiters === false ? 1 : Math.max(
      1,
      longestCellByColumn[columnIndex] - before.length - after.length
    );
    const cell = before + "-".repeat(size) + after;
    if (settings.alignDelimiters !== false) {
      size = before.length + size + after.length;
      if (size > longestCellByColumn[columnIndex]) {
        longestCellByColumn[columnIndex] = size;
      }
      sizes[columnIndex] = size;
    }
    row[columnIndex] = cell;
  }
  cellMatrix.splice(1, 0, row);
  sizeMatrix.splice(1, 0, sizes);
  rowIndex = -1;
  const lines = [];
  while (++rowIndex < cellMatrix.length) {
    const row2 = cellMatrix[rowIndex];
    const sizes2 = sizeMatrix[rowIndex];
    columnIndex = -1;
    const line = [];
    while (++columnIndex < mostCellsPerRow) {
      const cell = row2[columnIndex] || "";
      let before = "";
      let after = "";
      if (settings.alignDelimiters !== false) {
        const size = longestCellByColumn[columnIndex] - (sizes2[columnIndex] || 0);
        const code3 = alignments[columnIndex];
        if (code3 === 114) {
          before = " ".repeat(size);
        } else if (code3 === 99) {
          if (size % 2) {
            before = " ".repeat(size / 2 + 0.5);
            after = " ".repeat(size / 2 - 0.5);
          } else {
            before = " ".repeat(size / 2);
            after = before;
          }
        } else {
          after = " ".repeat(size);
        }
      }
      if (settings.delimiterStart !== false && !columnIndex) {
        line.push("|");
      }
      if (settings.padding !== false && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(settings.alignDelimiters === false && cell === "") && (settings.delimiterStart !== false || columnIndex)) {
        line.push(" ");
      }
      if (settings.alignDelimiters !== false) {
        line.push(before);
      }
      line.push(cell);
      if (settings.alignDelimiters !== false) {
        line.push(after);
      }
      if (settings.padding !== false) {
        line.push(" ");
      }
      if (settings.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) {
        line.push("|");
      }
    }
    lines.push(
      settings.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join("")
    );
  }
  return lines.join("\n");
}
function serialize(value) {
  return value === null || value === void 0 ? "" : String(value);
}
function toAlignment(value) {
  const code3 = typeof value === "string" ? value.codePointAt(0) : 0;
  return code3 === 67 || code3 === 99 ? 99 : code3 === 76 || code3 === 108 ? 108 : code3 === 82 || code3 === 114 ? 114 : 0;
}

// node_modules/zwitch/index.js
var own = {}.hasOwnProperty;

// node_modules/mdast-util-to-markdown/lib/configure.js
var own2 = {}.hasOwnProperty;

// node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
function blockquote(node, _, state, info) {
  const exit2 = state.enter("blockquote");
  const tracker = state.createTracker(info);
  tracker.move("> ");
  tracker.shift(2);
  const value = state.indentLines(
    state.containerFlow(node, tracker.current()),
    map
  );
  exit2();
  return value;
}
function map(line, _, blank) {
  return ">" + (blank ? "" : " ") + line;
}

// node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
function patternInScope(stack, pattern) {
  return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
}
function listInScope(stack, list2, none) {
  if (typeof list2 === "string") {
    list2 = [list2];
  }
  if (!list2 || list2.length === 0) {
    return none;
  }
  let index = -1;
  while (++index < list2.length) {
    if (stack.includes(list2[index])) {
      return true;
    }
  }
  return false;
}

// node_modules/mdast-util-to-markdown/lib/handle/break.js
function hardBreak(_, _1, state, info) {
  let index = -1;
  while (++index < state.unsafe.length) {
    if (state.unsafe[index].character === "\n" && patternInScope(state.stack, state.unsafe[index])) {
      return /[ \t]/.test(info.before) ? "" : " ";
    }
  }
  return "\\\n";
}

// node_modules/longest-streak/index.js
function longestStreak(value, substring) {
  const source = String(value);
  let index = source.indexOf(substring);
  let expected = index;
  let count = 0;
  let max = 0;
  if (typeof substring !== "string") {
    throw new TypeError("Expected substring");
  }
  while (index !== -1) {
    if (index === expected) {
      if (++count > max) {
        max = count;
      }
    } else {
      count = 1;
    }
    expected = index + substring.length;
    index = source.indexOf(substring, expected);
  }
  return max;
}

// node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
function formatCodeAsIndented(node, state) {
  return Boolean(
    state.options.fences === false && node.value && // If there’s no info…
    !node.lang && // And there’s a non-whitespace character…
    /[^ \r\n]/.test(node.value) && // And the value doesn’t start or end in a blank…
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node.value)
  );
}

// node_modules/mdast-util-to-markdown/lib/util/check-fence.js
function checkFence(state) {
  const marker = state.options.fence || "`";
  if (marker !== "`" && marker !== "~") {
    throw new Error(
      "Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/handle/code.js
function code(node, _, state, info) {
  const marker = checkFence(state);
  const raw = node.value || "";
  const suffix = marker === "`" ? "GraveAccent" : "Tilde";
  if (formatCodeAsIndented(node, state)) {
    const exit3 = state.enter("codeIndented");
    const value2 = state.indentLines(raw, map2);
    exit3();
    return value2;
  }
  const tracker = state.createTracker(info);
  const sequence = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
  const exit2 = state.enter("codeFenced");
  let value = tracker.move(sequence);
  if (node.lang) {
    const subexit = state.enter(`codeFencedLang${suffix}`);
    value += tracker.move(
      state.safe(node.lang, {
        before: value,
        after: " ",
        encode: ["`"],
        ...tracker.current()
      })
    );
    subexit();
  }
  if (node.lang && node.meta) {
    const subexit = state.enter(`codeFencedMeta${suffix}`);
    value += tracker.move(" ");
    value += tracker.move(
      state.safe(node.meta, {
        before: value,
        after: "\n",
        encode: ["`"],
        ...tracker.current()
      })
    );
    subexit();
  }
  value += tracker.move("\n");
  if (raw) {
    value += tracker.move(raw + "\n");
  }
  value += tracker.move(sequence);
  exit2();
  return value;
}
function map2(line, _, blank) {
  return (blank ? "" : "    ") + line;
}

// node_modules/mdast-util-to-markdown/lib/util/check-quote.js
function checkQuote(state) {
  const marker = state.options.quote || '"';
  if (marker !== '"' && marker !== "'") {
    throw new Error(
      "Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/handle/definition.js
function definition(node, _, state, info) {
  const quote = checkQuote(state);
  const suffix = quote === '"' ? "Quote" : "Apostrophe";
  const exit2 = state.enter("definition");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value = tracker.move("[");
  value += tracker.move(
    state.safe(state.associationId(node), {
      before: value,
      after: "]",
      ...tracker.current()
    })
  );
  value += tracker.move("]: ");
  subexit();
  if (
    // If there’s no url, or…
    !node.url || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node.url)
  ) {
    subexit = state.enter("destinationLiteral");
    value += tracker.move("<");
    value += tracker.move(
      state.safe(node.url, { before: value, after: ">", ...tracker.current() })
    );
    value += tracker.move(">");
  } else {
    subexit = state.enter("destinationRaw");
    value += tracker.move(
      state.safe(node.url, {
        before: value,
        after: node.title ? " " : "\n",
        ...tracker.current()
      })
    );
  }
  subexit();
  if (node.title) {
    subexit = state.enter(`title${suffix}`);
    value += tracker.move(" " + quote);
    value += tracker.move(
      state.safe(node.title, {
        before: value,
        after: quote,
        ...tracker.current()
      })
    );
    value += tracker.move(quote);
    subexit();
  }
  exit2();
  return value;
}

// node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
function checkEmphasis(state) {
  const marker = state.options.emphasis || "*";
  if (marker !== "*" && marker !== "_") {
    throw new Error(
      "Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
function encodeCharacterReference(code3) {
  return "&#x" + code3.toString(16).toUpperCase() + ";";
}

// node_modules/mdast-util-to-markdown/lib/util/encode-info.js
function encodeInfo(outside, inside, marker) {
  const outsideKind = classifyCharacter(outside);
  const insideKind = classifyCharacter(inside);
  if (outsideKind === void 0) {
    return insideKind === void 0 ? (
      // Letter inside:
      // we have to encode *both* letters for `_` as it is looser.
      // it already forms for `*` (and GFMs `~`).
      marker === "_" ? { inside: true, outside: true } : { inside: false, outside: false }
    ) : insideKind === 1 ? (
      // Whitespace inside: encode both (letter, whitespace).
      { inside: true, outside: true }
    ) : (
      // Punctuation inside: encode outer (letter)
      { inside: false, outside: true }
    );
  }
  if (outsideKind === 1) {
    return insideKind === void 0 ? (
      // Letter inside: already forms.
      { inside: false, outside: false }
    ) : insideKind === 1 ? (
      // Whitespace inside: encode both (whitespace).
      { inside: true, outside: true }
    ) : (
      // Punctuation inside: already forms.
      { inside: false, outside: false }
    );
  }
  return insideKind === void 0 ? (
    // Letter inside: already forms.
    { inside: false, outside: false }
  ) : insideKind === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: true, outside: false }
  ) : (
    // Punctuation inside: already forms.
    { inside: false, outside: false }
  );
}

// node_modules/mdast-util-to-markdown/lib/handle/emphasis.js
emphasis.peek = emphasisPeek;
function emphasis(node, _, state, info) {
  const marker = checkEmphasis(state);
  const exit2 = state.enter("emphasis");
  const tracker = state.createTracker(info);
  const before = tracker.move(marker);
  let between = tracker.move(
    state.containerPhrasing(node, {
      after: marker,
      before,
      ...tracker.current()
    })
  );
  const betweenHead = between.charCodeAt(0);
  const open = encodeInfo(
    info.before.charCodeAt(info.before.length - 1),
    betweenHead,
    marker
  );
  if (open.inside) {
    between = encodeCharacterReference(betweenHead) + between.slice(1);
  }
  const betweenTail = between.charCodeAt(between.length - 1);
  const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
  if (close.inside) {
    between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
  }
  const after = tracker.move(marker);
  exit2();
  state.attentionEncodeSurroundingInfo = {
    after: close.outside,
    before: open.outside
  };
  return before + between + after;
}
function emphasisPeek(_, _1, state) {
  return state.options.emphasis || "*";
}

// node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
function formatHeadingAsSetext(node, state) {
  let literalWithBreak = false;
  visit(node, function(node2) {
    if ("value" in node2 && /\r?\n|\r/.test(node2.value) || node2.type === "break") {
      literalWithBreak = true;
      return EXIT;
    }
  });
  return Boolean(
    (!node.depth || node.depth < 3) && toString(node) && (state.options.setext || literalWithBreak)
  );
}

// node_modules/mdast-util-to-markdown/lib/handle/heading.js
function heading(node, _, state, info) {
  const rank = Math.max(Math.min(6, node.depth || 1), 1);
  const tracker = state.createTracker(info);
  if (formatHeadingAsSetext(node, state)) {
    const exit3 = state.enter("headingSetext");
    const subexit2 = state.enter("phrasing");
    const value2 = state.containerPhrasing(node, {
      ...tracker.current(),
      before: "\n",
      after: "\n"
    });
    subexit2();
    exit3();
    return value2 + "\n" + (rank === 1 ? "=" : "-").repeat(
      // The whole size…
      value2.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(value2.lastIndexOf("\r"), value2.lastIndexOf("\n")) + 1)
    );
  }
  const sequence = "#".repeat(rank);
  const exit2 = state.enter("headingAtx");
  const subexit = state.enter("phrasing");
  tracker.move(sequence + " ");
  let value = state.containerPhrasing(node, {
    before: "# ",
    after: "\n",
    ...tracker.current()
  });
  if (/^[\t ]/.test(value)) {
    value = encodeCharacterReference(value.charCodeAt(0)) + value.slice(1);
  }
  value = value ? sequence + " " + value : sequence;
  if (state.options.closeAtx) {
    value += " " + sequence;
  }
  subexit();
  exit2();
  return value;
}

// node_modules/mdast-util-to-markdown/lib/handle/html.js
html.peek = htmlPeek;
function html(node) {
  return node.value || "";
}
function htmlPeek() {
  return "<";
}

// node_modules/mdast-util-to-markdown/lib/handle/image.js
image.peek = imagePeek;
function image(node, _, state, info) {
  const quote = checkQuote(state);
  const suffix = quote === '"' ? "Quote" : "Apostrophe";
  const exit2 = state.enter("image");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value = tracker.move("![");
  value += tracker.move(
    state.safe(node.alt, { before: value, after: "]", ...tracker.current() })
  );
  value += tracker.move("](");
  subexit();
  if (
    // If there’s no url but there is a title…
    !node.url && node.title || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node.url)
  ) {
    subexit = state.enter("destinationLiteral");
    value += tracker.move("<");
    value += tracker.move(
      state.safe(node.url, { before: value, after: ">", ...tracker.current() })
    );
    value += tracker.move(">");
  } else {
    subexit = state.enter("destinationRaw");
    value += tracker.move(
      state.safe(node.url, {
        before: value,
        after: node.title ? " " : ")",
        ...tracker.current()
      })
    );
  }
  subexit();
  if (node.title) {
    subexit = state.enter(`title${suffix}`);
    value += tracker.move(" " + quote);
    value += tracker.move(
      state.safe(node.title, {
        before: value,
        after: quote,
        ...tracker.current()
      })
    );
    value += tracker.move(quote);
    subexit();
  }
  value += tracker.move(")");
  exit2();
  return value;
}
function imagePeek() {
  return "!";
}

// node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
imageReference.peek = imageReferencePeek;
function imageReference(node, _, state, info) {
  const type = node.referenceType;
  const exit2 = state.enter("imageReference");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value = tracker.move("![");
  const alt = state.safe(node.alt, {
    before: value,
    after: "]",
    ...tracker.current()
  });
  value += tracker.move(alt + "][");
  subexit();
  const stack = state.stack;
  state.stack = [];
  subexit = state.enter("reference");
  const reference = state.safe(state.associationId(node), {
    before: value,
    after: "]",
    ...tracker.current()
  });
  subexit();
  state.stack = stack;
  exit2();
  if (type === "full" || !alt || alt !== reference) {
    value += tracker.move(reference + "]");
  } else if (type === "shortcut") {
    value = value.slice(0, -1);
  } else {
    value += tracker.move("]");
  }
  return value;
}
function imageReferencePeek() {
  return "!";
}

// node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
inlineCode.peek = inlineCodePeek;
function inlineCode(node, _, state) {
  let value = node.value || "";
  let sequence = "`";
  let index = -1;
  while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value)) {
    sequence += "`";
  }
  if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) {
    value = " " + value + " ";
  }
  while (++index < state.unsafe.length) {
    const pattern = state.unsafe[index];
    const expression = state.compilePattern(pattern);
    let match;
    if (!pattern.atBreak) continue;
    while (match = expression.exec(value)) {
      let position = match.index;
      if (value.charCodeAt(position) === 10 && value.charCodeAt(position - 1) === 13) {
        position--;
      }
      value = value.slice(0, position) + " " + value.slice(match.index + 1);
    }
  }
  return sequence + value + sequence;
}
function inlineCodePeek() {
  return "`";
}

// node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
function formatLinkAsAutolink(node, state) {
  const raw = toString(node);
  return Boolean(
    !state.options.resourceLink && // If there’s a url…
    node.url && // And there’s a no title…
    !node.title && // And the content of `node` is a single text node…
    node.children && node.children.length === 1 && node.children[0].type === "text" && // And if the url is the same as the content…
    (raw === node.url || "mailto:" + raw === node.url) && // And that starts w/ a protocol…
    /^[a-z][a-z+.-]+:/i.test(node.url) && // And that doesn’t contain ASCII control codes (character escapes and
    // references don’t work), space, or angle brackets…
    !/[\0- <>\u007F]/.test(node.url)
  );
}

// node_modules/mdast-util-to-markdown/lib/handle/link.js
link.peek = linkPeek;
function link(node, _, state, info) {
  const quote = checkQuote(state);
  const suffix = quote === '"' ? "Quote" : "Apostrophe";
  const tracker = state.createTracker(info);
  let exit2;
  let subexit;
  if (formatLinkAsAutolink(node, state)) {
    const stack = state.stack;
    state.stack = [];
    exit2 = state.enter("autolink");
    let value2 = tracker.move("<");
    value2 += tracker.move(
      state.containerPhrasing(node, {
        before: value2,
        after: ">",
        ...tracker.current()
      })
    );
    value2 += tracker.move(">");
    exit2();
    state.stack = stack;
    return value2;
  }
  exit2 = state.enter("link");
  subexit = state.enter("label");
  let value = tracker.move("[");
  value += tracker.move(
    state.containerPhrasing(node, {
      before: value,
      after: "](",
      ...tracker.current()
    })
  );
  value += tracker.move("](");
  subexit();
  if (
    // If there’s no url but there is a title…
    !node.url && node.title || // If there are control characters or whitespace.
    /[\0- \u007F]/.test(node.url)
  ) {
    subexit = state.enter("destinationLiteral");
    value += tracker.move("<");
    value += tracker.move(
      state.safe(node.url, { before: value, after: ">", ...tracker.current() })
    );
    value += tracker.move(">");
  } else {
    subexit = state.enter("destinationRaw");
    value += tracker.move(
      state.safe(node.url, {
        before: value,
        after: node.title ? " " : ")",
        ...tracker.current()
      })
    );
  }
  subexit();
  if (node.title) {
    subexit = state.enter(`title${suffix}`);
    value += tracker.move(" " + quote);
    value += tracker.move(
      state.safe(node.title, {
        before: value,
        after: quote,
        ...tracker.current()
      })
    );
    value += tracker.move(quote);
    subexit();
  }
  value += tracker.move(")");
  exit2();
  return value;
}
function linkPeek(node, _, state) {
  return formatLinkAsAutolink(node, state) ? "<" : "[";
}

// node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
linkReference.peek = linkReferencePeek;
function linkReference(node, _, state, info) {
  const type = node.referenceType;
  const exit2 = state.enter("linkReference");
  let subexit = state.enter("label");
  const tracker = state.createTracker(info);
  let value = tracker.move("[");
  const text3 = state.containerPhrasing(node, {
    before: value,
    after: "]",
    ...tracker.current()
  });
  value += tracker.move(text3 + "][");
  subexit();
  const stack = state.stack;
  state.stack = [];
  subexit = state.enter("reference");
  const reference = state.safe(state.associationId(node), {
    before: value,
    after: "]",
    ...tracker.current()
  });
  subexit();
  state.stack = stack;
  exit2();
  if (type === "full" || !text3 || text3 !== reference) {
    value += tracker.move(reference + "]");
  } else if (type === "shortcut") {
    value = value.slice(0, -1);
  } else {
    value += tracker.move("]");
  }
  return value;
}
function linkReferencePeek() {
  return "[";
}

// node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
function checkBullet(state) {
  const marker = state.options.bullet || "*";
  if (marker !== "*" && marker !== "+" && marker !== "-") {
    throw new Error(
      "Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
function checkBulletOther(state) {
  const bullet = checkBullet(state);
  const bulletOther = state.options.bulletOther;
  if (!bulletOther) {
    return bullet === "*" ? "-" : "*";
  }
  if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") {
    throw new Error(
      "Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  }
  if (bulletOther === bullet) {
    throw new Error(
      "Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different"
    );
  }
  return bulletOther;
}

// node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
function checkBulletOrdered(state) {
  const marker = state.options.bulletOrdered || ".";
  if (marker !== "." && marker !== ")") {
    throw new Error(
      "Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/util/check-rule.js
function checkRule(state) {
  const marker = state.options.rule || "*";
  if (marker !== "*" && marker !== "-" && marker !== "_") {
    throw new Error(
      "Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/handle/list.js
function list(node, parent, state, info) {
  const exit2 = state.enter("list");
  const bulletCurrent = state.bulletCurrent;
  let bullet = node.ordered ? checkBulletOrdered(state) : checkBullet(state);
  const bulletOther = node.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
  let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
  if (!node.ordered) {
    const firstListItem = node.children ? node.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (bullet === "*" || bullet === "-") && // Empty first list item:
      firstListItem && (!firstListItem.children || !firstListItem.children[0]) && // Directly in two other list items:
      state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && // That are each the first child.
      state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0
    ) {
      useDifferentMarker = true;
    }
    if (checkRule(state) === bullet && firstListItem) {
      let index = -1;
      while (++index < node.children.length) {
        const item = node.children[index];
        if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
          useDifferentMarker = true;
          break;
        }
      }
    }
  }
  if (useDifferentMarker) {
    bullet = bulletOther;
  }
  state.bulletCurrent = bullet;
  const value = state.containerFlow(node, info);
  state.bulletLastUsed = bullet;
  state.bulletCurrent = bulletCurrent;
  exit2();
  return value;
}

// node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
function checkListItemIndent(state) {
  const style = state.options.listItemIndent || "one";
  if (style !== "tab" && style !== "one" && style !== "mixed") {
    throw new Error(
      "Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  }
  return style;
}

// node_modules/mdast-util-to-markdown/lib/handle/list-item.js
function listItem(node, parent, state, info) {
  const listItemIndent = checkListItemIndent(state);
  let bullet = state.bulletCurrent || checkBullet(state);
  if (parent && parent.type === "list" && parent.ordered) {
    bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node)) + bullet;
  }
  let size = bullet.length + 1;
  if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node.spread)) {
    size = Math.ceil(size / 4) * 4;
  }
  const tracker = state.createTracker(info);
  tracker.move(bullet + " ".repeat(size - bullet.length));
  tracker.shift(size);
  const exit2 = state.enter("listItem");
  const value = state.indentLines(
    state.containerFlow(node, tracker.current()),
    map3
  );
  exit2();
  return value;
  function map3(line, index, blank) {
    if (index) {
      return (blank ? "" : " ".repeat(size)) + line;
    }
    return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
  }
}

// node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
function paragraph(node, _, state, info) {
  const exit2 = state.enter("paragraph");
  const subexit = state.enter("phrasing");
  const value = state.containerPhrasing(node, info);
  subexit();
  exit2();
  return value;
}

// node_modules/mdast-util-phrasing/lib/index.js
var phrasing = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  convert([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);

// node_modules/mdast-util-to-markdown/lib/handle/root.js
function root(node, _, state, info) {
  const hasPhrasing = node.children.some(function(d) {
    return phrasing(d);
  });
  const container = hasPhrasing ? state.containerPhrasing : state.containerFlow;
  return container.call(state, node, info);
}

// node_modules/mdast-util-to-markdown/lib/util/check-strong.js
function checkStrong(state) {
  const marker = state.options.strong || "*";
  if (marker !== "*" && marker !== "_") {
    throw new Error(
      "Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/handle/strong.js
strong.peek = strongPeek;
function strong(node, _, state, info) {
  const marker = checkStrong(state);
  const exit2 = state.enter("strong");
  const tracker = state.createTracker(info);
  const before = tracker.move(marker + marker);
  let between = tracker.move(
    state.containerPhrasing(node, {
      after: marker,
      before,
      ...tracker.current()
    })
  );
  const betweenHead = between.charCodeAt(0);
  const open = encodeInfo(
    info.before.charCodeAt(info.before.length - 1),
    betweenHead,
    marker
  );
  if (open.inside) {
    between = encodeCharacterReference(betweenHead) + between.slice(1);
  }
  const betweenTail = between.charCodeAt(between.length - 1);
  const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
  if (close.inside) {
    between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
  }
  const after = tracker.move(marker + marker);
  exit2();
  state.attentionEncodeSurroundingInfo = {
    after: close.outside,
    before: open.outside
  };
  return before + between + after;
}
function strongPeek(_, _1, state) {
  return state.options.strong || "*";
}

// node_modules/mdast-util-to-markdown/lib/handle/text.js
function text(node, _, state, info) {
  return state.safe(node.value, info);
}

// node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
function checkRuleRepetition(state) {
  const repetition = state.options.ruleRepetition || 3;
  if (repetition < 3) {
    throw new Error(
      "Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more"
    );
  }
  return repetition;
}

// node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
function thematicBreak(_, _1, state) {
  const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
  return state.options.ruleSpaces ? value.slice(0, -1) : value;
}

// node_modules/mdast-util-to-markdown/lib/handle/index.js
var handle = {
  blockquote,
  break: hardBreak,
  code,
  definition,
  emphasis,
  hardBreak,
  heading,
  html,
  image,
  imageReference,
  inlineCode,
  link,
  linkReference,
  list,
  listItem,
  paragraph,
  root,
  strong,
  text,
  thematicBreak
};

// node_modules/mdast-util-gfm-table/lib/index.js
function gfmTableFromMarkdown() {
  return {
    enter: {
      table: enterTable,
      tableData: enterCell,
      tableHeader: enterCell,
      tableRow: enterRow
    },
    exit: {
      codeText: exitCodeText,
      table: exitTable,
      tableData: exit,
      tableHeader: exit,
      tableRow: exit
    }
  };
}
function enterTable(token) {
  const align = token._align;
  ok(align, "expected `_align` on table");
  this.enter(
    {
      type: "table",
      align: align.map(function(d) {
        return d === "none" ? null : d;
      }),
      children: []
    },
    token
  );
  this.data.inTable = true;
}
function exitTable(token) {
  this.exit(token);
  this.data.inTable = void 0;
}
function enterRow(token) {
  this.enter({ type: "tableRow", children: [] }, token);
}
function exit(token) {
  this.exit(token);
}
function enterCell(token) {
  this.enter({ type: "tableCell", children: [] }, token);
}
function exitCodeText(token) {
  let value = this.resume();
  if (this.data.inTable) {
    value = value.replace(/\\([\\|])/g, replace);
  }
  const node = this.stack[this.stack.length - 1];
  ok(node.type === "inlineCode");
  node.value = value;
  this.exit(token);
}
function replace($0, $1) {
  return $1 === "|" ? $1 : $0;
}
function gfmTableToMarkdown(options) {
  const settings = options || {};
  const padding = settings.tableCellPadding;
  const alignDelimiters = settings.tablePipeAlign;
  const stringLength = settings.stringLength;
  const around = padding ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: "\n", inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: true, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: true, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: true, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: inlineCodeWithTable,
      table: handleTable,
      tableCell: handleTableCell,
      tableRow: handleTableRow
    }
  };
  function handleTable(node, _, state, info) {
    return serializeData(handleTableAsData(node, state, info), node.align);
  }
  function handleTableRow(node, _, state, info) {
    const row = handleTableRowAsData(node, state, info);
    const value = serializeData([row]);
    return value.slice(0, value.indexOf("\n"));
  }
  function handleTableCell(node, _, state, info) {
    const exit2 = state.enter("tableCell");
    const subexit = state.enter("phrasing");
    const value = state.containerPhrasing(node, {
      ...info,
      before: around,
      after: around
    });
    subexit();
    exit2();
    return value;
  }
  function serializeData(matrix, align) {
    return markdownTable(matrix, {
      align,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength
    });
  }
  function handleTableAsData(node, state, info) {
    const children = node.children;
    let index = -1;
    const result = [];
    const subexit = state.enter("table");
    while (++index < children.length) {
      result[index] = handleTableRowAsData(children[index], state, info);
    }
    subexit();
    return result;
  }
  function handleTableRowAsData(node, state, info) {
    const children = node.children;
    let index = -1;
    const result = [];
    const subexit = state.enter("tableRow");
    while (++index < children.length) {
      result[index] = handleTableCell(children[index], node, state, info);
    }
    subexit();
    return result;
  }
  function inlineCodeWithTable(node, parent, state) {
    let value = handle.inlineCode(node, parent, state);
    if (state.stack.includes("tableCell")) {
      value = value.replace(/\|/g, "\\$&");
    }
    return value;
  }
}

// node_modules/mdast-util-gfm-task-list-item/lib/index.js
function gfmTaskListItemFromMarkdown() {
  return {
    exit: {
      taskListCheckValueChecked: exitCheck,
      taskListCheckValueUnchecked: exitCheck,
      paragraph: exitParagraphWithTaskListItem
    }
  };
}
function gfmTaskListItemToMarkdown() {
  return {
    unsafe: [{ atBreak: true, character: "-", after: "[:|-]" }],
    handlers: { listItem: listItemWithTaskListItem }
  };
}
function exitCheck(token) {
  const node = this.stack[this.stack.length - 2];
  ok(node.type === "listItem");
  node.checked = token.type === "taskListCheckValueChecked";
}
function exitParagraphWithTaskListItem(token) {
  const parent = this.stack[this.stack.length - 2];
  if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
    const node = this.stack[this.stack.length - 1];
    ok(node.type === "paragraph");
    const head = node.children[0];
    if (head && head.type === "text") {
      const siblings = parent.children;
      let index = -1;
      let firstParaghraph;
      while (++index < siblings.length) {
        const sibling = siblings[index];
        if (sibling.type === "paragraph") {
          firstParaghraph = sibling;
          break;
        }
      }
      if (firstParaghraph === node) {
        head.value = head.value.slice(1);
        if (head.value.length === 0) {
          node.children.shift();
        } else if (node.position && head.position && typeof head.position.start.offset === "number") {
          head.position.start.column++;
          head.position.start.offset++;
          node.position.start = Object.assign({}, head.position.start);
        }
      }
    }
  }
  this.exit(token);
}
function listItemWithTaskListItem(node, parent, state, info) {
  const head = node.children[0];
  const checkable = typeof node.checked === "boolean" && head && head.type === "paragraph";
  const checkbox = "[" + (node.checked ? "x" : " ") + "] ";
  const tracker = state.createTracker(info);
  if (checkable) {
    tracker.move(checkbox);
  }
  let value = handle.listItem(node, parent, state, {
    ...info,
    ...tracker.current()
  });
  if (checkable) {
    value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
  }
  return value;
  function check($0) {
    return $0 + checkbox;
  }
}

// node_modules/mdast-util-gfm/lib/index.js
function gfmFromMarkdown() {
  return [
    gfmAutolinkLiteralFromMarkdown(),
    gfmFootnoteFromMarkdown(),
    gfmStrikethroughFromMarkdown(),
    gfmTableFromMarkdown(),
    gfmTaskListItemFromMarkdown()
  ];
}
function gfmToMarkdown(options) {
  return {
    extensions: [
      gfmAutolinkLiteralToMarkdown(),
      gfmFootnoteToMarkdown(options),
      gfmStrikethroughToMarkdown(),
      gfmTableToMarkdown(options),
      gfmTaskListItemToMarkdown()
    ]
  };
}

// node_modules/micromark-extension-gfm-autolink-literal/dev/lib/syntax.js
var wwwPrefix = { tokenize: tokenizeWwwPrefix, partial: true };
var domain = { tokenize: tokenizeDomain, partial: true };
var path = { tokenize: tokenizePath, partial: true };
var trail = { tokenize: tokenizeTrail, partial: true };
var emailDomainDotTrail = {
  tokenize: tokenizeEmailDomainDotTrail,
  partial: true
};
var wwwAutolink = {
  name: "wwwAutolink",
  tokenize: tokenizeWwwAutolink,
  previous: previousWww
};
var protocolAutolink = {
  name: "protocolAutolink",
  tokenize: tokenizeProtocolAutolink,
  previous: previousProtocol
};
var emailAutolink = {
  name: "emailAutolink",
  tokenize: tokenizeEmailAutolink,
  previous: previousEmail
};
var text2 = {};
function gfmAutolinkLiteral() {
  return { text: text2 };
}
var code2 = codes.digit0;
while (code2 < codes.leftCurlyBrace) {
  text2[code2] = emailAutolink;
  code2++;
  if (code2 === codes.colon) code2 = codes.uppercaseA;
  else if (code2 === codes.leftSquareBracket) code2 = codes.lowercaseA;
}
text2[codes.plusSign] = emailAutolink;
text2[codes.dash] = emailAutolink;
text2[codes.dot] = emailAutolink;
text2[codes.underscore] = emailAutolink;
text2[codes.uppercaseH] = [emailAutolink, protocolAutolink];
text2[codes.lowercaseH] = [emailAutolink, protocolAutolink];
text2[codes.uppercaseW] = [emailAutolink, wwwAutolink];
text2[codes.lowercaseW] = [emailAutolink, wwwAutolink];
function tokenizeEmailAutolink(effects, ok2, nok) {
  const self = this;
  let dot;
  let data;
  return start;
  function start(code3) {
    if (!gfmAtext(code3) || !previousEmail.call(self, self.previous) || previousUnbalanced(self.events)) {
      return nok(code3);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkEmail");
    return atext(code3);
  }
  function atext(code3) {
    if (gfmAtext(code3)) {
      effects.consume(code3);
      return atext;
    }
    if (code3 === codes.atSign) {
      effects.consume(code3);
      return emailDomain;
    }
    return nok(code3);
  }
  function emailDomain(code3) {
    if (code3 === codes.dot) {
      return effects.check(
        emailDomainDotTrail,
        emailDomainAfter,
        emailDomainDot
      )(code3);
    }
    if (code3 === codes.dash || code3 === codes.underscore || asciiAlphanumeric(code3)) {
      data = true;
      effects.consume(code3);
      return emailDomain;
    }
    return emailDomainAfter(code3);
  }
  function emailDomainDot(code3) {
    effects.consume(code3);
    dot = true;
    return emailDomain;
  }
  function emailDomainAfter(code3) {
    if (data && dot && asciiAlpha(self.previous)) {
      effects.exit("literalAutolinkEmail");
      effects.exit("literalAutolink");
      return ok2(code3);
    }
    return nok(code3);
  }
}
function tokenizeWwwAutolink(effects, ok2, nok) {
  const self = this;
  return wwwStart;
  function wwwStart(code3) {
    if (code3 !== codes.uppercaseW && code3 !== codes.lowercaseW || !previousWww.call(self, self.previous) || previousUnbalanced(self.events)) {
      return nok(code3);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkWww");
    return effects.check(
      wwwPrefix,
      effects.attempt(domain, effects.attempt(path, wwwAfter), nok),
      nok
    )(code3);
  }
  function wwwAfter(code3) {
    effects.exit("literalAutolinkWww");
    effects.exit("literalAutolink");
    return ok2(code3);
  }
}
function tokenizeProtocolAutolink(effects, ok2, nok) {
  const self = this;
  let buffer = "";
  let seen = false;
  return protocolStart;
  function protocolStart(code3) {
    if ((code3 === codes.uppercaseH || code3 === codes.lowercaseH) && previousProtocol.call(self, self.previous) && !previousUnbalanced(self.events)) {
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkHttp");
      buffer += String.fromCodePoint(code3);
      effects.consume(code3);
      return protocolPrefixInside;
    }
    return nok(code3);
  }
  function protocolPrefixInside(code3) {
    if (asciiAlpha(code3) && buffer.length < 5) {
      buffer += String.fromCodePoint(code3);
      effects.consume(code3);
      return protocolPrefixInside;
    }
    if (code3 === codes.colon) {
      const protocol = buffer.toLowerCase();
      if (protocol === "http" || protocol === "https") {
        effects.consume(code3);
        return protocolSlashesInside;
      }
    }
    return nok(code3);
  }
  function protocolSlashesInside(code3) {
    if (code3 === codes.slash) {
      effects.consume(code3);
      if (seen) {
        return afterProtocol;
      }
      seen = true;
      return protocolSlashesInside;
    }
    return nok(code3);
  }
  function afterProtocol(code3) {
    return code3 === codes.eof || asciiControl(code3) || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3) || unicodePunctuation(code3) ? nok(code3) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code3);
  }
  function protocolAfter(code3) {
    effects.exit("literalAutolinkHttp");
    effects.exit("literalAutolink");
    return ok2(code3);
  }
}
function tokenizeWwwPrefix(effects, ok2, nok) {
  let size = 0;
  return wwwPrefixInside;
  function wwwPrefixInside(code3) {
    if ((code3 === codes.uppercaseW || code3 === codes.lowercaseW) && size < 3) {
      size++;
      effects.consume(code3);
      return wwwPrefixInside;
    }
    if (code3 === codes.dot && size === 3) {
      effects.consume(code3);
      return wwwPrefixAfter;
    }
    return nok(code3);
  }
  function wwwPrefixAfter(code3) {
    return code3 === codes.eof ? nok(code3) : ok2(code3);
  }
}
function tokenizeDomain(effects, ok2, nok) {
  let underscoreInLastSegment;
  let underscoreInLastLastSegment;
  let seen;
  return domainInside;
  function domainInside(code3) {
    if (code3 === codes.dot || code3 === codes.underscore) {
      return effects.check(trail, domainAfter, domainAtPunctuation)(code3);
    }
    if (code3 === codes.eof || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3) || code3 !== codes.dash && unicodePunctuation(code3)) {
      return domainAfter(code3);
    }
    seen = true;
    effects.consume(code3);
    return domainInside;
  }
  function domainAtPunctuation(code3) {
    if (code3 === codes.underscore) {
      underscoreInLastSegment = true;
    } else {
      underscoreInLastLastSegment = underscoreInLastSegment;
      underscoreInLastSegment = void 0;
    }
    effects.consume(code3);
    return domainInside;
  }
  function domainAfter(code3) {
    if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) {
      return nok(code3);
    }
    return ok2(code3);
  }
}
function tokenizePath(effects, ok2) {
  let sizeOpen = 0;
  let sizeClose = 0;
  return pathInside;
  function pathInside(code3) {
    if (code3 === codes.leftParenthesis) {
      sizeOpen++;
      effects.consume(code3);
      return pathInside;
    }
    if (code3 === codes.rightParenthesis && sizeClose < sizeOpen) {
      return pathAtPunctuation(code3);
    }
    if (code3 === codes.exclamationMark || code3 === codes.quotationMark || code3 === codes.ampersand || code3 === codes.apostrophe || code3 === codes.rightParenthesis || code3 === codes.asterisk || code3 === codes.comma || code3 === codes.dot || code3 === codes.colon || code3 === codes.semicolon || code3 === codes.lessThan || code3 === codes.questionMark || code3 === codes.rightSquareBracket || code3 === codes.underscore || code3 === codes.tilde) {
      return effects.check(trail, ok2, pathAtPunctuation)(code3);
    }
    if (code3 === codes.eof || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
      return ok2(code3);
    }
    effects.consume(code3);
    return pathInside;
  }
  function pathAtPunctuation(code3) {
    if (code3 === codes.rightParenthesis) {
      sizeClose++;
    }
    effects.consume(code3);
    return pathInside;
  }
}
function tokenizeTrail(effects, ok2, nok) {
  return trail2;
  function trail2(code3) {
    if (code3 === codes.exclamationMark || code3 === codes.quotationMark || code3 === codes.apostrophe || code3 === codes.rightParenthesis || code3 === codes.asterisk || code3 === codes.comma || code3 === codes.dot || code3 === codes.colon || code3 === codes.semicolon || code3 === codes.questionMark || code3 === codes.underscore || code3 === codes.tilde) {
      effects.consume(code3);
      return trail2;
    }
    if (code3 === codes.ampersand) {
      effects.consume(code3);
      return trailCharacterReferenceStart;
    }
    if (code3 === codes.rightSquareBracket) {
      effects.consume(code3);
      return trailBracketAfter;
    }
    if (
      // `<` is an end.
      code3 === codes.lessThan || // So is whitespace.
      code3 === codes.eof || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)
    ) {
      return ok2(code3);
    }
    return nok(code3);
  }
  function trailBracketAfter(code3) {
    if (code3 === codes.eof || code3 === codes.leftParenthesis || code3 === codes.leftSquareBracket || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
      return ok2(code3);
    }
    return trail2(code3);
  }
  function trailCharacterReferenceStart(code3) {
    return asciiAlpha(code3) ? trailCharacterReferenceInside(code3) : nok(code3);
  }
  function trailCharacterReferenceInside(code3) {
    if (code3 === codes.semicolon) {
      effects.consume(code3);
      return trail2;
    }
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      return trailCharacterReferenceInside;
    }
    return nok(code3);
  }
}
function tokenizeEmailDomainDotTrail(effects, ok2, nok) {
  return start;
  function start(code3) {
    effects.consume(code3);
    return after;
  }
  function after(code3) {
    return asciiAlphanumeric(code3) ? nok(code3) : ok2(code3);
  }
}
function previousWww(code3) {
  return code3 === codes.eof || code3 === codes.leftParenthesis || code3 === codes.asterisk || code3 === codes.underscore || code3 === codes.leftSquareBracket || code3 === codes.rightSquareBracket || code3 === codes.tilde || markdownLineEndingOrSpace(code3);
}
function previousProtocol(code3) {
  return !asciiAlpha(code3);
}
function previousEmail(code3) {
  return !(code3 === codes.slash || gfmAtext(code3));
}
function gfmAtext(code3) {
  return code3 === codes.plusSign || code3 === codes.dash || code3 === codes.dot || code3 === codes.underscore || asciiAlphanumeric(code3);
}
function previousUnbalanced(events) {
  let index = events.length;
  let result = false;
  while (index--) {
    const token = events[index][1];
    if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
      result = true;
      break;
    }
    if (token._gfmAutolinkLiteralWalkedInto) {
      result = false;
      break;
    }
  }
  if (events.length > 0 && !result) {
    events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
  }
  return result;
}

// node_modules/micromark-extension-gfm-footnote/dev/lib/syntax.js
var indent = { tokenize: tokenizeIndent, partial: true };
function gfmFootnote() {
  return {
    document: {
      [codes.leftSquareBracket]: {
        name: "gfmFootnoteDefinition",
        tokenize: tokenizeDefinitionStart,
        continuation: { tokenize: tokenizeDefinitionContinuation },
        exit: gfmFootnoteDefinitionEnd
      }
    },
    text: {
      [codes.leftSquareBracket]: {
        name: "gfmFootnoteCall",
        tokenize: tokenizeGfmFootnoteCall
      },
      [codes.rightSquareBracket]: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: tokenizePotentialGfmFootnoteCall,
        resolveTo: resolveToPotentialGfmFootnoteCall
      }
    }
  };
}
function tokenizePotentialGfmFootnoteCall(effects, ok2, nok) {
  const self = this;
  let index = self.events.length;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  let labelStart;
  while (index--) {
    const token = self.events[index][1];
    if (token.type === types.labelImage) {
      labelStart = token;
      break;
    }
    if (token.type === "gfmFootnoteCall" || token.type === types.labelLink || token.type === types.label || token.type === types.image || token.type === types.link) {
      break;
    }
  }
  return start;
  function start(code3) {
    ok(code3 === codes.rightSquareBracket, "expected `]`");
    if (!labelStart || !labelStart._balanced) {
      return nok(code3);
    }
    const id = normalizeIdentifier(
      self.sliceSerialize({ start: labelStart.end, end: self.now() })
    );
    if (id.codePointAt(0) !== codes.caret || !defined.includes(id.slice(1))) {
      return nok(code3);
    }
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteCallLabelMarker");
    return ok2(code3);
  }
}
function resolveToPotentialGfmFootnoteCall(events, context) {
  let index = events.length;
  let labelStart;
  while (index--) {
    if (events[index][1].type === types.labelImage && events[index][0] === "enter") {
      labelStart = events[index][1];
      break;
    }
  }
  ok(labelStart, "expected `labelStart` to resolve");
  events[index + 1][1].type = types.data;
  events[index + 3][1].type = "gfmFootnoteCallLabelMarker";
  const call = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, events[index + 3][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  const marker = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, events[index + 3][1].end),
    end: Object.assign({}, events[index + 3][1].end)
  };
  marker.end.column++;
  marker.end.offset++;
  marker.end._bufferIndex++;
  const string = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, marker.end),
    end: Object.assign({}, events[events.length - 1][1].start)
  };
  const chunk = {
    type: types.chunkString,
    contentType: "string",
    start: Object.assign({}, string.start),
    end: Object.assign({}, string.end)
  };
  const replacement = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    events[index + 1],
    events[index + 2],
    ["enter", call, context],
    // The `[`
    events[index + 3],
    events[index + 4],
    // The `^`.
    ["enter", marker, context],
    ["exit", marker, context],
    // Everything in between.
    ["enter", string, context],
    ["enter", chunk, context],
    ["exit", chunk, context],
    ["exit", string, context],
    // The ending (`]`, properly parsed and labelled).
    events[events.length - 2],
    events[events.length - 1],
    ["exit", call, context]
  ];
  events.splice(index, events.length - index + 1, ...replacement);
  return events;
}
function tokenizeGfmFootnoteCall(effects, ok2, nok) {
  const self = this;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  let size = 0;
  let data;
  return start;
  function start(code3) {
    ok(code3 === codes.leftSquareBracket, "expected `[`");
    effects.enter("gfmFootnoteCall");
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteCallLabelMarker");
    return callStart;
  }
  function callStart(code3) {
    if (code3 !== codes.caret) return nok(code3);
    effects.enter("gfmFootnoteCallMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteCallMarker");
    effects.enter("gfmFootnoteCallString");
    effects.enter("chunkString").contentType = "string";
    return callData;
  }
  function callData(code3) {
    if (
      // Too long.
      size > constants.linkReferenceSizeMax || // Closing brace with nothing.
      code3 === codes.rightSquareBracket && !data || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      code3 === codes.eof || code3 === codes.leftSquareBracket || markdownLineEndingOrSpace(code3)
    ) {
      return nok(code3);
    }
    if (code3 === codes.rightSquareBracket) {
      effects.exit("chunkString");
      const token = effects.exit("gfmFootnoteCallString");
      if (!defined.includes(normalizeIdentifier(self.sliceSerialize(token)))) {
        return nok(code3);
      }
      effects.enter("gfmFootnoteCallLabelMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteCallLabelMarker");
      effects.exit("gfmFootnoteCall");
      return ok2;
    }
    if (!markdownLineEndingOrSpace(code3)) {
      data = true;
    }
    size++;
    effects.consume(code3);
    return code3 === codes.backslash ? callEscape : callData;
  }
  function callEscape(code3) {
    if (code3 === codes.leftSquareBracket || code3 === codes.backslash || code3 === codes.rightSquareBracket) {
      effects.consume(code3);
      size++;
      return callData;
    }
    return callData(code3);
  }
}
function tokenizeDefinitionStart(effects, ok2, nok) {
  const self = this;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  let identifier;
  let size = 0;
  let data;
  return start;
  function start(code3) {
    ok(code3 === codes.leftSquareBracket, "expected `[`");
    effects.enter("gfmFootnoteDefinition")._container = true;
    effects.enter("gfmFootnoteDefinitionLabel");
    effects.enter("gfmFootnoteDefinitionLabelMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteDefinitionLabelMarker");
    return labelAtMarker;
  }
  function labelAtMarker(code3) {
    if (code3 === codes.caret) {
      effects.enter("gfmFootnoteDefinitionMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteDefinitionMarker");
      effects.enter("gfmFootnoteDefinitionLabelString");
      effects.enter("chunkString").contentType = "string";
      return labelInside;
    }
    return nok(code3);
  }
  function labelInside(code3) {
    if (
      // Too long.
      size > constants.linkReferenceSizeMax || // Closing brace with nothing.
      code3 === codes.rightSquareBracket && !data || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      code3 === codes.eof || code3 === codes.leftSquareBracket || markdownLineEndingOrSpace(code3)
    ) {
      return nok(code3);
    }
    if (code3 === codes.rightSquareBracket) {
      effects.exit("chunkString");
      const token = effects.exit("gfmFootnoteDefinitionLabelString");
      identifier = normalizeIdentifier(self.sliceSerialize(token));
      effects.enter("gfmFootnoteDefinitionLabelMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteDefinitionLabelMarker");
      effects.exit("gfmFootnoteDefinitionLabel");
      return labelAfter;
    }
    if (!markdownLineEndingOrSpace(code3)) {
      data = true;
    }
    size++;
    effects.consume(code3);
    return code3 === codes.backslash ? labelEscape : labelInside;
  }
  function labelEscape(code3) {
    if (code3 === codes.leftSquareBracket || code3 === codes.backslash || code3 === codes.rightSquareBracket) {
      effects.consume(code3);
      size++;
      return labelInside;
    }
    return labelInside(code3);
  }
  function labelAfter(code3) {
    if (code3 === codes.colon) {
      effects.enter("definitionMarker");
      effects.consume(code3);
      effects.exit("definitionMarker");
      if (!defined.includes(identifier)) {
        defined.push(identifier);
      }
      return factorySpace(
        effects,
        whitespaceAfter,
        "gfmFootnoteDefinitionWhitespace"
      );
    }
    return nok(code3);
  }
  function whitespaceAfter(code3) {
    return ok2(code3);
  }
}
function tokenizeDefinitionContinuation(effects, ok2, nok) {
  return effects.check(blankLine, ok2, effects.attempt(indent, ok2, nok));
}
function gfmFootnoteDefinitionEnd(effects) {
  effects.exit("gfmFootnoteDefinition");
}
function tokenizeIndent(effects, ok2, nok) {
  const self = this;
  return factorySpace(
    effects,
    afterPrefix,
    "gfmFootnoteDefinitionIndent",
    constants.tabSize + 1
  );
  function afterPrefix(code3) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === constants.tabSize ? ok2(code3) : nok(code3);
  }
}

// node_modules/micromark-extension-gfm-footnote/dev/lib/html.js
var own3 = {}.hasOwnProperty;

// node_modules/micromark-extension-gfm-strikethrough/dev/lib/syntax.js
function gfmStrikethrough(options) {
  const options_ = options || {};
  let single = options_.singleTilde;
  const tokenizer = {
    name: "strikethrough",
    tokenize: tokenizeStrikethrough,
    resolveAll: resolveAllStrikethrough
  };
  if (single === null || single === void 0) {
    single = true;
  }
  return {
    text: { [codes.tilde]: tokenizer },
    insideSpan: { null: [tokenizer] },
    attentionMarkers: { null: [codes.tilde] }
  };
  function resolveAllStrikethrough(events, context) {
    let index = -1;
    while (++index < events.length) {
      if (events[index][0] === "enter" && events[index][1].type === "strikethroughSequenceTemporary" && events[index][1]._close) {
        let open = index;
        while (open--) {
          if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && // If the sizes are the same:
          events[index][1].end.offset - events[index][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
            events[index][1].type = "strikethroughSequence";
            events[open][1].type = "strikethroughSequence";
            const strikethrough = {
              type: "strikethrough",
              start: Object.assign({}, events[open][1].start),
              end: Object.assign({}, events[index][1].end)
            };
            const text3 = {
              type: "strikethroughText",
              start: Object.assign({}, events[open][1].end),
              end: Object.assign({}, events[index][1].start)
            };
            const nextEvents = [
              ["enter", strikethrough, context],
              ["enter", events[open][1], context],
              ["exit", events[open][1], context],
              ["enter", text3, context]
            ];
            const insideSpan = context.parser.constructs.insideSpan.null;
            if (insideSpan) {
              splice(
                nextEvents,
                nextEvents.length,
                0,
                resolveAll(insideSpan, events.slice(open + 1, index), context)
              );
            }
            splice(nextEvents, nextEvents.length, 0, [
              ["exit", text3, context],
              ["enter", events[index][1], context],
              ["exit", events[index][1], context],
              ["exit", strikethrough, context]
            ]);
            splice(events, open - 1, index - open + 3, nextEvents);
            index = open + nextEvents.length - 2;
            break;
          }
        }
      }
    }
    index = -1;
    while (++index < events.length) {
      if (events[index][1].type === "strikethroughSequenceTemporary") {
        events[index][1].type = types.data;
      }
    }
    return events;
  }
  function tokenizeStrikethrough(effects, ok2, nok) {
    const previous2 = this.previous;
    const events = this.events;
    let size = 0;
    return start;
    function start(code3) {
      ok(code3 === codes.tilde, "expected `~`");
      if (previous2 === codes.tilde && events[events.length - 1][1].type !== types.characterEscape) {
        return nok(code3);
      }
      effects.enter("strikethroughSequenceTemporary");
      return more(code3);
    }
    function more(code3) {
      const before = classifyCharacter(previous2);
      if (code3 === codes.tilde) {
        if (size > 1) return nok(code3);
        effects.consume(code3);
        size++;
        return more;
      }
      if (size < 2 && !single) return nok(code3);
      const token = effects.exit("strikethroughSequenceTemporary");
      const after = classifyCharacter(code3);
      token._open = !after || after === constants.attentionSideAfter && Boolean(before);
      token._close = !before || before === constants.attentionSideAfter && Boolean(after);
      return ok2(code3);
    }
  }
}

// node_modules/micromark-extension-gfm-table/dev/lib/edit-map.js
var EditMap = class {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(index, remove, add) {
    addImplementation(this, index, remove, add);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(events) {
    this.map.sort(function(a, b) {
      return a[0] - b[0];
    });
    if (this.map.length === 0) {
      return;
    }
    let index = this.map.length;
    const vecs = [];
    while (index > 0) {
      index -= 1;
      vecs.push(
        events.slice(this.map[index][0] + this.map[index][1]),
        this.map[index][2]
      );
      events.length = this.map[index][0];
    }
    vecs.push(events.slice());
    events.length = 0;
    let slice = vecs.pop();
    while (slice) {
      for (const element of slice) {
        events.push(element);
      }
      slice = vecs.pop();
    }
    this.map.length = 0;
  }
};
function addImplementation(editMap, at, remove, add) {
  let index = 0;
  if (remove === 0 && add.length === 0) {
    return;
  }
  while (index < editMap.map.length) {
    if (editMap.map[index][0] === at) {
      editMap.map[index][1] += remove;
      editMap.map[index][2].push(...add);
      return;
    }
    index += 1;
  }
  editMap.map.push([at, remove, add]);
}

// node_modules/micromark-extension-gfm-table/dev/lib/infer.js
function gfmTableAlign(events, index) {
  ok(events[index][1].type === "table", "expected table");
  let inDelimiterRow = false;
  const align = [];
  while (index < events.length) {
    const event = events[index];
    if (inDelimiterRow) {
      if (event[0] === "enter") {
        if (event[1].type === "tableContent") {
          align.push(
            events[index + 1][1].type === "tableDelimiterMarker" ? "left" : "none"
          );
        }
      } else if (event[1].type === "tableContent") {
        if (events[index - 1][1].type === "tableDelimiterMarker") {
          const alignIndex = align.length - 1;
          align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
        }
      } else if (event[1].type === "tableDelimiterRow") {
        break;
      }
    } else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") {
      inDelimiterRow = true;
    }
    index += 1;
  }
  return align;
}

// node_modules/micromark-extension-gfm-table/dev/lib/syntax.js
function gfmTable() {
  return {
    flow: {
      null: { name: "table", tokenize: tokenizeTable, resolveAll: resolveTable }
    }
  };
}
function tokenizeTable(effects, ok2, nok) {
  const self = this;
  let size = 0;
  let sizeB = 0;
  let seen;
  return start;
  function start(code3) {
    let index = self.events.length - 1;
    while (index > -1) {
      const type = self.events[index][1].type;
      if (type === types.lineEnding || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      type === types.linePrefix)
        index--;
      else break;
    }
    const tail = index > -1 ? self.events[index][1].type : null;
    const next = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
    if (next === bodyRowStart && self.parser.lazy[self.now().line]) {
      return nok(code3);
    }
    return next(code3);
  }
  function headRowBefore(code3) {
    effects.enter("tableHead");
    effects.enter("tableRow");
    return headRowStart(code3);
  }
  function headRowStart(code3) {
    if (code3 === codes.verticalBar) {
      return headRowBreak(code3);
    }
    seen = true;
    sizeB += 1;
    return headRowBreak(code3);
  }
  function headRowBreak(code3) {
    if (code3 === codes.eof) {
      return nok(code3);
    }
    if (markdownLineEnding(code3)) {
      if (sizeB > 1) {
        sizeB = 0;
        self.interrupt = true;
        effects.exit("tableRow");
        effects.enter(types.lineEnding);
        effects.consume(code3);
        effects.exit(types.lineEnding);
        return headDelimiterStart;
      }
      return nok(code3);
    }
    if (markdownSpace(code3)) {
      return factorySpace(effects, headRowBreak, types.whitespace)(code3);
    }
    sizeB += 1;
    if (seen) {
      seen = false;
      size += 1;
    }
    if (code3 === codes.verticalBar) {
      effects.enter("tableCellDivider");
      effects.consume(code3);
      effects.exit("tableCellDivider");
      seen = true;
      return headRowBreak;
    }
    effects.enter(types.data);
    return headRowData(code3);
  }
  function headRowData(code3) {
    if (code3 === codes.eof || code3 === codes.verticalBar || markdownLineEndingOrSpace(code3)) {
      effects.exit(types.data);
      return headRowBreak(code3);
    }
    effects.consume(code3);
    return code3 === codes.backslash ? headRowEscape : headRowData;
  }
  function headRowEscape(code3) {
    if (code3 === codes.backslash || code3 === codes.verticalBar) {
      effects.consume(code3);
      return headRowData;
    }
    return headRowData(code3);
  }
  function headDelimiterStart(code3) {
    self.interrupt = false;
    if (self.parser.lazy[self.now().line]) {
      return nok(code3);
    }
    effects.enter("tableDelimiterRow");
    seen = false;
    if (markdownSpace(code3)) {
      ok(self.parser.constructs.disable.null, "expected `disabled.null`");
      return factorySpace(
        effects,
        headDelimiterBefore,
        types.linePrefix,
        self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : constants.tabSize
      )(code3);
    }
    return headDelimiterBefore(code3);
  }
  function headDelimiterBefore(code3) {
    if (code3 === codes.dash || code3 === codes.colon) {
      return headDelimiterValueBefore(code3);
    }
    if (code3 === codes.verticalBar) {
      seen = true;
      effects.enter("tableCellDivider");
      effects.consume(code3);
      effects.exit("tableCellDivider");
      return headDelimiterCellBefore;
    }
    return headDelimiterNok(code3);
  }
  function headDelimiterCellBefore(code3) {
    if (markdownSpace(code3)) {
      return factorySpace(
        effects,
        headDelimiterValueBefore,
        types.whitespace
      )(code3);
    }
    return headDelimiterValueBefore(code3);
  }
  function headDelimiterValueBefore(code3) {
    if (code3 === codes.colon) {
      sizeB += 1;
      seen = true;
      effects.enter("tableDelimiterMarker");
      effects.consume(code3);
      effects.exit("tableDelimiterMarker");
      return headDelimiterLeftAlignmentAfter;
    }
    if (code3 === codes.dash) {
      sizeB += 1;
      return headDelimiterLeftAlignmentAfter(code3);
    }
    if (code3 === codes.eof || markdownLineEnding(code3)) {
      return headDelimiterCellAfter(code3);
    }
    return headDelimiterNok(code3);
  }
  function headDelimiterLeftAlignmentAfter(code3) {
    if (code3 === codes.dash) {
      effects.enter("tableDelimiterFiller");
      return headDelimiterFiller(code3);
    }
    return headDelimiterNok(code3);
  }
  function headDelimiterFiller(code3) {
    if (code3 === codes.dash) {
      effects.consume(code3);
      return headDelimiterFiller;
    }
    if (code3 === codes.colon) {
      seen = true;
      effects.exit("tableDelimiterFiller");
      effects.enter("tableDelimiterMarker");
      effects.consume(code3);
      effects.exit("tableDelimiterMarker");
      return headDelimiterRightAlignmentAfter;
    }
    effects.exit("tableDelimiterFiller");
    return headDelimiterRightAlignmentAfter(code3);
  }
  function headDelimiterRightAlignmentAfter(code3) {
    if (markdownSpace(code3)) {
      return factorySpace(
        effects,
        headDelimiterCellAfter,
        types.whitespace
      )(code3);
    }
    return headDelimiterCellAfter(code3);
  }
  function headDelimiterCellAfter(code3) {
    if (code3 === codes.verticalBar) {
      return headDelimiterBefore(code3);
    }
    if (code3 === codes.eof || markdownLineEnding(code3)) {
      if (!seen || size !== sizeB) {
        return headDelimiterNok(code3);
      }
      effects.exit("tableDelimiterRow");
      effects.exit("tableHead");
      return ok2(code3);
    }
    return headDelimiterNok(code3);
  }
  function headDelimiterNok(code3) {
    return nok(code3);
  }
  function bodyRowStart(code3) {
    effects.enter("tableRow");
    return bodyRowBreak(code3);
  }
  function bodyRowBreak(code3) {
    if (code3 === codes.verticalBar) {
      effects.enter("tableCellDivider");
      effects.consume(code3);
      effects.exit("tableCellDivider");
      return bodyRowBreak;
    }
    if (code3 === codes.eof || markdownLineEnding(code3)) {
      effects.exit("tableRow");
      return ok2(code3);
    }
    if (markdownSpace(code3)) {
      return factorySpace(effects, bodyRowBreak, types.whitespace)(code3);
    }
    effects.enter(types.data);
    return bodyRowData(code3);
  }
  function bodyRowData(code3) {
    if (code3 === codes.eof || code3 === codes.verticalBar || markdownLineEndingOrSpace(code3)) {
      effects.exit(types.data);
      return bodyRowBreak(code3);
    }
    effects.consume(code3);
    return code3 === codes.backslash ? bodyRowEscape : bodyRowData;
  }
  function bodyRowEscape(code3) {
    if (code3 === codes.backslash || code3 === codes.verticalBar) {
      effects.consume(code3);
      return bodyRowData;
    }
    return bodyRowData(code3);
  }
}
function resolveTable(events, context) {
  let index = -1;
  let inFirstCellAwaitingPipe = true;
  let rowKind = 0;
  let lastCell = [0, 0, 0, 0];
  let cell = [0, 0, 0, 0];
  let afterHeadAwaitingFirstBodyRow = false;
  let lastTableEnd = 0;
  let currentTable;
  let currentBody;
  let currentCell;
  const map3 = new EditMap();
  while (++index < events.length) {
    const event = events[index];
    const token = event[1];
    if (event[0] === "enter") {
      if (token.type === "tableHead") {
        afterHeadAwaitingFirstBodyRow = false;
        if (lastTableEnd !== 0) {
          ok(currentTable, "there should be a table opening");
          flushTableEnd(map3, context, lastTableEnd, currentTable, currentBody);
          currentBody = void 0;
          lastTableEnd = 0;
        }
        currentTable = {
          type: "table",
          start: Object.assign({}, token.start),
          // Note: correct end is set later.
          end: Object.assign({}, token.end)
        };
        map3.add(index, 0, [["enter", currentTable, context]]);
      } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
        inFirstCellAwaitingPipe = true;
        currentCell = void 0;
        lastCell = [0, 0, 0, 0];
        cell = [0, index + 1, 0, 0];
        if (afterHeadAwaitingFirstBodyRow) {
          afterHeadAwaitingFirstBodyRow = false;
          currentBody = {
            type: "tableBody",
            start: Object.assign({}, token.start),
            // Note: correct end is set later.
            end: Object.assign({}, token.end)
          };
          map3.add(index, 0, [["enter", currentBody, context]]);
        }
        rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
      } else if (rowKind && (token.type === types.data || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
        inFirstCellAwaitingPipe = false;
        if (cell[2] === 0) {
          if (lastCell[1] !== 0) {
            cell[0] = cell[1];
            currentCell = flushCell(
              map3,
              context,
              lastCell,
              rowKind,
              void 0,
              currentCell
            );
            lastCell = [0, 0, 0, 0];
          }
          cell[2] = index;
        }
      } else if (token.type === "tableCellDivider") {
        if (inFirstCellAwaitingPipe) {
          inFirstCellAwaitingPipe = false;
        } else {
          if (lastCell[1] !== 0) {
            cell[0] = cell[1];
            currentCell = flushCell(
              map3,
              context,
              lastCell,
              rowKind,
              void 0,
              currentCell
            );
          }
          lastCell = cell;
          cell = [lastCell[1], index, 0, 0];
        }
      }
    } else if (token.type === "tableHead") {
      afterHeadAwaitingFirstBodyRow = true;
      lastTableEnd = index;
    } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
      lastTableEnd = index;
      if (lastCell[1] !== 0) {
        cell[0] = cell[1];
        currentCell = flushCell(
          map3,
          context,
          lastCell,
          rowKind,
          index,
          currentCell
        );
      } else if (cell[1] !== 0) {
        currentCell = flushCell(map3, context, cell, rowKind, index, currentCell);
      }
      rowKind = 0;
    } else if (rowKind && (token.type === types.data || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
      cell[3] = index;
    }
  }
  if (lastTableEnd !== 0) {
    ok(currentTable, "expected table opening");
    flushTableEnd(map3, context, lastTableEnd, currentTable, currentBody);
  }
  map3.consume(context.events);
  index = -1;
  while (++index < context.events.length) {
    const event = context.events[index];
    if (event[0] === "enter" && event[1].type === "table") {
      event[1]._align = gfmTableAlign(context.events, index);
    }
  }
  return events;
}
function flushCell(map3, context, range, rowKind, rowEnd, previousCell) {
  const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
  const valueName = "tableContent";
  if (range[0] !== 0) {
    ok(previousCell, "expected previous cell enter");
    previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
    map3.add(range[0], 0, [["exit", previousCell, context]]);
  }
  const now = getPoint(context.events, range[1]);
  previousCell = {
    type: groupName,
    start: Object.assign({}, now),
    // Note: correct end is set later.
    end: Object.assign({}, now)
  };
  map3.add(range[1], 0, [["enter", previousCell, context]]);
  if (range[2] !== 0) {
    const relatedStart = getPoint(context.events, range[2]);
    const relatedEnd = getPoint(context.events, range[3]);
    const valueToken = {
      type: valueName,
      start: Object.assign({}, relatedStart),
      end: Object.assign({}, relatedEnd)
    };
    map3.add(range[2], 0, [["enter", valueToken, context]]);
    ok(range[3] !== 0);
    if (rowKind !== 2) {
      const start = context.events[range[2]];
      const end = context.events[range[3]];
      start[1].end = Object.assign({}, end[1].end);
      start[1].type = types.chunkText;
      start[1].contentType = constants.contentTypeText;
      if (range[3] > range[2] + 1) {
        const a = range[2] + 1;
        const b = range[3] - range[2] - 1;
        map3.add(a, b, []);
      }
    }
    map3.add(range[3] + 1, 0, [["exit", valueToken, context]]);
  }
  if (rowEnd !== void 0) {
    previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
    map3.add(rowEnd, 0, [["exit", previousCell, context]]);
    previousCell = void 0;
  }
  return previousCell;
}
function flushTableEnd(map3, context, index, table, tableBody) {
  const exits = [];
  const related = getPoint(context.events, index);
  if (tableBody) {
    tableBody.end = Object.assign({}, related);
    exits.push(["exit", tableBody, context]);
  }
  table.end = Object.assign({}, related);
  exits.push(["exit", table, context]);
  map3.add(index + 1, 0, exits);
}
function getPoint(events, index) {
  const event = events[index];
  const side = event[0] === "enter" ? "start" : "end";
  return event[1][side];
}

// node_modules/micromark-extension-gfm-tagfilter/lib/index.js
var reFlow = /<(\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\t\n\f\r />])/gi;
var reText = new RegExp("^" + reFlow.source, "i");

// node_modules/micromark-extension-gfm-task-list-item/dev/lib/syntax.js
var tasklistCheck = { name: "tasklistCheck", tokenize: tokenizeTasklistCheck };
function gfmTaskListItem() {
  return {
    text: { [codes.leftSquareBracket]: tasklistCheck }
  };
}
function tokenizeTasklistCheck(effects, ok2, nok) {
  const self = this;
  return open;
  function open(code3) {
    ok(code3 === codes.leftSquareBracket, "expected `[`");
    if (
      // Exit if there’s stuff before.
      self.previous !== codes.eof || // Exit if not in the first content that is the first child of a list
      // item.
      !self._gfmTasklistFirstContentOfListItem
    ) {
      return nok(code3);
    }
    effects.enter("taskListCheck");
    effects.enter("taskListCheckMarker");
    effects.consume(code3);
    effects.exit("taskListCheckMarker");
    return inside;
  }
  function inside(code3) {
    if (markdownLineEndingOrSpace(code3)) {
      effects.enter("taskListCheckValueUnchecked");
      effects.consume(code3);
      effects.exit("taskListCheckValueUnchecked");
      return close;
    }
    if (code3 === codes.uppercaseX || code3 === codes.lowercaseX) {
      effects.enter("taskListCheckValueChecked");
      effects.consume(code3);
      effects.exit("taskListCheckValueChecked");
      return close;
    }
    return nok(code3);
  }
  function close(code3) {
    if (code3 === codes.rightSquareBracket) {
      effects.enter("taskListCheckMarker");
      effects.consume(code3);
      effects.exit("taskListCheckMarker");
      effects.exit("taskListCheck");
      return after;
    }
    return nok(code3);
  }
  function after(code3) {
    if (markdownLineEnding(code3)) {
      return ok2(code3);
    }
    if (markdownSpace(code3)) {
      return effects.check({ tokenize: spaceThenNonSpace }, ok2, nok)(code3);
    }
    return nok(code3);
  }
}
function spaceThenNonSpace(effects, ok2, nok) {
  return factorySpace(effects, after, types.whitespace);
  function after(code3) {
    return code3 === codes.eof ? nok(code3) : ok2(code3);
  }
}

// node_modules/micromark-extension-gfm/index.js
function gfm(options) {
  return combineExtensions([
    gfmAutolinkLiteral(),
    gfmFootnote(),
    gfmStrikethrough(options),
    gfmTable(),
    gfmTaskListItem()
  ]);
}

// node_modules/remark-gfm/lib/index.js
var emptyOptions = {};
function remarkGfm(options) {
  const self = (
    /** @type {Processor<Root>} */
    this
  );
  const settings = options || emptyOptions;
  const data = self.data();
  const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
  micromarkExtensions.push(gfm(settings));
  fromMarkdownExtensions.push(gfmFromMarkdown());
  toMarkdownExtensions.push(gfmToMarkdown(settings));
}
export {
  remarkGfm as default
};
//# sourceMappingURL=remark-gfm.js.map
