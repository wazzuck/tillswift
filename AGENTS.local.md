# Repository-Local Guidelines for AI Coding Agents (TillSwift)

> Repository-specific rules and project facts for `tillswift`.
> Shared Artificial Intelligence (AI) coding agent rules live in the
> golden master, `../vunderland/settings/AGENTS.md`; this repository's
> `AGENTS.md` is a pointer to that file and holds no rules of its own.
> Keep all `tillswift`-specific rules here; common cross-repo rules
> belong in the golden master, never in this file or in `AGENTS.md`.
> Where this file refines or extends a common policy, both apply; if
> there is a conflict, stop and ask the operator.

---

## 1. Repository-specific policies

1. **Use British Professional English at all times** (refines common
   Policy 15).
   - This site and repository must at all times use British Professional
     English conventions for all customer-facing copy, User Interface
     (UI) text, marketing copy, documentation, code comments, and
     docstrings (for example: "summarisation", "prioritisation",
     "categorisation", "customisation", "synchronise", "dialogue",
     "colour", "behaviour", "licence" for noun, "practice" for noun,
     "modelling", "centre", "programme").
   - Tone must remain institutional, understated, authoritative, and
     professionally tailored for senior partners and principals.
   - Code identifiers, external library Application Programming
     Interface (API) names, protocol constants or JavaScript Object
     Notation (JSON) keys specified by external standards remain
     verbatim.
   - When drafting or editing Graphical User Interface (GUI) copy,
     prompts, reports, documentation or commit messages, standardise on
     British Professional English spelling, grammar, and idioms at all
     times without exception.

2. **Common rule changes go to the golden master.**
   - Any change to the common rule set must be made in
     `../vunderland/settings/AGENTS.md` and committed in the
     `vunderland` repository, whatever the change looks like.
   - Never add, edit or fork a common rule in this repository's
     `AGENTS.md` pointer, and never park one in this file to move
     later: `AGENTS.md` here names the golden master and nothing
     else.
   - There is nothing to regenerate afterwards. Every repository
     reads the golden master live through its pointer, so the new
     rule applies to all of them from the next session onward.


---

## 2. Project facts (TillSwift)

1. **Language & Tone:** This site must at all times use British
   Professional English across all customer-facing copy, code comments,
   and repository documentation.

2. **Target Audience & Positioning:** London retail, hospitality,
   clinic, and boutique professional practices seeking Point of Sale
   (POS) and till installation (SumUp, Square, Stripe Terminal, Clover,
   Lightspeed, Shopify POS), custom POS software integrations, resilient
   venue networking, and impartial 3-year Total Cost of Ownership (TCO)
   payment provider comparisons.

3. **Core Tech:** Static HyperText Markup Language (HTML5), Cascading
   Style Sheets (CSS3), vanilla JavaScript (JS), and Python 3 for site
   verification. Zero server-side runtime dependencies.

4. **Verification command:** Run `python3 scripts/verify_site.py` before
   committing.
