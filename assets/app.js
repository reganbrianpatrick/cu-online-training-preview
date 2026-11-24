/*
 * Training player. No build step, no dependencies, works from file://.
 *
 * Routes (hash based):
 *   #/                         course catalog
 *   #/c/<course>               course overview and learner sign-in
 *   #/c/<course>/m/<mod>/<scr> one screen of one module (0-based indexes)
 *   #/c/<course>/quiz          final assessment
 *   #/c/<course>/certificate   printable completion certificate
 *   #/c/<course>/sources       source list
 *
 * Progress lives in localStorage under "cutrain:v1:<course id>".
 * Course content is trusted HTML written by the course author.
 * Anything the learner types is escaped before it is shown.
 */
(function () {
  "use strict";

  var COURSES = window.CU_COURSES || [];
  var app = document.getElementById("app");

  // ------------------------------------------------------------ helpers
  // SV diamond mark (same geometry and colors as the SV design system's Logo).
  var DIAMOND =
    '<svg class="mark" viewBox="0 0 100 100" role="img" aria-label="Service Ventures">' +
    '<polygon points="50,2 50,50 2,50" fill="#77a7f7"/><polygon points="50,2 98,50 50,50" fill="#080b35"/>' +
    '<polygon points="2,50 50,50 50,98" fill="#080b35"/><polygon points="50,50 98,50 50,98" fill="#333790"/></svg>';
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function course(id) {
    for (var i = 0; i < COURSES.length; i++) if (COURSES[i].id === id) return COURSES[i];
    return null;
  }
  function key(c) { return "cutrain:v1:" + c.id; }
  function load(c) {
    try { return JSON.parse(localStorage.getItem(key(c))) || fresh(); } catch (e) { return fresh(); }
  }
  function fresh() { return { learner: null, done: {}, answers: {}, quiz: null }; }
  function save(c, st) { try { localStorage.setItem(key(c), JSON.stringify(st)); } catch (e) { /* private mode */ } }
  function sk(m, s) { return m + ":" + s; }
  function go(h) { location.hash = h; }

  function isInteractive(scr) { return scr.type === "check" || scr.type === "scenario"; }

  function moduleDone(c, st, mi) {
    var m = c.modules[mi];
    for (var s = 0; s < m.screens.length; s++) if (!st.done[sk(mi, s)]) return false;
    return true;
  }
  function requiredDone(c, st) {
    for (var i = 0; i < c.modules.length; i++) {
      if (!c.modules[i].optional && !moduleDone(c, st, i)) return false;
    }
    return true;
  }
  function moduleUnlocked(c, st, mi) {
    // A module opens once every earlier required module is finished.
    for (var i = 0; i < mi; i++) if (!c.modules[i].optional && !moduleDone(c, st, i)) return false;
    return true;
  }
  function progressPct(c, st) {
    var total = 0, done = 0;
    c.modules.forEach(function (m, mi) {
      m.screens.forEach(function (_, si) { total++; if (st.done[sk(mi, si)]) done++; });
    });
    total += 1; if (st.quiz && st.quiz.passed) done += 1;
    return Math.round((done / total) * 100);
  }
  function resumePoint(c, st) {
    for (var mi = 0; mi < c.modules.length; mi++) {
      for (var si = 0; si < c.modules[mi].screens.length; si++) {
        if (!st.done[sk(mi, si)]) return { m: mi, s: si };
      }
    }
    return null;
  }
  function sourceById(c, id) {
    for (var i = 0; i < c.sources.length; i++) if (c.sources[i].id === id) return c.sources[i];
    return null;
  }
  function citeHtml(c, ids) {
    if (!ids || !ids.length) return "";
    var links = ids.map(function (id) {
      var src = sourceById(c, id);
      return src ? '<a href="' + esc(src.url) + '" target="_blank" rel="noopener">' + esc(src.label) + "</a>" : "";
    }).filter(Boolean);
    return '<details class="cite"><summary>Sources for this page</summary><ul><li>' + links.join("</li><li>") + "</li></ul></details>";
  }
  // Notice shown on every course page: not legal advice, NCUA rules not final.
  function noticeHtml(c) {
    if (!c.notice) return "";
    return '<div class="notice" role="note"><strong>Notice:</strong> ' + esc(c.notice) +
      ' <a href="#/c/' + esc(c.id) + '/sources">Sources</a></div>';
  }
  function isProposed(c, scr) {
    var list = c.proposedSources || [];
    return (scr.cite || []).some(function (id) { return list.indexOf(id) !== -1; });
  }
  function render(html) {
    app.innerHTML = html;
    app.focus();
    window.scrollTo(0, 0);
  }

  // ------------------------------------------------------------ catalog
  function viewCatalog() {
    var cards = COURSES.map(function (c) {
      var st = load(c), pct = progressPct(c, st);
      var status = st.quiz && st.quiz.passed ? "Completed" : pct > 0 ? pct + "% complete" : "Not started";
      return (
        '<a class="course-card" href="#/c/' + esc(c.id) + '">' +
        '<span class="pill">' + esc(c.format) + "</span>" +
        "<h2>" + esc(c.title) + "</h2>" +
        "<p>" + esc(c.subtitle) + "</p>" +
        (c.notice ? '<p class="card-notice">' + esc(c.notice) + "</p>" : "") +
        '<div class="meta"><span>About ' + c.minutes + " minutes</span><span>Updated " + esc(c.asOf) + "</span><span>" + status + "</span></div>" +
        '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
        "</a>"
      );
    }).join("");
    render(
      '<section class="hero"><h1>Courses</h1>' +
      "<p>Short, self-paced training for credit union staff. Read, try it, check what you learned, and print a certificate.</p></section>" +
      '<section class="catalog">' + cards + "</section>"
    );
  }

  // ------------------------------------------------------------ course overview
  function viewCourse(c) {
    var st = load(c);
    var resume = resumePoint(c, st);
    var mods = c.modules.map(function (m, mi) {
      var done = moduleDone(c, st, mi), open = moduleUnlocked(c, st, mi);
      return (
        '<li class="' + (done ? "done" : open ? "" : "locked") + '">' +
        '<span class="num">' + (done ? "&#10003;" : mi + 1) + "</span>" +
        (open ? '<a href="#/c/' + c.id + "/m/" + mi + '/0">' + esc(m.title) + "</a>" : "<span>" + esc(m.title) + "</span>") +
        (m.optional ? ' <span class="tag">Optional</span>' : "") +
        "</li>"
      );
    }).join("");
    var quizOpen = requiredDone(c, st);
    mods += '<li class="' + (st.quiz && st.quiz.passed ? "done" : quizOpen ? "" : "locked") + '"><span class="num">' +
      (st.quiz && st.quiz.passed ? "&#10003;" : "&#9733;") + "</span>" +
      (quizOpen ? '<a href="#/c/' + c.id + '/quiz">Final check</a>' : "<span>Final check</span>") + "</li>";

    var learner = st.learner;
    var signin = learner
      ? '<p class="who">Signed in as <strong>' + esc(learner.name) + "</strong>" + (learner.cu ? ", " + esc(learner.cu) : "") +
        ' &middot; <button class="link" id="change">Change</button></p>'
      : '<form id="signin" class="signin">' +
        "<label>Your name <input name=name required autocomplete=name></label>" +
        "<label>Credit union <input name=cu autocomplete=organization></label>" +
        "<p class=hint>Used only for your certificate. Saved in this browser.</p></form>";

    var startLabel = !resume ? (st.quiz && st.quiz.passed ? "View certificate" : "Take the final check") :
      resume.m === 0 && resume.s === 0 ? "Start" : "Resume";

    render(
      '<section class="overview">' +
      '<a class="back" href="#/">&larr; All courses</a>' +
      '<span class="pill">' + esc(c.format) + "</span>" +
      "<h1>" + esc(c.title) + "</h1>" +
      '<p class="lede">' + esc(c.subtitle) + "</p>" + noticeHtml(c) +
      '<div class="meta"><span>About ' + c.minutes + " minutes</span><span>" + esc(c.audience) + "</span><span>Updated " + esc(c.asOf) + "</span></div>" +
      '<div class="two">' +
      '<div><h2>What\'s inside</h2><ol class="modlist">' + mods + "</ol></div>" +
      '<div class="card"><h2>Before you start</h2>' + signin +
      '<button class="btn primary" id="start">' + startLabel + "</button>" +
      '<p class="disclaimer">' + esc(c.disclaimer) + "</p>" +
      '<p><a href="#/c/' + c.id + '/sources">See all sources</a> &middot; <button class="link" id="reset">Reset my progress</button></p>' +
      "</div></div></section>"
    );

    var form = document.getElementById("signin");
    document.getElementById("start").onclick = function () {
      if (form) {
        if (!form.reportValidity()) return;
        st.learner = { name: form.name.value.trim(), cu: form.cu.value.trim() };
        save(c, st);
      }
      if (resume) go("#/c/" + c.id + "/m/" + resume.m + "/" + resume.s);
      else go("#/c/" + c.id + (st.quiz && st.quiz.passed ? "/certificate" : "/quiz"));
    };
    var ch = document.getElementById("change");
    if (ch) ch.onclick = function () { st.learner = null; save(c, st); viewCourse(c); };
    document.getElementById("reset").onclick = function () {
      if (confirm("Clear your progress, answers and certificate for this course?")) {
        localStorage.removeItem(key(c)); viewCourse(c);
      }
    };
  }

  // ------------------------------------------------------------ screens
  function screenBody(c, st, mi, si, scr) {
    var k = sk(mi, si), html = "";
    if (scr.heading) html += "<h1>" + scr.heading + "</h1>";

    if (scr.type === "text") {
      (scr.body || []).forEach(function (p) { html += "<p>" + p + "</p>"; });
      if (scr.list) html += "<ul class=points><li>" + scr.list.join("</li><li>") + "</li></ul>";
      (scr.after || []).forEach(function (p) { html += "<p>" + p + "</p>"; });
      if (scr.callout) html += '<div class="callout ' + scr.callout.kind + '">' + scr.callout.text + "</div>";
    }

    if (scr.type === "reveal") {
      if (scr.intro) html += '<p class="hint">' + scr.intro + "</p>";
      html += '<div class="reveal">' + scr.cards.map(function (cd, i) {
        return '<button class="flip" data-i="' + i + '" aria-expanded="false"><span class="front">' + cd.front +
          '</span><span class="back">' + cd.back + "</span></button>";
      }).join("") + "</div>";
    }

    if (scr.type === "timeline") {
      html += '<ol class="timeline">' + scr.items.map(function (it) {
        return "<li><b>" + it.date + "</b><span>" + it.text + "</span></li>";
      }).join("") + "</ol>";
    }

    if (scr.type === "check" || scr.type === "scenario") {
      if (scr.setup) html += '<div class="scene">' + scr.setup + "</div>";
      html += '<p class="q">' + (scr.question || scr.prompt) + "</p>";
      var picked = st.answers[k];
      html += '<div class="choices">' + scr.options.map(function (o, i) {
        var cls = "";
        if (picked != null) {
          if (scr.type === "check") cls = o.correct ? "right" : i === picked ? "wrong" : "";
          else cls = i === picked ? o.result : "";
        }
        return '<button class="choice ' + cls + '" data-i="' + i + '"' + (picked != null ? " disabled" : "") + ">" + o.text + "</button>";
      }).join("") + "</div>";
      if (picked != null) {
        var o = scr.options[picked];
        var good = scr.type === "check" ? o.correct : o.result === "good";
        var label = good ? "Correct" : scr.type === "scenario" && o.result === "ok" ? "Close" : "Not quite";
        html += '<div class="feedback ' + (good ? "good" : "bad") + '"><strong>' + label + ".</strong> " + (o.why || o.feedback) + "</div>";
        if (!good) html += '<button class="link" id="retry">Try again</button>';
      }
    }

    html += citeHtml(c, scr.cite);
    return html;
  }

  function viewScreen(c, mi, si) {
    var st = load(c);
    if (!st.learner) return go("#/c/" + c.id);
    var m = c.modules[mi];
    if (!m || !m.screens[si] || !moduleUnlocked(c, st, mi)) return go("#/c/" + c.id);
    var scr = m.screens[si], k = sk(mi, si);

    // Plain reading screens count as done once viewed.
    if (!isInteractive(scr) && !st.done[k]) { st.done[k] = true; save(c, st); }

    var side = c.modules.map(function (mm, i) {
      var cls = i === mi ? "current" : moduleDone(c, st, i) ? "done" : moduleUnlocked(c, st, i) ? "" : "locked";
      var label = esc(mm.title) + (mm.optional ? ' <span class="tag">Optional</span>' : "");
      return '<li class="' + cls + '">' + (cls === "locked" ? "<span>" + label + "</span>" : '<a href="#/c/' + c.id + "/m/" + i + '/0">' + label + "</a>") + "</li>";
    }).join("");
    var quizOpen = requiredDone(c, st);
    side += '<li class="' + (quizOpen ? "" : "locked") + '">' + (quizOpen ? '<a href="#/c/' + c.id + '/quiz">Final check</a>' : "<span>Final check</span>") + "</li>";

    var last = si === m.screens.length - 1;
    var nextHref;
    if (!last) nextHref = "#/c/" + c.id + "/m/" + mi + "/" + (si + 1);
    else if (mi < c.modules.length - 1) nextHref = "#/c/" + c.id + "/m/" + (mi + 1) + "/0";
    else nextHref = "#/c/" + c.id + "/quiz";
    var prevHref = si > 0 ? "#/c/" + c.id + "/m/" + mi + "/" + (si - 1) :
      mi > 0 ? "#/c/" + c.id + "/m/" + (mi - 1) + "/" + (c.modules[mi - 1].screens.length - 1) : "#/c/" + c.id;
    var needAnswer = isInteractive(scr) && !st.done[k];
    var nextLabel = last && mi === c.modules.length - 1 ? "Go to final check" : last ? "Next module" : "Next";

    // After the last required module, offer the optional one or skip to the quiz.
    var skip = "";
    if (last && mi < c.modules.length - 1 && c.modules[mi + 1].optional) {
      skip = '<a class="btn" href="#/c/' + c.id + '/quiz">Skip to final check</a>';
      nextLabel = "Continue to " + c.modules[mi + 1].title;
    }

    render(
      '<div class="player">' +
      '<aside class="side"><a class="back" href="#/c/' + c.id + '">&larr; Overview</a>' +
      '<div class="bar"><i style="width:' + progressPct(c, st) + '%"></i></div><ol>' + side + "</ol></aside>" +
      '<section class="screen">' + noticeHtml(c) +
      (isProposed(c, scr) ? '<span class="flag">NCUA proposal, not final</span>' : "") +
      '<p class="crumb">Module ' + (mi + 1) + " of " + c.modules.length + " &middot; " + esc(m.title) +
      " &middot; " + (si + 1) + "/" + m.screens.length + "</p>" +
      '<div class="body">' + screenBody(c, st, mi, si, scr) + "</div>" +
      '<div class="nav"><a class="btn" href="' + prevHref + '">Back</a>' + skip +
      '<a class="btn primary' + (needAnswer ? " disabled" : "") + '" id="next" href="' + nextHref + '"' +
      (needAnswer ? ' aria-disabled="true"' : "") + ">" + nextLabel + "</a></div>" +
      (needAnswer ? '<p class="hint right">Choose an answer to continue.</p>' : "") +
      "</section></div>"
    );

    var next = document.getElementById("next");
    next.onclick = function (e) { if (next.classList.contains("disabled")) e.preventDefault(); };

    Array.prototype.forEach.call(app.querySelectorAll(".flip"), function (b) {
      b.onclick = function () {
        var on = b.classList.toggle("on");
        b.setAttribute("aria-expanded", on ? "true" : "false");
      };
    });
    Array.prototype.forEach.call(app.querySelectorAll(".choice"), function (b) {
      b.onclick = function () {
        var i = +b.getAttribute("data-i");
        st.answers[k] = i;
        st.done[k] = true; // any answer completes the screen; feedback teaches
        save(c, st);
        viewScreen(c, mi, si);
      };
    });
    var retry = document.getElementById("retry");
    if (retry) retry.onclick = function () { delete st.answers[k]; save(c, st); viewScreen(c, mi, si); };
  }

  // ------------------------------------------------------------ quiz
  function viewQuiz(c) {
    var st = load(c);
    if (!st.learner) return go("#/c/" + c.id);
    if (!requiredDone(c, st)) return go("#/c/" + c.id);

    if (st.quiz && st.quiz.submitted) return viewQuizResult(c, st);

    var qs = c.quiz.map(function (q, qi) {
      return '<fieldset class="qz"><legend>' + (qi + 1) + ". " + q.question + "</legend>" +
        q.options.map(function (o, oi) {
          return '<label><input type="radio" name="q' + qi + '" value="' + oi + '" required> ' + o + "</label>";
        }).join("") + "</fieldset>";
    }).join("");

    render(
      '<section class="quiz"><a class="back" href="#/c/' + c.id + '">&larr; Overview</a>' +
      noticeHtml(c) + "<h1>Final check</h1><p>" + c.quiz.length + " questions. You need " + Math.round(c.passMark * 100) +
      "% to pass. You can retake it.</p>" +
      '<form id="qf">' + qs + '<button class="btn primary">Submit answers</button></form></section>'
    );
    document.getElementById("qf").onsubmit = function (e) {
      e.preventDefault();
      var f = e.target, answers = [], score = 0;
      c.quiz.forEach(function (q, qi) {
        var v = +f["q" + qi].value; answers.push(v); if (v === q.answer) score++;
      });
      var passed = score / c.quiz.length >= c.passMark;
      var prevPass = st.quiz && st.quiz.passedAt;
      st.quiz = { submitted: true, answers: answers, score: score, passed: passed || !!prevPass,
        passedAt: prevPass || (passed ? new Date().toISOString() : null) };
      save(c, st);
      viewQuizResult(c, st);
    };
  }

  function viewQuizResult(c, st) {
    var q = st.quiz, pct = Math.round((q.score / c.quiz.length) * 100);
    var thisPassed = q.score / c.quiz.length >= c.passMark;
    var review = c.quiz.map(function (qq, qi) {
      var ok = q.answers[qi] === qq.answer;
      return '<li class="' + (ok ? "ok" : "no") + '"><p><strong>' + qq.question + "</strong></p>" +
        "<p>Your answer: " + qq.options[q.answers[qi]] + (ok ? " &#10003;" : " &#10007; &middot; Correct: " + qq.options[qq.answer]) + "</p>" +
        '<p class="hint">' + qq.why + "</p></li>";
    }).join("");
    render(
      '<section class="quiz"><a class="back" href="#/c/' + c.id + '">&larr; Overview</a>' +
      noticeHtml(c) + '<div class="score ' + (thisPassed ? "pass" : "fail") + '"><b>' + pct + "%</b><span>" + q.score + " of " + c.quiz.length + " correct</span></div>" +
      (thisPassed ? "<h1>You passed.</h1>" : "<h1>Not quite there.</h1><p>Review the answers below and try again.</p>") +
      '<div class="nav">' +
      (q.passed ? '<a class="btn primary" href="#/c/' + c.id + '/certificate">View certificate</a>' : "") +
      '<button class="btn" id="retake">Retake</button></div>' +
      '<ol class="review">' + review + "</ol></section>"
    );
    document.getElementById("retake").onclick = function () {
      st.quiz.submitted = false; save(c, st); viewQuiz(c);
    };
  }

  // ------------------------------------------------------------ certificate
  function viewCertificate(c) {
    var st = load(c);
    if (!st.quiz || !st.quiz.passed || !st.learner) return go("#/c/" + c.id);
    var d = new Date(st.quiz.passedAt);
    var when = d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    render(
      '<section class="certwrap"><div class="noprint nav"><a class="btn" href="#/c/' + c.id + '">&larr; Overview</a>' +
      '<button class="btn primary" onclick="window.print()">Print or save as PDF</button></div>' +
      '<div class="cert">' + DIAMOND + '<p class="small">Certificate of completion</p>' +
      "<h1>" + esc(st.learner.name) + "</h1>" +
      (st.learner.cu ? '<p class="cu">' + esc(st.learner.cu) + "</p>" : "") +
      "<p>completed</p><h2>" + esc(c.title) + "</h2>" +
      "<p>on " + esc(when) + "</p>" +
      '<p class="small">Content current as of ' + esc(c.asOf) + ". Staff education, not legal advice. NCUA's GENIUS Act rules were proposed, not final, on that date.</p></div></section>"
    );
  }

  // ------------------------------------------------------------ sources
  function viewSources(c) {
    render(
      '<section class="overview"><a class="back" href="#/c/' + c.id + '">&larr; Overview</a>' +
      noticeHtml(c) + "<h1>Sources</h1><p>Everything in this course comes from the sources below. Content is current as of " + esc(c.asOf) + ".</p>" +
      '<ol class="sources">' + c.sources.map(function (s) {
        return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a></li>";
      }).join("") + "</ol>" +
      '<p class="disclaimer">' + esc(c.disclaimer) + "</p></section>"
    );
  }

  // ------------------------------------------------------------ router
  function route() {
    var parts = (location.hash.replace(/^#\/?/, "") || "").split("/").filter(Boolean);
    if (!parts.length) return viewCatalog();
    if (parts[0] !== "c") return viewCatalog();
    var c = course(parts[1]);
    if (!c) return viewCatalog();
    if (parts.length === 2) return viewCourse(c);
    if (parts[2] === "m") return viewScreen(c, +parts[3] || 0, +parts[4] || 0);
    if (parts[2] === "quiz") return viewQuiz(c);
    if (parts[2] === "certificate") return viewCertificate(c);
    if (parts[2] === "sources") return viewSources(c);
    viewCourse(c);
  }
  window.addEventListener("hashchange", route);
  route();
})();
